import React, {useEffect, useState} from "react";
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from '../../constants';

import NewConversationForm from './NewConversationForm';
import MessagesArea from './MessageArea';
import Cable from './Cable';


export default function ConversationsList(props) {

  const [localState, setLocalState] = useState({
    conversations: [],
    activeConversation: null    
  })
  const { conversations, activeConversation } = localState;
  
  useEffect(() => {
    if (props.currentUser.id) {
      fetch(`${API_ROOT}/conversations/${props.currentUser.id}`)
        .then(res => res.json())
        .then(conversations => setLocalState({ ...localState, conversations }));
    }

  }, [props.currentUser])

  const handleClick = id => {
    setLocalState({ ...localState, activeConversation: id });
  };

  const handleReceivedConversation = response => {
    const { conversation } = response;
    setLocalState(prev => {
      return {
      ...localState,
      conversations: [...prev.conversations, conversation]
    }
    }
    );
  };

  const handleReceivedMessage = response => {
    const { message } = response;
    const tempConversation = [...conversations]

    for(const conversation of tempConversation){
      if(conversation.id === message.conversation_id){
        conversation.messages.push(message)
      }
    }
    setLocalState(prev => ({ ...prev, conversations: tempConversation }));
  };

  const findActiveConversation = (conversations, activeConversation) => {
    return conversations.find(
      conversation => conversation.id === activeConversation
    );
  };
  
  const mapConversations = (conversations, handleClick) => {
    return conversations.map(conversation => {
      return (
        <li key={conversation.id} onClick={() => handleClick(conversation.id)}>
          {conversation.title}
        </li>
      );
    });
  };
 

  return (
    <div className="conversationsList">
      <ActionCable
        channel={{ channel: 'ConversationsChannel' }}
        onReceived={handleReceivedConversation}
      />
      {conversations && conversations.length && (
        <Cable
          conversations={conversations}
          handleReceivedMessage={handleReceivedMessage}
        />
      )}
      <h2>Conversations</h2>
      <ul>{conversations && mapConversations(conversations, handleClick)}</ul>
      <NewConversationForm currentUser={props.currentUser}/>
      {conversations && activeConversation && (
        <MessagesArea
          currentUser={props.currentUser}
          conversation={findActiveConversation(
            conversations,
            activeConversation
          )}
        />
      )}
    </div>
  );
}
