import { useState } from 'react'
import axios from '../services/api'
import { useNavigate } from 'react-router-dom'

const OTPLoginPublic = () => {
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState(1)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const sendOtp = async (e) => {
    e.preventDefault()
    setError('')
    try {
  await axios.post('/api/public/send-otp', { phone })
      setStep(2)
    } catch {
      setError('Failed to send OTP. Please try again.')
    }
  }

  const verifyOtp = async (e) => {
    e.preventDefault()
    try {
  const res = await axios.post('/api/public/verify-otp', { phone, otp })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('role', 'public') // ✅ set public role
      navigate('/submit')
    } catch {
      setError('Invalid OTP. Please check and try again.')
    }
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white border border-gray-200 shadow-lg rounded-xl p-8">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Public User Login</h2>

      <form onSubmit={step === 1 ? sendOtp : verifyOtp} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            placeholder="Enter your 10-digit mobile number"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            pattern="[0-9]{10}"
            maxLength={10}
            required
            disabled={step === 2}
          />
        </div>

        {step === 2 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              required
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md font-medium hover:bg-green-700 transition"
        >
          {step === 1 ? 'Send OTP' : 'Verify OTP'}
        </button>

        {error && <p className="text-center text-red-500 text-sm mt-2">{error}</p>}
      </form>
    </div>
  )
}

export default OTPLoginPublic
