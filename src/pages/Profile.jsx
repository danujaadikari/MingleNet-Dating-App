import { useState } from 'react'
import { FaCamera, FaEdit } from 'react-icons/fa'
import './Profile.css'

function Profile({ currentUser, setCurrentUser }) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    age: currentUser?.age || '',
    bio: currentUser?.bio || '',
    interests: currentUser?.interests?.join(', ') || ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const updatedUser = {
      ...currentUser,
      name: formData.name,
      age: parseInt(formData.age),
      bio: formData.bio,
      interests: formData.interests.split(',').map(i => i.trim())
    }
    setCurrentUser(updatedUser)
    setIsEditing(false)
    alert('Profile updated successfully!')
  }

  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="profile-header">
          <div className="profile-photo-container">
            <img 
              src={currentUser?.photos?.[0] || 'https://i.pravatar.cc/300?img=1'} 
              alt={currentUser?.name} 
              className="profile-photo"
            />
            <button className="change-photo-btn">
              <FaCamera />
            </button>
          </div>
          <button 
            className="edit-profile-btn"
            onClick={() => setIsEditing(!isEditing)}
          >
            <FaEdit /> {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="18"
                max="100"
                required
              />
            </div>
            <div className="form-group">
              <label>Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="4"
                placeholder="Tell us about yourself..."
              />
            </div>
            <div className="form-group">
              <label>Interests (comma-separated)</label>
              <input
                type="text"
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                placeholder="Travel, Music, Sports"
              />
            </div>
            <button type="submit" className="save-btn">Save Changes</button>
          </form>
        ) : (
          <div className="profile-details">
            <div className="detail-section">
              <h2>{currentUser?.name}, {currentUser?.age}</h2>
              <p className="email">{currentUser?.email}</p>
            </div>
            <div className="detail-section">
              <h3>About Me</h3>
              <p>{currentUser?.bio || 'No bio added yet.'}</p>
            </div>
            <div className="detail-section">
              <h3>My Interests</h3>
              <div className="interests-display">
                {currentUser?.interests?.length > 0 ? (
                  currentUser.interests.map((interest, index) => (
                    <span key={index} className="interest-badge">{interest}</span>
                  ))
                ) : (
                  <p>No interests added yet.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
