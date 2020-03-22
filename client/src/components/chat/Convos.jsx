import React, { useState, useEffect } from "react";
import axios from "axios";

import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from '../constants';

import NewConversationForm from './NewConversationForm';
import MessagesArea from './MessagesArea';
import Cable from './Cable';

export default function Convos(props) {
  const [ state, setState ] = useState({
    conversations: [],
    activeConversation: null
  });

  // helpers

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

  //=========

  useEffect( () => {
    axios.get(`${API_ROOT}/conversations`)
    .then(res => res.json())
    .then(conversations => setState({conversations}))
    .catch(err => console.log('err fetching conversations', err));
  }, []);

  const handleClick = id => {
    setState({ activeConversation: id });
  };

  const handleReceivedConversation = response => {
    const { conversation } = response;

    setState({
      conversations: [...state.conversations, conversation]
    });
  };

  const handleReceivedMessage = response => {
    const { message } = response;
    const conversations = [...state.conversations];

    const conversation = conversations.find(
      conversation => conversation.id === message.conversation_id
    );

    conversation.messages = [...conversation.messages, message];

    setState({ conversations });
  };

  return (
    <div className="conversationsList">
      <ActionCable
        channel={{ channel: 'ConversationsChannel' }}
        onReceived={handleReceivedConversation}
      />

    {state.conversations.length ? (
      <Cable
        conversations={conversations}
        handleReceivedMessage={handleReceivedMessage}
      />
    ) : null}
    <h2>Conversations</h2>
    <ul>{mapConversations(conversations, handleClick)}</ul>
    <NewConversationForm />
    {activeConversation ? (
      <MessagesArea
        conversation={findActiveConversation(
          conversations,
          activeConversation
        )}
      />
    ) : null}
  </div>
  )
}