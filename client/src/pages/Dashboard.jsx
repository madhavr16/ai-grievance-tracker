import { getUserRole } from '../utils/auth'
import AdminDashboard from './AdminDashboard'
import PublicDashboard from './PublicDashboard'

const Dashboard = () => {
  const role = getUserRole()

  if (role === 'admin') {
    return <AdminDashboard />
  } else if (role === 'public') {
    return <PublicDashboard />
  } else {
    return <div className="text-center mt-20 text-red-500 font-semibold">Unauthorized</div>
  }
}

export default Dashboard
