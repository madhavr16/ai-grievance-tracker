require('dotenv').config({
  path: process.env.NODE_ENV === 'development' ? '.env.local' : '.env'
});


const app = require('./app')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 5000

// Global error handlers to help with deploy diagnostics
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err && err.stack ? err.stack : err)
  process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
  console.error('UNHANDLED REJECTION at:', promise, 'reason:', reason && reason.stack ? reason.stack : reason)
  process.exit(1)
})

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('✅ MongoDB connected')
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
  })
  .catch((err) => console.error('Mongo Error →', err))
