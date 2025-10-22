import { useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa'
import './Messages.css'

// Sample conversations
const sampleConversations = [
  {
    id: 2,
    name: 'Sarah',
    photo: 'https://i.pravatar.cc/80?img=5',
    lastMessage: 'That sounds great! 😊',
    time: '2m ago',
    unread: 2
  },
  {
    id: 3,
    name: 'Emily',
    photo: 'https://i.pravatar.cc/80?img=9',
    lastMessage: 'Thanks for the recommendation!',
    time: '1h ago',
    unread: 0
  },
  {
    id: 4,
    name: 'Michael',
    photo: 'https://i.pravatar.cc/80?img=12',
    lastMessage: 'See you there! 👋',
    time: '3h ago',
    unread: 0
  }
]

const sampleMessages = {
  2: [
    { id: 1, sender: 'them', text: 'Hi! How are you?', time: '10:30 AM' },
    { id: 2, sender: 'me', text: 'Hey! I\'m doing great, thanks! How about you?', time: '10:32 AM' },
    { id: 3, sender: 'them', text: 'I\'m good! I saw you like hiking. Have you been to any good trails lately?', time: '10:35 AM' },
    { id: 4, sender: 'me', text: 'Yes! I went to Mount Rainier last weekend. The views were incredible!', time: '10:40 AM' },
    { id: 5, sender: 'them', text: 'That sounds great! 😊', time: '10:42 AM' }
  ]
}

function Messages({ currentUser }) {
  const [conversations] = useState(sampleConversations)
  const [selectedChat, setSelectedChat] = useState(null)
  const [messages, setMessages] = useState(sampleMessages[2] || [])
  const [newMessage, setNewMessage] = useState('')

  const handleSelectChat = (conversation) => {
    setSelectedChat(conversation)
    setMessages(sampleMessages[conversation.id] || [])
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: 'me',
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages([...messages, message])
      setNewMessage('')
    }
  }

  return (
    <div className="messages-container">
      <div className="conversations-sidebar">
        <h2>Messages</h2>
        <div className="conversations-list">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={`conversation-item ${selectedChat?.id === conv.id ? 'active' : ''}`}
              onClick={() => handleSelectChat(conv)}
            >
              <img src={conv.photo} alt={conv.name} />
              <div className="conversation-info">
                <div className="conversation-header">
                  <h3>{conv.name}</h3>
                  <span className="time">{conv.time}</span>
                </div>
                <div className="conversation-preview">
                  <p>{conv.lastMessage}</p>
                  {conv.unread > 0 && <span className="unread-badge">{conv.unread}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="chat-area">
        {selectedChat ? (
          <>
            <div className="chat-header">
              <img src={selectedChat.photo} alt={selectedChat.name} />
              <h3>{selectedChat.name}</h3>
            </div>
            <div className="messages-list">
              {messages.map((msg) => (
                <div key={msg.id} className={`message ${msg.sender}`}>
                  <div className="message-bubble">
                    <p>{msg.text}</p>
                    <span className="message-time">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="message-input-container">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="message-input"
              />
              <button type="submit" className="send-button">
                <FaPaperPlane />
              </button>
            </form>
          </>
        ) : (
          <div className="no-chat-selected">
            <p>Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Messages
