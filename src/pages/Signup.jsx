import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'
import './Auth.css'

function Signup({ onLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    gender: ''
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate signup (in real app, this would call an API)
    const user = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      age: parseInt(formData.age),
      gender: formData.gender,
      bio: '',
      interests: [],
      photos: ['https://i.pravatar.cc/300?img=' + Math.floor(Math.random() * 70)]
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
          <p>Create your account and start matching</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Age"
                min="18"
                max="100"
                required
              />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <button type="submit" className="auth-button">Sign Up</button>
        </form>
        <p className="auth-footer">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
