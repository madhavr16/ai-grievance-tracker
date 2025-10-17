const express = require('express')
const router = express.Router()
const axios = require('axios')

router.post('/predict-proxy', async (req, res) => {
  const { name, phone, description, location } = req.body || {}
  if (!description) return res.status(400).json({ error: 'description required' })

  try {
    const mlBase = (process.env.ML_URL || 'http://ml:8000').replace(/\/+$/, '')
    const mlEndpoint = `${mlBase}/predict`
    console.log('➡️ Proxying to ML endpoint:', mlEndpoint)
    const mlRes = await axios.post(mlEndpoint, { name, phone, description, location }, { timeout: 5000 })
    console.log('ℹ️ ML proxy response body:', JSON.stringify(mlRes.data || {}))
    return res.json({ ml: mlRes.data || null })
  } catch (err) {
    console.error('❌ ML proxy error:', err && err.message)
    return res.status(502).json({ error: 'ML service unreachable', detail: err && err.message })
  }
})

module.exports = router
