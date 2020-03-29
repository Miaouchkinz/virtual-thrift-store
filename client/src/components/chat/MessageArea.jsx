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

    return (
      <div className="ind-message-container" key={message.id}>
        <li>
          <img
            className="message-area-avatar"
            src={user.avatar_url}
            alt="chat-correspondent-avatar"
          />
          {user.name} said: {message.text}
        </li>
        <Moment 
          className="message-timestamp" 
          fromNow
        >
          {message.created_at}
        </Moment>
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
      <h2>{title}</h2>
      <ul>{orderedMessages(messages)}</ul>
      <NewMessageForm conversation_id={id} currentUser_id={currentUser.id} addNewMessageToConversation={addNewMessageToConversation} />
    </div>
  );
};