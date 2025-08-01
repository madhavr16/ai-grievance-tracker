const mongoose = require('mongoose')

const complaintSchema = new mongoose.Schema({
  userText: String,
  locality: String,
  name: String,
  phone: String,
  department: String, // ⬅️ ML predicted department
  urgency: String, // ⬅️ ML predicted urgency
  translatedText: String, // ⬅️ Optional translated version
  entities: [ // ⬅️ Optional NER output
    {
      text: String,
      label: String
    }
  ],
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  feedback: { type: String, default: '' }
})

module.exports = mongoose.model('Complaint', complaintSchema)
