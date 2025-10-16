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
    const mlBase = (process.env.ML_URL || 'http://ml:8000').replace(/\/+$/, '')
    const mlEndpoint = `${mlBase}/predict`
    const mlRes = await axios.post(mlEndpoint, {
      name,
      phone,
      description: userText,
      location: locality
    })

    const mlData = mlRes.data

    const complaint = new Complaint({
      userText,
      locality,
      name,
      phone,
      department: mlData.predicted_department,
      urgency: mlData.predicted_urgency,
      translatedText: mlData.translated_description,
      entities: mlData.entities
    })

    await complaint.save()
    console.log('✅ Complaint saved:', complaint)
    res.status(201).json({ message: 'Complaint submitted successfully' })
  } catch (err) {
    console.error('❌ Error submitting complaint:', err.message)
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
