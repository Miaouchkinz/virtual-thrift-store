import React from "react";
import { ActionCable } from 'react-actioncable-provider';
import { Link } from "react-router-dom";
import ConvoPreview from './ConvoPreview';


export default function ConversationsList({conversations, handleReceivedConversation, currentUserId}) {

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
      const correspondentUser = currentUserId === conversation.user_1[0].id ? conversation.user_2[0] : conversation.user_1[0];
      return (
        <div className="ind-conv-preview-container" key={conversation.id}>
          <li>
          <Link to={`/chat?id=${conversation.id}`}>
            <ConvoPreview avatar={correspondentUser.avatar_url} userName={correspondentUser.name} conversation={conversation} latestMessageTime={latestMessageTime[i]}/>
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
