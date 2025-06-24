// models/Admin.js
const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true }, // 🆕
  password: { type: String, required: true },
  department: { type: String, required: true },
  role: { type: String, enum: ['superadmin', 'official'], default: 'official' }
})

module.exports = mongoose.model('Admin', adminSchema)
