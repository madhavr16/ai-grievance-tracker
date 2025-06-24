const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

// Routes
app.use('/api/admin', require('./routes/authRoutes'))
app.use('/api/public', require('./routes/authRoutes'))

// Admin complaint fetch route
app.use('/api/admin', require('./routes/adminRoutes'))
app.use('/api/public', require('./routes/publicRoutes'))

app.use('/api/public', require('./routes/publicRoutes'))
app.use('/api/complaints', require('./routes/complaint'))


app.get('/', (req, res) => {
  res.send('🌐 GovTrack API is running')
})

module.exports = app
