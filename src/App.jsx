import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Matches from './pages/Matches'
import Messages from './pages/Messages'
import Settings from './pages/Settings'
import Navbar from './components/Navbar'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [allUsers, setAllUsers] = useState([]) // Store all created users
  const [darkMode, setDarkMode] = useState(false)

  // Load dark mode preference
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(savedDarkMode)
  }, [])

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode)
    if (darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [darkMode])

  const handleLogin = (user) => {
    setIsLoggedIn(true)
    setCurrentUser(user)
  }

  const handleSignup = (user) => {
    // Add the new user to the list of all users
    setAllUsers(prevUsers => [...prevUsers, user])
    // Log them in automatically
    setIsLoggedIn(true)
    setCurrentUser(user)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser(null)
  }

  return (
    <Router>
      <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
        {isLoggedIn && <Navbar onLogout={handleLogout} currentUser={currentUser} />}
        <Routes>
          <Route 
            path="/login" 
            element={!isLoggedIn ? <Login onLogin={handleLogin} /> : <Navigate to="/home" />} 
          />
          <Route 
            path="/signup" 
            element={!isLoggedIn ? <Signup onLogin={handleSignup} /> : <Navigate to="/home" />} 
          />
          <Route 
            path="/home" 
            element={isLoggedIn ? <Home currentUser={currentUser} allUsers={allUsers} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/profile" 
            element={isLoggedIn ? <Profile currentUser={currentUser} setCurrentUser={setCurrentUser} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/matches" 
            element={isLoggedIn ? <Matches currentUser={currentUser} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/messages" 
            element={isLoggedIn ? <Messages currentUser={currentUser} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/settings" 
            element={isLoggedIn ? <Settings currentUser={currentUser} darkMode={darkMode} setDarkMode={setDarkMode} /> : <Navigate to="/login" />} 
          />
          <Route path="/" element={<Navigate to={isLoggedIn ? "/home" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
