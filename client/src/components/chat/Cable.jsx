import React, { Fragment } from 'react';
import { ActionCable } from 'react-actioncable-provider';

export default function Cable({ conversations, handleReceivedMessage }) {
  return (
    <Fragment>
      {conversations.map(conversation => {
        return (
          <ActionCable
            //conversation id will be used in MessagesChannel to select a convo from the model
            // and instantiate a connection for that conversation
            key={conversation.id}  
            channel={{ channel: 'MessagesChannel', conversation: conversation.id }}
            onReceived={handleReceivedMessage}
          />
        );
      })}
    </Fragment>
  );
};