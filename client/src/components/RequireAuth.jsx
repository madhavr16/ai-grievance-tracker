import { Navigate } from 'react-router-dom'
import { getToken } from '../utils/auth'

const RequireAuth = ({ children }) => {
  const token = getToken()

  return token ? children : <Navigate to="/" />
}

export default RequireAuth
