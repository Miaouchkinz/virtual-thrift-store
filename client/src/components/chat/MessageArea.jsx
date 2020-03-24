import React from 'react';
import NewMessageForm from './NewMessageForm';

export default function MessagesArea({conversation: { id, title, messages }, currentUser, usersList}) {
// UseEffect // TO REFACTOR IF TIME
// get userId from conversations and find user info from /api/users, don't render all userslist in useApplicationData

// helpers
const orderedMessages = messages => {
  const sortedMessages = messages.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );
  return sortedMessages.map(message => {
    const user = usersList.find(user => user.id === message.user_id)

    return <li key={message.id}>{user.name} said: {message.text}</li>;
  });
};

  return (
    <div className="messagesArea">
      <h2>{title}</h2>
      <ul>{orderedMessages(messages)}</ul>
      <NewMessageForm conversation_id={id} currentUser={currentUser} />
    </div>
  );
};