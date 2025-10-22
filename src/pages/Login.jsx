import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'
import './Auth.css'

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate login (in real app, this would call an API)
    const user = {
      id: 1,
      name: 'Demo User',
      email: email,
      age: 25,
      bio: 'Love traveling and meeting new people!',
      interests: ['Travel', 'Music', 'Food'],
      photos: ['https://i.pravatar.cc/300?img=1']
    }
    onLogin(user)
    navigate('/home')
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <FaHeart className="logo-icon" />
          <h1>MingleNet</h1>
          <p>Welcome back! Log in to find your match</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="auth-button">Log In</button>
        </form>
        <p className="auth-footer">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
