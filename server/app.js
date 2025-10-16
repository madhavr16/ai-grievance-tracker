const express = require('express')
const cors = require('cors')

const app = express()

// Allow configuring frontend origin via FRONTEND_URL environment variable for deployed frontend (Vercel)
const frontendUrl = (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/+$/, '')
app.use(cors({
  origin: [
    frontendUrl,
    'http://localhost:5173'
  ],
  credentials: true
}));
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
