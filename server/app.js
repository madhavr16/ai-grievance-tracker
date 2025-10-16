const express = require('express')
const cors = require('cors')

const app = express()

// Allow configuring frontend origin via FRONTEND_URL environment variable for deployed frontend (Vercel)
const frontendUrl = (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/+$/, '')
console.log('🌐 Configured FRONTEND_URL for CORS:', frontendUrl)

const corsOptions = {
  origin: [frontendUrl, 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
  preflightContinue: false
}

app.use(cors(corsOptions))
// Ensure OPTIONS preflight is handled for all routes
app.options('*', cors(corsOptions))
app.use(express.json())

// Routes
app.use('/api/admin', require('./routes/authRoutes'))
app.use('/api/public', require('./routes/authRoutes'))

// Admin complaint fetch route
app.use('/api/admin', require('./routes/adminRoutes'))
app.use('/api/public', require('./routes/publicRoutes'))

// Compatibility: accept legacy frontend POSTs to /api/complaints and handle like public complaint route
app.use('/api/complaints', require('./routes/clientCompat'))
app.use('/api/complaints', require('./routes/complaint'))

// Debug routes
app.use('/api/debug', require('./routes/debug'))


app.get('/', (req, res) => {
  res.send('🌐 GovTrack API is running')
})

module.exports = app
