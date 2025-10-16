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

// Explicit OPTIONS responder for extra safety (some hosts/proxies need this)
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Origin', corsOptions.origin[0])
    res.set('Access-Control-Allow-Methods', corsOptions.methods.join(', '))
    res.set('Access-Control-Allow-Headers', corsOptions.allowedHeaders.join(', '))
    res.set('Access-Control-Allow-Credentials', 'true')
    return res.status(204).send('')
  }
  next()
})

// Diagnostic: print env vars that look like URLs to help debug path-to-regexp errors during deploy
try {
  const urlLike = Object.keys(process.env).filter(k => /url|uri|path/i.test(k) && /https?:\/\//i.test(process.env[k] || ''))
  if (urlLike.length) {
    console.log('🔎 Environment variables that look like URLs:')
    urlLike.forEach(k => {
      const v = process.env[k]
      const safe = v.length > 30 ? v.slice(0, 20) + '...' + v.slice(-7) : v
      console.log(` - ${k} = ${safe}`)
    })
  }
} catch (e) {
  console.warn('Could not enumerate environment variables for diagnostics')
}

// Routes
// Routes (wrapped to log mounting errors)
const mount = (path, modPath) => {
  try {
    console.log(`🧩 Requiring module ${modPath} for mount at ${path}...`)
    const m = require(modPath)
    if (!m) {
      console.error(`❌ Module ${modPath} exported falsy value`)
      return
    }
    // Basic type check to avoid passing non-function/non-router to app.use
    const t = typeof m
    console.log(`🧩 Module ${modPath} type: ${t}`)
    app.use(path, m)
    console.log(`🔌 Mounted ${modPath} at ${path}`)
  } catch (err) {
    console.error(`❌ Failed to mount ${modPath} at ${path}:`, err && err.stack ? err.stack : err && err.message)
  }
}

mount('/api/admin', './routes/authRoutes')
mount('/api/public', './routes/authRoutes')

// Admin complaint fetch route
mount('/api/admin', './routes/adminRoutes')
mount('/api/public', './routes/publicRoutes')

// Compatibility: accept legacy frontend POSTs to /api/complaints and handle like public complaint route
mount('/api/complaints', './routes/clientCompat')
mount('/api/complaints', './routes/complaint')

// Debug routes
mount('/api/debug', './routes/debug')


app.get('/', (req, res) => {
  res.send('🌐 GovTrack API is running')
})

module.exports = app
