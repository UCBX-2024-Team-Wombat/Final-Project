import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
const socket = io('http://localhost:3001'); // Update with your server URL

const Chat = ({ currentUser, recipientUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => { // Join the user's private room
    socket.emit('joinUser', currentUser.id);

    socket.on('newMessage', (message) => {
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
  