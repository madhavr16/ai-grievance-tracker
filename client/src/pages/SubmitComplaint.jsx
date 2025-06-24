import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../services/api'
import { getToken } from '../utils/auth'

const SubmitComplaint = () => {
  const navigate = useNavigate()
  const [userText, setUserText] = useState('')
  const [locality, setLocality] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = getToken()
    if (!token) return navigate('/')

    try {
      await axios.post(
        '/public/complaint',
        { userText, locality, name, phone },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setSuccess('✅ Complaint submitted successfully!')
      setUserText('')
      setLocality('')
      setName('')
      setPhone('')
      setError('')
    } catch (err) {
      console.error(err)
      setError('❌ Failed to submit complaint.')
      setSuccess('')
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      {/* 🔵 Text Logo */}
      <div className="absolute top-6 left-6 text-blue-600 text-xl font-bold drop-shadow-lg select-none">
        GovTrack
      </div>

      {/* Header Button */}
      <div className="flex justify-end max-w-6xl mx-auto mb-6">
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition"
        >
          Go to Complaints
        </button>
      </div>

      {/* Complaint Form Card */}
      <div className="max-w-xl mx-auto bg-white p-8 shadow-2xl rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Submit a Complaint
        </h2>

        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
            rows="4"
            placeholder="Describe your issue..."
            value={userText}
            onChange={(e) => setUserText(e.target.value)}
            required
          />

          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Your locality / area"
            value={locality}
            onChange={(e) => setLocality(e.target.value)}
            required
          />

          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Your Mobile Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-md transition"
          >
            Submit Complaint
          </button>

          {success && <p className="text-green-600 text-center mt-4">{success}</p>}
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default SubmitComplaint
