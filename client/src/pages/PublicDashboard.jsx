import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getToken, logout } from '../utils/auth'
import axios from '../services/api'

const PublicDashboard = () => {
  const [complaints, setComplaints] = useState([])
  const [feedbackMap, setFeedbackMap] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const token = getToken()
    if (!token) return navigate('/')

    const fetchData = async () => {
      try {
        const res = await axios.get('/api/complaints', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setComplaints(res.data)
      } catch (err) {
        console.error(err)
        logout()
        navigate('/')
      }
    }

    fetchData()
  }, [navigate])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleFeedbackChange = (id, value) => {
    setFeedbackMap(prev => ({ ...prev, [id]: value }))
  }

  const handleFeedbackSubmit = async (id) => {
    try {
      const feedback = feedbackMap[id]
      if (!feedback) return
      await axios.post(
        `/complaints/${id}/feedback`,
        { feedback },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      )
      alert('Feedback submitted successfully')
      setFeedbackMap(prev => ({ ...prev, [id]: '' }))
    } catch (err) {
      console.error('Failed to submit feedback:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">All Complaints</h1>
        <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Logout
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-200 text-xs uppercase text-gray-600">
            <tr>
              <th className="px-4 py-3">Issue</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Department</th>
              <th className="px-4 py-3">Severity</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Feedback</th>
            </tr>
          </thead>
          <tbody>
            {complaints.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">No complaints found</td>
              </tr>
            ) : (
              complaints.map((c, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 align-top">
                  <td className="px-4 py-3 w-1/5">{c.userText}</td>
                  <td className="px-4 py-3 w-1/6">{c.locality}</td>
                  <td className="px-4 py-3 w-1/6">{c.department || 'N/A'}</td>
                  <td className="px-4 py-3 w-1/6">{c.urgency || 'N/A'}</td>
                  <td className="px-4 py-3 w-1/6 capitalize">{c.status}</td>
                  <td className="px-4 py-3 w-1/4">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        className="border px-2 py-1 rounded w-full"
                        placeholder="Your feedback"
                        value={feedbackMap[c._id] || ''}
                        onChange={(e) => handleFeedbackChange(c._id, e.target.value)}
                      />
                      <button
                        onClick={() => handleFeedbackSubmit(c._id)}
                        className="bg-green-600 text-white text-xs px-3 py-1 rounded hover:bg-green-700"
                      >
                        Submit
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PublicDashboard
