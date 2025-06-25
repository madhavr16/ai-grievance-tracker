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

// Submit a new complaint
router.post('/complaint', async (req, res) => {
  const { userText, locality, name, phone, department, urgency, translatedText, entities } = req.body

  if (!userText || !locality || !name || !phone) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    const complaint = new Complaint({
      userText,
      locality,
      name,
      phone,
      department, // optional
      urgency,    // optional
      translatedText, // optional
      entities        // optional
    })

    await complaint.save()
    console.log('✅ Complaint saved:', complaint)
    res.status(201).json({ message: 'Complaint submitted successfully' })
  } catch (err) {
    console.error('❌ Error saving complaint:', err.message)
    console.error(err.stack)
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
