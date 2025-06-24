const mongoose = require('mongoose')

const complaintSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  userPhone: String
})

module.exports = mongoose.model('Complaint', complaintSchema)
