import React from "react";
import { useLocation, Link } from "react-router-dom";
import MessagesArea from "./MessageArea";
import Icon from "../common/iconButton"

export default function ChatWindow({ conversations, currentUser, addNewMessageToConversation, handleReceivedMessage }) {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();

  const activeConversationID = Number(query.get('id'));

  const findActiveConversation = (conversations, activeConversationID) => {
    return conversations.find(
      conversation => conversation.id === activeConversationID
    );
  };

  const findCorrespondentUser = (conversations, activeConversationID) => {
    const conversation = findActiveConversation(conversations, activeConversationID)
    const correspondentUser = currentUser.id === conversation.user_1[0].id ? conversation.user_2[0] : conversation.user_1[0];
    return correspondentUser;
  }

  const correspondentUser = findCorrespondentUser(conversations, activeConversationID)

  return (
    <div className="chat-window-header">   
      <nav>
        <Link to={'/user/profile'}>
          <Icon secondary label="<"></Icon>
        </Link>
      </nav> 
      <header>
        <img
          className="chat-window-avatar"
          src={correspondentUser.avatar_url}
          alt="chat-correspondent-avatar"
        />
        <span className="chat-correspondent-name">{correspondentUser.name}</span>
      </header>
        <MessagesArea
          currentUser={currentUser}
          addNewMessageToConversation={addNewMessageToConversation}
          handleReceivedMessage={handleReceivedMessage}
          conversation={findActiveConversation(
            conversations,
            activeConversationID
          )}
        />
    </div> 
  )
}