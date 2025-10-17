// routes/adminRoutes.js
const express = require('express')
const router = express.Router()
const Complaint = require('../models/Complaint')
const authMiddleware = require('../middleware/auth')
const axios = require('axios')

// 🔒 Admin route (with auth)
router.get('/complaints', authMiddleware, async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 })
    res.json(complaints)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch complaints' })
  }
})

// PATCH /admin/complaints/:id
router.patch('/complaints/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const complaint = await Complaint.findByIdAndUpdate(id, { status }, { new: true })
    if (!complaint) return res.status(404).json({ error: 'Complaint not found' })

    res.json(complaint)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to update status' })
  }
})


// POST /admin/complaints/reclassify-missing
// Re-run ML predictions for complaints where department or urgency is missing/null
router.post('/complaints/reclassify-missing', authMiddleware, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit || '100', 10)
    const missing = await Complaint.find({ $or: [{ department: null }, { urgency: null }] }).limit(limit)
    if (!missing || missing.length === 0) return res.json({ message: 'No missing classifications found' })

    const mlBase = (process.env.ML_URL || 'http://ml:8000').replace(/\/+$/, '')
    const mlEndpoint = `${mlBase}/predict`

    const normalizePred = (v) => {
      if (v === null || v === undefined) return null
      if (typeof v === 'string') {
        const s = v.trim()
        if (!s) return null
        if (/^(NA|N\/A|unknown|unavailable)$/i.test(s)) return null
        return s
      }
      return v
    }

    const results = { processed: 0, updated: 0, errors: [] }

    for (const c of missing) {
      try {
        console.log('➡️ Reclassifying complaint', c._id)
        const mlRes = await axios.post(
          mlEndpoint,
          { name: c.name, phone: c.phone, description: c.userText, location: c.locality },
          { timeout: 5000 }
        )
        const mlData = mlRes.data || {}
        console.log('ℹ️ ML reclassify response:', JSON.stringify(mlData))

        const newDept = normalizePred(mlData.predicted_department) || normalizePred(mlData.department)
        const newUrg = normalizePred(mlData.predicted_urgency) || normalizePred(mlData.urgency)

        let changed = false
        if (newDept && newDept !== c.department) { c.department = newDept; changed = true }
        if (newUrg && newUrg !== c.urgency) { c.urgency = newUrg; changed = true }

        if (changed) {
          await c.save()
          results.updated += 1
        }
        results.processed += 1
      } catch (e) {
        console.error('❌ Reclassify error for', c._id, e && e.message)
        results.errors.push({ id: c._id, error: e && e.message })
      }
    }

    return res.json(results)
  } catch (err) {
    console.error('❌ Reclassify-missing endpoint error:', err && err.stack ? err.stack : err)
    return res.status(500).json({ error: 'Failed to reclassify missing complaints' })
  }
})


module.exports = router
