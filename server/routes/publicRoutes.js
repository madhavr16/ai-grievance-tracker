const express = require('express')
const router = express.Router()
const Complaint = require('../models/Complaint')

// Get all complaints (visible to public)
router.get('/complaints', async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 })
    res.json(complaints)
  } catch (err) {
    console.error('❌ Error fetching complaints:', err)
    res.status(500).json({ error: 'Failed to fetch complaints' })
  }
})

// Submit a new complaint
router.post('/complaint', async (req, res) => {
  const { userText, locality, name, phone } = req.body

  if (!userText || !locality || !name || !phone) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    const complaint = new Complaint({
      userText,
      locality,
      name,
      phone
    })

    await complaint.save()
    res.status(201).json({ message: 'Complaint submitted successfully' })
  } catch (err) {
    console.error('❌ Error saving complaint:', err)
    res.status(500).json({ error: 'Failed to submit complaint' })
  }
})

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
    res.status(500).json({ error: 'Failed to submit feedback' })
  }
})


module.exports = router
