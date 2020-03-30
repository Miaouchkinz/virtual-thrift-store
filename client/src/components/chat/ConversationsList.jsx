import React from "react";
import { ActionCable } from 'react-actioncable-provider';
import { Link } from "react-router-dom";
import ConvoPreview from './ConvoPreview';


export default function ConversationsList({conversations, handleReceivedConversation, currentUserId}) {
  const mapConversations = (conversations) => {
    const orderedConversations = conversations.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    return orderedConversations.map((conversation, i) => {
      const correspondentUser = currentUserId === conversation.user_1[0].id ? conversation.user_2[0] : conversation.user_1[0];
      const lastMessage = conversation.messages.length ? conversation.messages[conversation.messages.length-1].text : conversation.title;
      const lastUpdated = conversation.messages.length ? conversation.messages[conversation.messages.length-1].created_at : conversation.created_at;
      
      return (
        <div className="ind-conv-preview-container" key={conversation.id}>
          <li>
          <Link to={`/chat?id=${conversation.id}`}>
            <ConvoPreview avatar={correspondentUser.avatar_url} userName={correspondentUser.name} lastMessagePreview={lastMessage} latestMessageTime={lastUpdated}/>
          </Link>

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
      <ul>{conversations && mapConversations(conversations)}</ul>
    </div>
  );
}
