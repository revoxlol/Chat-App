import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import './ChatApp.css';

const ChatApp = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const newSocket = io('http://localhost:3000', { path: '/socket.io' });
    setSocket(newSocket);

    newSocket.on('chatMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    newSocket.on('updateOnlineUsers', (users) => {
      setOnlineUsers(users);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from WebSocket');
    });

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  const sendMessage = () => {
    if (socket && inputMessage.trim() !== '') {
      const message = inputMessage.trim();
      socket.emit('chatMessage', message);
      setInputMessage('');
    }
  };

  return (
    <div className="chat-container">
      
      <div className="navbar">
        <h1>WereBack</h1>
      </div>

     
      <div className="online-users">
        <h2>Online Users</h2>
        <ul>
          {onlineUsers.map((user) => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      </div>

   
      <div className="message-container">
        <div className="message-output">
          <ul>
            {messages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>
        <div className="input-container">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
