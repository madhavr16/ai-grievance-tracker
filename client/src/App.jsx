import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'       // for officials
import SubmitComplaint from './pages/SubmitComplaint' // for public users
import { getToken } from './utils/auth.js'

const App = () => {
  const isAuthenticated = !!getToken()

  return (
    <Routes>
      {/* Home Route → Login Tabs (Admin & Public) */}
      <Route path="/" element={<Login />} />

      {/* Admin Dashboard – Protected */}
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? <Dashboard /> : <Navigate to="/" />
        }
      />

      {/* Public User Route */}
      <Route path="/submit" element={<SubmitComplaint />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
