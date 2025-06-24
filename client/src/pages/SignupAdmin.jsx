import { useState } from 'react'
import axios from '../services/api'
import { useNavigate } from 'react-router-dom'

const SignupAdmin = () => {
  const navigate = useNavigate()
  const [isSignup, setIsSignup] = useState(false)

  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [department, setDepartment] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const payload = isSignup
        ? { email, phone, password, department }
        : { email, password }

      const url = isSignup ? '/admin/register' : '/admin/login'
      const res = await axios.post(url, payload)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('role', 'admin') // ✅ set admin role
      navigate('/dashboard')
    } catch (err) {
      setError(err?.response?.data?.error || 'Something went wrong')
    }
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white border border-gray-200 shadow-lg rounded-xl p-8">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        {isSignup ? 'Admin Registration' : 'Admin Login'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter official email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {isSignup && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                placeholder="Enter 10-digit phone number"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                pattern="[0-9]{10}"
                maxLength={10}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              >
                <option value="">Select Department</option>
                <option value="PWD">PWD</option>
                <option value="Water">Water</option>
                <option value="Electricity">Electricity</option>
                <option value="Sanitation">Sanitation</option>
              </select>
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition"
        >
          {isSignup ? 'Register Admin' : 'Login as Admin'}
        </button>

        {error && <p className="text-center text-red-500 text-sm mt-2">{error}</p>}
      </form>

      <p className="text-sm text-center mt-6 text-gray-500">
        {isSignup ? 'Already have an account?' : "Don't have an account?"}
        <span
          onClick={() => {
            setIsSignup(!isSignup)
            setError('')
          }}
          className="ml-2 text-blue-600 hover:underline cursor-pointer"
        >
          {isSignup ? 'Login' : 'Sign Up'}
        </span>
      </p>
    </div>
  )
}

export default SignupAdmin
