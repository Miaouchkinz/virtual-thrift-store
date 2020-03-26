import react from "react";
import Icon from "../common/iconButton"

export default function ChatWindow() {
  return (
    <div className="chat-window-header">
      <nav>
        <Icon secondary onClick={() => history.push('/user/profile')} label="<"></Icon>
      </nav>
      <header>
        <img
          className="chat-window-avatar"
          src={avatar}
          alt="chat-correspondent-avatar"
        />
        <span className="chat-correspondent-name">Correspondent's name</span>
      </header>
    </div>
  )
}