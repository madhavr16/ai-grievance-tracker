// routes/adminRoutes.js
const express = require('express')
const router = express.Router()
const Complaint = require('../models/Complaint')
const authMiddleware = require('../middleware/auth')

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


module.exports = router
