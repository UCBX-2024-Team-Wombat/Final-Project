import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_MESSAGES_BETWEEN_USERS } from '../utils/queries.js';
import AuthService from '../utils/auth';

const MessageHistory = () => {
  const userId = AuthService.getProfile().data._id;
  const { loading, data } = useQuery(QUERY_MESSAGES_BETWEEN_USERS, {
    variables: { userId: userId }
  });

  if (loading) return <p>Loading messages...</p>;
  if (!data) return <p>No messages found.</p>;

  return (
    <div>
      <h1>Message History</h1>
      <ul>
        {data.getMessagesBetweenUsers.map((msg, index) => (
          <li key={index}>
            <strong>{msg.senderId === userId ? 'Sent' : 'Received'}:</strong>
            {msg.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageHistory;
