import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getToken, setToken, logout } from '../utils/auth'

import axios from '../services/api'

const Dashboard = () => {
  const [complaints, setComplaints] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const token = getToken()
    if (!token) return navigate('/')

    // 🔒 Fetch complaints from backend (replace with real API)
    const fetchData = async () => {
      try {
        console.log('Token being sent:', token)
        const res = await axios.get('/admin/complaints', {
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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
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
              <th className="px-4 py-3">Urgency</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {complaints.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">No complaints found</td>
              </tr>
            ) : (
              complaints.map((c, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{c.userText}</td>
                  <td className="px-4 py-3">{c.locality}</td>
                  <td className="px-4 py-3">{c.department}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded-full font-semibold 
                      ${c.urgency === 'high' ? 'bg-red-100 text-red-600' :
                        c.urgency === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'}`}>
                      {c.urgency}
                    </span>
                  </td>
                  <td className="px-4 py-3 capitalize">{c.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard
