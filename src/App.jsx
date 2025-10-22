import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Matches from './pages/Matches'
import Messages from './pages/Messages'
import Navbar from './components/Navbar'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  const handleLogin = (user) => {
    setIsLoggedIn(true)
    setCurrentUser(user)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser(null)
  }

  return (
    <Router>
      <div className="App">
        {isLoggedIn && <Navbar onLogout={handleLogout} currentUser={currentUser} />}
        <Routes>
          <Route 
            path="/login" 
            element={!isLoggedIn ? <Login onLogin={handleLogin} /> : <Navigate to="/home" />} 
          />
          <Route 
            path="/signup" 
            element={!isLoggedIn ? <Signup onLogin={handleLogin} /> : <Navigate to="/home" />} 
          />
          <Route 
            path="/home" 
            element={isLoggedIn ? <Home currentUser={currentUser} /> : <Navigate to="/login" />} 
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
          <Route path="/" element={<Navigate to={isLoggedIn ? "/home" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
