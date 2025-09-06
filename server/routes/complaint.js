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
    const { title, description, category } = req.body

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' })
    }

    const complaint = new Complaint({
      title,
      description,
      category,
      user: req.user.id // from JWT middleware
    })

    await complaint.save()
    res.status(201).json(complaint)
  } catch (err) {
    res.status(500).json({ error: 'Failed to create complaint' })
  }
})

module.exports = router
