const express = require('express')
const router = express.Router()

// Debug endpoint to echo headers and body for troubleshooting deployed requests
router.post('/echo', (req, res) => {
    try {
        console.log('🔍 /api/debug/echo headers:', req.headers)
        console.log('🔍 /api/debug/echo body:', req.body)
        // Return headers and body so callers can see exactly what reached the server
        res.json({ headers: req.headers, body: req.body })
    } catch (err) {
        console.error('❌ Debug echo error:', err)
        res.status(500).json({ error: 'Debug endpoint failed' })
    }
})

module.exports = router
