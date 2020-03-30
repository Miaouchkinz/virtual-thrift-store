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
    <div id="chat-window-header">   
      <nav>
        <div className="wave-spacer">
          <img
            className="chat-wave"
            src="/images/final_project_header_wave_1.png"
            alt="Top wave decoration."
          ></img>
        </div>
        <div className="chat-menu">
          <div className="chat-navigation">
            <Link to={'/user/profile'}>
              <Icon id="chat-back" secondary label="<"></Icon>
            </Link>
            <span className="back-to-profile">Back to profile</span>
          </div>
          <div className="corresponding-user-info">
            <img
              className="chat-window-avatar"
              src={correspondentUser.avatar_url}
              alt="chat-correspondent-avatar"
            />
            <span className="chat-correspondent-name">Conversation with {correspondentUser.name}</span>
          </div>
        </div>
      </nav> 
      <header>
        <h3>A new request was sent :</h3>
        <h4 className="message-title">{findActiveConversation(
            conversations,
            activeConversationID
          ).title}</h4>
      </header>
      <div id="message-area-container">
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
    </div> 
  )
}