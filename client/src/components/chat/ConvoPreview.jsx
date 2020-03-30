import React from "react";
import Moment from "react-moment";

export default function ConvoPreview({avatar, userName, lastMessagePreview, latestMessageTime}) {

  return (
    <div className="chat-container">
      <img
        className="chat-preview-avatar"
        src={avatar}
        alt="chat-correspondent-avatar"
      />
      <div className="message-preview">
        <span className="username">{userName}</span>
        <div className="last-message">{lastMessagePreview}</div>
      </div>
      <div>
        {latestMessageTime && 
          <Moment 
            className="last-message-timestamp" 
            fromNow
          >
            {latestMessageTime}
          </Moment>}
      </div>
    </div>
  )
}