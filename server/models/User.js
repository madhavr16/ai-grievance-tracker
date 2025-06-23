const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  role: { type: String, enum: ['public', 'admin'], required: true },
  phone: { type: String },
  email: { type: String },
  passwordHash: { type: String }, // for admins only
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', userSchema)
