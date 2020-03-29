import React from "react";
// import { ActionCable } from 'react-actioncable-provider';
import { Link } from "react-router-dom";
import ConvoPreview from './ConvoPreview';
// import Cable from './Cable';


export default function ConversationsList({conversations, currentUser}) {

  // const handleReceivedMessage = response => {
  //   const { message } = response;
  //   const tempConversation = [...conversations]

  //   for(const conversation of tempConversation){
  //     if(conversation.id === message.conversation_id){
  //       conversation.messages.push(message)
  //     }
  //   }
  //   setLocalState(prev => ({ ...prev, conversations: tempConversation }));
  // };

  const mapConversations = (conversations) => {
    const orderedConversations = conversations.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );

    const latestMessageTime = orderedConversations.map( (conversation) => {
      if (conversation.messages.length) {
        const lastMessage = conversation.messages[conversation.messages.length-1]
        return lastMessage.created_at
      }
    });

    return orderedConversations.map((conversation, i) => {
      return (
        <div className="ind-conv-preview-container">
          <li key={conversation.id}>
          <Link to={`/chat?id=${conversation.id}`}>
            <ConvoPreview avatar={conversation.user_2[0].avatar_url} userName={conversation.user_2[0].name} conversation={conversation} latestMessageTime={latestMessageTime[i]}/>
          </Link>

          </li>
        </div>
      );
    });
  };
 

  return (
    <div className="conversationsList">
      {/* <ActionCable
        channel={{ channel: 'ConversationsChannel' }}
        onReceived={handleReceivedConversation}
      /> */}
      {/* {conversations && conversations.length && (
        <Cable
          conversations={conversations}
          handleReceivedMessage={handleReceivedMessage}
        />
      )} */}
      <ul>{conversations && mapConversations(conversations)}</ul>
    </div>
  );
}