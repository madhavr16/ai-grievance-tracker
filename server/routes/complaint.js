const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Complaint = require('../models/Complaint')

// GET all complaints (Admin + Public with JWT)
router.get('/', auth, async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 })
    res.json(complaints)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch complaints' })
  }
})

// POST a new complaint (Public users submit)
router.post('/', auth, async (req, res) => {
  try {
    // Support both new and legacy payload shapes.
    // New API expects { title, description, category }
    // Legacy clients may send { userText, locality, name, phone }
    let { title, description, category, userText, name } = req.body || {}

    // Map legacy fields to new ones when missing
    if ((!title || !description) && userText) {
      description = description || userText
      title = title || (name ? `${name} - complaint` : 'Complaint')
    }

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' })
    }

    const complaint = new Complaint({
      title,
      description,
      category,
      user: req.userId || (req.user && req.user.id) // from JWT middleware
    })

    await complaint.save()
    res.status(201).json(complaint)
  } catch (err) {
    res.status(500).json({ error: 'Failed to create complaint' })
  }
})

module.exports = router
