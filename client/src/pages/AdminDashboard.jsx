import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getToken, logout } from '../utils/auth'
import axios from '../services/api'

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const token = getToken()
    if (!token) return navigate('/')

    const fetchData = async () => {
      try {
        const res = await axios.get('/complaints', {
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

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(
        `/admin/complaints/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      )
      setComplaints((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c))
      )
    } catch (err) {
      console.error('Status update failed', err)
    }
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
              <th className="px-4 py-3">Severity</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">No complaints found</td>
              </tr>
            ) : (
              complaints.map((c, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 align-top">{c.userText}</td>
                  <td className="px-4 py-3 align-top">{c.locality}</td>
                  <td className="px-4 py-3 align-top">{c.department || '-'}</td>
                  <td className="px-4 py-3 align-top">{c.urgency || '-'}</td>
                  <td className="px-4 py-3 align-top capitalize">{c.status}</td>
                  <td className="px-4 py-3 align-top">
                    <select
                      value={c.status}
                      onChange={(e) => {
                        console.log(`Updating status of ${c._id} to ${e.target.value}`)
                        handleStatusChange(c._id, e.target.value)
                      }}
                      className="border px-2 py-1 rounded"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
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

export default AdminDashboard