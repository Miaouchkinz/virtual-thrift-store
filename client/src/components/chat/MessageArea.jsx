import React from "react";
import Moment from "react-moment";
import NewMessageForm from "./NewMessageForm";
import { ActionCable } from 'react-actioncable-provider';

export default function MessagesArea({conversation: { id, title, messages, user_1, user_2 }, currentUser, addNewMessageToConversation, handleReceivedMessage}) {

const orderedMessages = messages => {
  const sortedMessages = messages.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );
  return sortedMessages.map(message => {
    const user = message.user_id === user_1[0].id ? user_1[0] : user_2[0];
    const isCurrentUser = currentUser.id === message.user_id;
    return (
      <div className={`ind-message-container ${isCurrentUser ? 'sender' : 'receiver'}`} key={message.id}>
        <li>
          <img
            className="message-area-avatar"
            src={user.avatar_url}
            alt="chat-correspondent-avatar"
          />
          <div className="message-details">
            <div className="username">{user.name}</div>
            <div className="message-text">{message.text}</div>
            <Moment 
              className="message-timestamp" 
              fromNow
            >
              {message.created_at}
            </Moment>
          </div>
        </li>
      </div>
    );
  });
};

  return (
    <div className="messagesArea">
      <ActionCable
        channel={{ channel: 'MessagesChannel', conversation: id }}
        onReceived={handleReceivedMessage}
      />
      <ul>{orderedMessages(messages)}</ul>
      <NewMessageForm conversation_id={id} currentUser_id={currentUser.id} addNewMessageToConversation={addNewMessageToConversation} />
    </div>
  );
};