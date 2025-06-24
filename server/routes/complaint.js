// routes/complaint.js
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Complaint = require('../models/Complaint')

// Everyone (admin + public) with a valid JWT can access
router.get('/', auth, async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 })
    res.json(complaints)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch complaints' })
  }
})

module.exports = router
