import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import SubmitComplaint from './pages/SubmitComplaint'
import RequireAuth from './components/RequireAuth'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* 🔒 Admin Dashboard – Protected */}
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />

      {/* 🌐 Public Complaint Form */}
      <Route path="/submit" element={<SubmitComplaint />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
