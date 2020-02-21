import React from 'react'
import './Input.css'

const Input = ({ message, setMessage, sentMessage }) => (
  <form className="form">
    <input
      type="text"
      className="input"
      placeholder="Type a message...."
      onChange={e => setMessage(e.target.value)}
      onKeyPress={e => (e.key === 'Enter' ? sentMessage(e) : null)}
      value={message}
    />
    <button className="sendButton" onClick={e => sentMessage(e)}>
      Send
    </button>
  </form>
)

export default Input
