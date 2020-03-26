import react from "react";

export default function ConvoPreview() {
  return (
    <div className="chat-preview-container">
      <img
        className="chat-preview-avatar"
        src={avatar}
        alt="chat-correspondent-avatar"
      />
      <span className="chat-correspondent-name">OtherUser</span>
      <span className="last-message-timestamp">Time since</span>
    </div>
  )
}