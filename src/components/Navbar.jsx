import { Link, useLocation } from 'react-router-dom'
import { FaHome, FaHeart, FaComments, FaUser, FaSignOutAlt, FaCog } from 'react-icons/fa'
import './Navbar.css'

function Navbar({ onLogout, currentUser }) {
  const location = useLocation()

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <FaHeart className="brand-icon" />
        <span>MingleNet</span>
      </div>
      <div className="navbar-links">
        <Link to="/home" className={location.pathname === '/home' ? 'active' : ''}>
          <FaHome /> <span>Browse</span>
        </Link>
        <Link to="/matches" className={location.pathname === '/matches' ? 'active' : ''}>
          <FaHeart /> <span>Matches</span>
        </Link>
        <Link to="/messages" className={location.pathname === '/messages' ? 'active' : ''}>
          <FaComments /> <span>Messages</span>
        </Link>
        <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>
          <FaUser /> <span>Profile</span>
        </Link>
        <Link to="/settings" className={location.pathname === '/settings' ? 'active' : ''}>
          <FaCog /> <span>Settings</span>
        </Link>
      </div>
      <button onClick={onLogout} className="logout-button">
        <FaSignOutAlt /> Logout
      </button>
    </nav>
  )
}

export default Navbar
