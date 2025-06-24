// routes/publicRoutes.js
const express = require('express')
const router = express.Router()
const Complaint = require('../models/Complaint')

// 🌐 Public route (no auth)
router.get('/complaints', async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 })
    res.json(complaints)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch complaints' })
  }
})

module.exports = router
