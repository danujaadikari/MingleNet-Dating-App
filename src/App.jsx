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

// Initial sample users
const initialUsers = [
  {
    id: 2,
    name: 'Sarah',
    age: 24,
    location: 'New York, NY',
    bio: 'Coffee enthusiast ☕ | Adventure seeker 🏔️ | Love dogs 🐕',
    interests: ['Travel', 'Photography', 'Yoga'],
    photos: ['https://i.pravatar.cc/400?img=5']
  },
  {
    id: 3,
    name: 'Emily',
    age: 26,
    location: 'Los Angeles, CA',
    bio: 'Artist by day, foodie by night 🎨🍕 Always looking for new experiences!',
    interests: ['Art', 'Food', 'Music'],
    photos: ['https://i.pravatar.cc/400?img=9']
  },
  {
    id: 4,
    name: 'Michael',
    age: 28,
    location: 'Chicago, IL',
    bio: 'Tech enthusiast | Gym lover 💪 | Looking for meaningful connections',
    interests: ['Fitness', 'Technology', 'Movies'],
    photos: ['https://i.pravatar.cc/400?img=12']
  },
  {
    id: 5,
    name: 'Jessica',
    age: 23,
    location: 'Miami, FL',
    bio: 'Beach lover 🏖️ | Book worm 📚 | Let\'s grab coffee and talk about life',
    interests: ['Reading', 'Beach', 'Travel'],
    photos: ['https://i.pravatar.cc/400?img=20']
  },
  {
    id: 6,
    name: 'David',
    age: 27,
    location: 'Seattle, WA',
    bio: 'Software developer | Coffee addict | Outdoor enthusiast 🌲',
    interests: ['Hiking', 'Technology', 'Coffee'],
    photos: ['https://i.pravatar.cc/400?img=15']
  }
]

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [allUsers, setAllUsers] = useState(initialUsers)

  const handleLogin = (user) => {
    setIsLoggedIn(true)
    setCurrentUser(user)
  }

  const handleSignup = (user) => {
    // Add new user to the list of all users
    setAllUsers(prevUsers => [...prevUsers, user])
    // Log them in
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
