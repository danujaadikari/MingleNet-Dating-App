import { useState } from 'react'
import { FaCog, FaSliders, FaMoon, FaSun } from 'react-icons/fa'
import './Settings.css'

function Settings({ currentUser, darkMode, setDarkMode }) {
  const [filters, setFilters] = useState({
    minAge: 18,
    maxAge: 100,
    selectedInterests: []
  })

  const interestOptions = [
    'Travel', 'Music', 'Food', 'Sports', 'Art', 'Photography', 
    'Reading', 'Movies', 'Fitness', 'Technology', 'Gaming', 'Cooking',
    'Dancing', 'Hiking', 'Yoga', 'Coffee', 'Beach', 'Nature'
  ]

  const handleAgeChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: parseInt(e.target.value)
    })
  }

  const toggleInterest = (interest) => {
    setFilters(prev => ({
      ...prev,
      selectedInterests: prev.selectedInterests.includes(interest)
        ? prev.selectedInterests.filter(i => i !== interest)
        : [...prev.selectedInterests, interest]
    }))
  }

  const handleSave = () => {
    localStorage.setItem('userFilters', JSON.stringify(filters))
    alert('Settings saved successfully! 🎉')
  }

  const handleReset = () => {
    setFilters({
      minAge: 18,
      maxAge: 100,
      selectedInterests: []
    })
    localStorage.removeItem('userFilters')
  }

  return (
    <div className="settings-container">
      <div className="settings-content">
        <div className="settings-header">
          <FaCog className="settings-icon" />
          <h1>Settings</h1>
        </div>

        {/* Theme Toggle */}
        <div className="settings-section">
          <h2>Appearance</h2>
          <div className="theme-toggle">
            <span>Dark Mode</span>
            <button 
              className={`toggle-btn ${darkMode ? 'active' : ''}`}
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <FaMoon /> : <FaSun />}
              {darkMode ? 'On' : 'Off'}
            </button>
          </div>
        </div>

        {/* Age Filter */}
        <div className="settings-section">
          <h2><FaSliders /> Discovery Filters</h2>
          <div className="filter-group">
            <label>Age Range</label>
            <div className="age-range">
              <div className="age-input-group">
                <label>Min Age</label>
                <input
                  type="number"
                  name="minAge"
                  value={filters.minAge}
                  onChange={handleAgeChange}
                  min="18"
                  max={filters.maxAge}
                />
              </div>
              <span className="range-separator">-</span>
              <div className="age-input-group">
                <label>Max Age</label>
                <input
                  type="number"
                  name="maxAge"
                  value={filters.maxAge}
                  onChange={handleAgeChange}
                  min={filters.minAge}
                  max="100"
                />
              </div>
            </div>
            <p className="filter-preview">
              Showing profiles aged {filters.minAge} to {filters.maxAge}
            </p>
          </div>

          {/* Interest Filter */}
          <div className="filter-group">
            <label>Filter by Interests</label>
            <p className="filter-description">Select interests to find people with similar hobbies</p>
            <div className="interests-grid">
              {interestOptions.map((interest, index) => (
                <button
                  key={index}
                  className={`interest-filter-btn ${
                    filters.selectedInterests.includes(interest) ? 'selected' : ''
                  }`}
                  onClick={() => toggleInterest(interest)}
                >
                  {interest}
                </button>
              ))}
            </div>
            {filters.selectedInterests.length > 0 && (
              <p className="filter-preview">
                Filtering by: {filters.selectedInterests.join(', ')}
              </p>
            )}
          </div>
        </div>

        {/* Account Info */}
        <div className="settings-section">
          <h2>Account Information</h2>
          <div className="account-info">
            <p><strong>Name:</strong> {currentUser?.name}</p>
            <p><strong>Email:</strong> {currentUser?.email}</p>
            <p><strong>Age:</strong> {currentUser?.age}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="settings-actions">
          <button className="save-btn" onClick={handleSave}>
            Save Settings
          </button>
          <button className="reset-btn" onClick={handleReset}>
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings
