require('dotenv').config({
  path: process.env.NODE_ENV === 'development' ? '.env.local' : '.env'
});


const app = require('./app')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB connected')
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
})
.catch((err) => console.error('Mongo Error →', err))
