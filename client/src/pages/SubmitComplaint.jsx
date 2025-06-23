import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../services/api'
import { getToken } from '../utils/auth'

const SubmitComplaint = () => {
  const navigate = useNavigate()
  const [userText, setUserText] = useState('')
  const [locality, setLocality] = useState('')
  const [department, setDepartment] = useState('Sanitation')
  const [urgency, setUrgency] = useState('low')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = getToken()
    if (!token) return navigate('/')

    try {
      await axios.post(
        '/public/complaint',
        { userText, locality, department, urgency },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setSuccess('Complaint submitted successfully!')
      setUserText('')
      setLocality('')
      setDepartment('Sanitation')
      setUrgency('low')
      setError('')
    } catch (err) {
      console.error(err)
      setError('Failed to submit complaint.')
      setSuccess('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 shadow rounded">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Submit a Complaint</h2>

        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full border rounded p-3 mb-4"
            rows="4"
            placeholder="Describe your issue..."
            value={userText}
            onChange={(e) => setUserText(e.target.value)}
            required
          />

          <input
            type="text"
            className="w-full border rounded p-2 mb-4"
            placeholder="Your locality / area"
            value={locality}
            onChange={(e) => setLocality(e.target.value)}
            required
          />

          <label className="block mb-1 font-medium">Select Department</label>
          <select
            className="w-full border rounded p-2 mb-4"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          >
            <option value="Sanitation">Sanitation</option>
            <option value="Water">Water</option>
            <option value="Electricity">Electricity</option>
            <option value="Roads">Roads</option>
            <option value="Sewage">Sewage</option>
          </select>

          <label className="block mb-1 font-medium">Urgency</label>
          <select
            className="w-full border rounded p-2 mb-4"
            value={urgency}
            onChange={(e) => setUrgency(e.target.value)}
            required
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
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
