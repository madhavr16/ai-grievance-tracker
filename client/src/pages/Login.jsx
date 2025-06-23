import { useState } from 'react'
import OTPLoginPublic from './OTPLoginPublic'
import AdminLogin from './SignupAdmin'
import bgImage from '../assets/bg-govtrack.jpg' // ✅ custom image

const Login = () => {
  const [tab, setTab] = useState('admin')

  return (
    <div
      className="min-h-screen bg-cover bg-center relative px-4 pt-8"
      style={{
        backgroundImage: `url(${bgImage})`, // ✅ custom image
      }}
    >
      {/* Logo Top Left */}
      <div className="absolute top-6 left-6 text-blue-600 text-xl font-bold drop-shadow-lg select-none">
        GovTrack
      </div>

      <div className="flex justify-center items-center min-h-[80vh]">
        <div className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl rounded-xl w-full max-w-md p-8">
          <div className="flex justify-center mb-6 rounded overflow-hidden border border-gray-300">
            <button
              className={`w-1/2 py-2 text-sm font-medium transition ${
                tab === 'admin' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
              }`}
              onClick={() => setTab('admin')}
            >
              Admin
            </button>
            <button
              className={`w-1/2 py-2 text-sm font-medium transition ${
                tab === 'public' ? 'bg-green-600 text-white' : 'bg-white text-gray-700'
              }`}
              onClick={() => setTab('public')}
            >
              Public
            </button>
          </div>

          {tab === 'admin' ? <AdminLogin /> : <OTPLoginPublic />}
        </div>
      </div>
    </div>
  )
}

export default Login
