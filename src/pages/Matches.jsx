import { useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import './Matches.css'

// Sample matches data
const sampleMatches = [
  {
    id: 2,
    name: 'Sarah',
    age: 24,
    photo: 'https://i.pravatar.cc/150?img=5',
    matchedDate: '2 days ago'
  },
  {
    id: 3,
    name: 'Emily',
    age: 26,
    photo: 'https://i.pravatar.cc/150?img=9',
    matchedDate: '1 week ago'
  },
  {
    id: 4,
    name: 'Michael',
    age: 28,
    photo: 'https://i.pravatar.cc/150?img=12',
    matchedDate: '3 days ago'
  }
]

function Matches() {
  const [matches] = useState(sampleMatches)

  return (
    <div className="matches-container">
      <div className="matches-header">
        <h1>Your Matches</h1>
        <p>{matches.length} people liked you back!</p>
      </div>
      <div className="matches-grid">
        {matches.length > 0 ? (
          matches.map((match) => (
            <div key={match.id} className="match-card">
              <img src={match.photo} alt={match.name} />
              <div className="match-info">
                <h3>{match.name}, {match.age}</h3>
                <p className="match-date">
                  <FaHeart className="heart-icon" /> Matched {match.matchedDate}
                </p>
                <button className="message-btn">Send Message</button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-matches">
            <p>No matches yet. Keep swiping!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Matches
