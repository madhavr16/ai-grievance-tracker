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

module.exports = router
