import React from "react";
import Moment from "react-moment";

export default function ConvoPreview({avatar, userName, conversation, latestMessageTime}) {

  return (
    <div className="chat-preview-container">
      <img
        className="chat-preview-avatar"
        src={avatar}
        alt="chat-correspondent-avatar"
      />
      <span className="chat-correspondent-name">{userName}</span>
      {latestMessageTime && 
        <Moment 
          className="last-message-timestamp" 
          fromNow
        >
          {latestMessageTime}
        </Moment>}
    </div>
  )
}