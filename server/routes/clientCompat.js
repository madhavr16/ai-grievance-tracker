const express = require('express')
const router = express.Router()
const axios = require('axios')
const Complaint = require('../models/Complaint')

// Compatibility route for older frontend builds that POST to /api/complaints
router.post('/', async (req, res) => {
    console.log('📥 Legacy /api/complaints received body:', req.body)
    const { userText, locality, name, phone } = req.body || {}
    const missing = []
    if (!userText) missing.push('userText')
    if (!locality) missing.push('locality')
    if (!name) missing.push('name')
    if (!phone) missing.push('phone')
    if (missing.length) {
        console.warn('⚠️ Missing fields in legacy complaint submission:', missing)
        return res.status(400).json({ error: 'Missing required fields', missing })
    }

    try {
    const mlBase = ((process.env.ML_URL || process.env.VITE_ML_URL) || 'http://ml:8000').replace(/\/+$/, '')
        const mlEndpoint = `${mlBase}/predict`
        console.log('➡️ Calling ML endpoint (compat):', mlEndpoint)
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

        const mlRes = await axios.post(mlEndpoint, {
            name,
            phone,
            description: userText,
            location: locality
        })

        const mlData = mlRes.data || {}
        console.log('ℹ️ ML response body (compat):', JSON.stringify(mlData))

        const complaint = new Complaint({
            userText,
            locality,
            name,
            phone,
            department: normalizePred(mlData.predicted_department) || normalizePred(mlData.department),
            urgency: normalizePred(mlData.predicted_urgency) || normalizePred(mlData.urgency),
            translatedText: mlData.predicted_description || mlData.translated_description || null,
            entities: mlData.entities || []
        })

        await complaint.save()
        console.log('✅ Legacy complaint saved:', complaint._id)
        return res.status(201).json({ message: 'Complaint submitted successfully (compat)' })
    } catch (err) {
        console.error('❌ Error in legacy complaint handler:', err.message)
        console.error(err.stack)
        return res.status(500).json({ error: 'Failed to submit complaint (compat)' })
    }
})

module.exports = router
