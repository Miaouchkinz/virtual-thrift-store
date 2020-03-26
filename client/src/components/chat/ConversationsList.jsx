import React, {useEffect, useState} from "react";
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from '../../constants';

import NewConversationForm from './NewConversationForm';
import MessagesArea from './MessageArea';
import ConvoPreview from './ConvoPreview';
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
    // TOFIX: order by newest message sent instead or by convPreview timestamp?
    const orderedConversations = conversations.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );

    const latestMessageTime = orderedConversations.map( (conversation) => {
      if (conversation.messages.length) {
        const lastMessage = conversation.messages[conversation.messages.length-1]
        console.log(lastMessage.created_at)
        return lastMessage.created_at
      }
    });

    return orderedConversations.map((conversation, i) => {
      return (
        <div className="ind-conv-preview-container">
          <li key={conversation.id} onClick={() => handleClick(conversation.id)}>
            <ConvoPreview avatar={conversation.user_2[0].avatar_url} userName={conversation.user_2[0].name} conversation={conversation} latestMessageTime={latestMessageTime[i]}/>
          </li>
        </div>
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
