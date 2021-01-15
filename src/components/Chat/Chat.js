import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

import './Chat.css'
import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'

let socket

const Chat = ({ location }) => {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const END_POINT = 'https://server.ujjalkar17.vercel.app'

  useEffect(() => {
    const { name, room } = queryString.parse(location.search)
    socket = io(END_POINT)
    setName(name)
    setRoom(room)

    socket.emit('join', { name, room }, () => {
      // alert(error)
    })

    return () => {
      socket.emit('disconnect')
      socket.off()
    }
  }, [END_POINT, location.search])

  useEffect(() => {
    socket.on('message', message => {
      setMessages([...messages, message])
    })
  }, [messages])

  //  finction for sending

  const _sentMessage = e => {
    e.preventDefault()
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }
  console.log(message, messages)

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sentMessage={_sentMessage}
        />
        {/* <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyPress={e => (e.key === 'Enter' ? _sentMessage(e) : null)}
        /> */}
      </div>
    </div>
  )
}
export default Chat
