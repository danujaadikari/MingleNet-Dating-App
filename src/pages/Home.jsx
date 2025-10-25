import { useState, useEffect } from 'react'
import { FaHeart, FaTimes, FaMapMarkerAlt, FaInfoCircle, FaUndo } from 'react-icons/fa'
import './Home.css'

const sampleUsers = [
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

function Home({ currentUser, allUsers = [] }) {
  const [users, setUsers] = useState(sampleUsers)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [matches, setMatches] = useState([])
  const [lastAction, setLastAction] = useState(null)
  const [swipeDirection, setSwipeDirection] = useState('')
  
  useEffect(() => {
    if (allUsers.length > 0) {
      const newlyCreatedUsers = allUsers
        .filter(user => user.id !== currentUser?.id)
        .map(user => ({
          ...user,
          location: user.location || 'Unknown Location',
          bio: user.bio || 'New to MingleNet! Say hi! 👋',
          interests: user.interests?.length > 0 ? user.interests : ['New Here'],
          photos: user.photos || ['https://i.pravatar.cc/400?img=' + Math.floor(Math.random() * 70)]
        }))
      
      setUsers([...newlyCreatedUsers, ...sampleUsers])
    }
  }, [allUsers, currentUser])

  const handleLike = () => {
    setSwipeDirection('right')
    const likedUser = users[currentIndex]
    setLastAction({ type: 'like', index: currentIndex, user: likedUser })
    setMatches([...matches, likedUser])
    
    setTimeout(() => {
      alert(`It's a match! You and ${likedUser.name} liked each other! 💕`)
      setSwipeDirection('')
      nextCard()
    }, 300)
  }

  const handlePass = () => {
    setSwipeDirection('left')
    setLastAction({ type: 'pass', index: currentIndex, user: users[currentIndex] })
    
    setTimeout(() => {
      setSwipeDirection('')
      nextCard()
    }, 300)
  }

  const handleUndo = () => {
    if (lastAction) {
      setCurrentIndex(lastAction.index)
      if (lastAction.type === 'like') {
        setMatches(matches.filter(m => m.id !== lastAction.user.id))
      }
      setLastAction(null)
      setSwipeDirection('')
    }
  }

  const nextCard = () => {
    if (currentIndex < users.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(0)
    }
  }

  if (users.length === 0 || currentIndex >= users.length) {
    return (
      <div className="home-container">
        <div className="no-users">
          <h2>No more users to show</h2>
          <p>Check back later for more matches!</p>
        </div>
      </div>
    )
  }

  const currentProfile = users[currentIndex]

  return (
    <div className="home-container">
      <div className="card-container">
        <div className={`profile-card ${swipeDirection ? `swipe-${swipeDirection}` : ''}`}>
          <div className="card-image-container">
            <img src={currentProfile.photos[0]} alt={currentProfile.name} />
            <div className="card-gradient"></div>
            <div className="card-info">
              <h2>{currentProfile.name}, {currentProfile.age}</h2>
              <p className="location">
                <FaMapMarkerAlt /> {currentProfile.location}
              </p>
            </div>
          </div>
          <div className="card-details">
            <div className="bio-section">
              <FaInfoCircle className="section-icon" />
              <p>{currentProfile.bio}</p>
            </div>
            <div className="interests-section">
              <h3>Interests</h3>
              <div className="interests-tags">
                {currentProfile.interests.map((interest, index) => (
                  <span key={index} className="interest-tag">{interest}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="action-buttons">
          {lastAction && (
            <button className="undo-button" onClick={handleUndo} title="Undo last action">
              <FaUndo />
            </button>
          )}
          <button className="pass-button" onClick={handlePass}>
            <FaTimes />
          </button>
          <button className="like-button" onClick={handleLike}>
            <FaHeart />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
