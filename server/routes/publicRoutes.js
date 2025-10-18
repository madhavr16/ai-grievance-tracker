const express = require('express')
const router = express.Router()
const Complaint = require('../models/Complaint')

// Get all complaints
router.get('/complaints', async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 })
    res.json(complaints)
  } catch (err) {
    console.error('❌ Error fetching complaints:', err.message)
    res.status(500).json({ error: 'Failed to fetch complaints' })
  }
})

const axios = require('axios')

// Submit a new complaint
router.post('/complaint', async (req, res) => {
  // Log incoming request for debugging
  console.log('📥 /api/public/complaint received body:', req.body)
  const { userText, locality, name, phone } = req.body || {}

  // Validate and return which fields are missing to make the client error clearer
  const missing = []
  if (!userText) missing.push('userText')
  if (!locality) missing.push('locality')
  if (!name) missing.push('name')
  if (!phone) missing.push('phone')
  if (missing.length) {
    console.warn('⚠️ Missing fields in complaint submission:', missing)
    return res.status(400).json({ error: 'Missing required fields', missing })
  }

  try {
    // 🧠 Call ML service from Express backend. Use ML_URL env var when deployed to Render.
    // Allow either ML_URL (standard) or VITE_ML_URL (set by some deploys/frontends)
    const mlBase = ((process.env.ML_URL || process.env.VITE_ML_URL) || 'http://ml:8000').replace(/\/+$/, '')
    const mlEndpoint = `${mlBase}/predict`
    console.log('➡️ Calling ML endpoint:', mlEndpoint)
    let mlData = null
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

    try {
      const mlRes = await axios.post(
        mlEndpoint,
        { name, phone, description: userText, location: locality },
        { timeout: 5000 }
      )
      mlData = mlRes.data || null
      console.log('⬅️ ML responded with status', mlRes.status)
      console.log('ℹ️ ML response body:', JSON.stringify(mlData))
    } catch (mlErr) {
      console.warn('⚠️ ML service call failed:', mlErr && mlErr.message)
      // continue without ML predictions
      mlData = null
    }

    const complaint = new Complaint({
      userText,
      locality,
      name,
      phone,
      department: mlData
        ? normalizePred(mlData.predicted_department) || normalizePred(mlData.department)
        : null,
      urgency: mlData
        ? normalizePred(mlData.predicted_urgency) || normalizePred(mlData.urgency)
        : null,
      translatedText: mlData
        ? mlData.translated_description || mlData.translatedText || null
        : null,
      entities: mlData ? mlData.entities || [] : []
    })

    await complaint.save()
    console.log('✅ Complaint saved:', complaint._id)
    const responseBody = { message: 'Complaint submitted successfully' }
    if (!mlData) responseBody.ml = 'unavailable'
    return res.status(201).json(responseBody)
  } catch (err) {
    console.error('❌ Error submitting complaint:', err && err.stack ? err.stack : err)
    res.status(500).json({ error: 'Failed to submit complaint' })
  }
})


// Submit feedback
router.post('/complaint/:id/feedback', async (req, res) => {
  const { id } = req.params
  const { feedback } = req.body

  try {
    const complaint = await Complaint.findById(id)
    if (!complaint) return res.status(404).json({ error: 'Complaint not found' })

    complaint.feedback = feedback
    await complaint.save()
    res.json({ message: 'Feedback saved' })
  } catch (err) {
    console.error('❌ Feedback submission error:', err.message)
    res.status(500).json({ error: 'Failed to submit feedback' })
  }
})

module.exports = router
