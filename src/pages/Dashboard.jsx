import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Link, Navigate } from "react-router"

import '../assets/styles/pages/Dashboard.css'

const Dashboard = () => {
  const { authTokens, logout } = useContext(AuthContext)

  if (!authTokens) {
    return <Navigate to="login" replace />
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="dashboard-wrapper">
      <div className="logout-button" onClick={handleLogout}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="6" r="4"/><ellipse cx="12" cy="17" rx="7" ry="4"/></g></svg> Log out</div>
      <h1>Account details</h1>
      <div className="addresses"><Link to={'addresses/'}>View addresses</Link></div>
      <h1>Order history</h1>
      <p>You haven&apos;t place any orders yet.</p>
    </div>
  )
}

export default Dashboard
