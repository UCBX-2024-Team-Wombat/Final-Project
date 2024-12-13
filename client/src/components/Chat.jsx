import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
const socket = io('http://localhost:3001'); 

const Chat = ({ currentUser, recipientUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => { // Join the user's private room
    socket.emit('joinUser', currentUser.id);

    socket.on('newMessage', (message) => {
      console.log("Message: ", message);
      if (
        (message.sender.id === currentUser.id && message.receiver.id === recipientUser.id) ||
        (message.sender.id === recipientUser.id && message.receiver.id === currentUser.id)
      ) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });
    return () => {
        socket.off('newMessage');
      };
    }, [currentUser.id, recipientUser.id]);
    const handleSendMessage = () => {
        const messageData = {
          receiverId: recipientUser.id,
          message: newMessage,
        };
        console.log("Message Data: ", messageData);
        socket.emit('sendMessage', messageData);
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: currentUser, receiver: recipientUser, message: newMessage, timestamp: new Date().toISOString() },
        ]);
        setNewMessage('');
      };
    
      return (
        <div>
          <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', maxHeight: '300px', overflowY: 'scroll' }}>
            {messages.map((msg, index) => (
              <div key={index}>
                <strong>{msg.sender.username}:</strong> {msg.message}{' '}
                <em>({new Date(msg.timestamp).toLocaleTimeString()})</em>
              </div>
            ))}
          </div>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message"
            style={{ width: '80%', marginRight: '10px' }}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
        );
    };
    
    export default Chat;