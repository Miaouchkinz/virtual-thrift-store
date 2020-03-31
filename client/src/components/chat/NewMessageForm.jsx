import React, { useState } from 'react';


export default function NewMessageForm({currentUser_id, conversation_id, addNewMessageToConversation}) {
  const [ state, setState] = useState({
    text: '',
    conversation_id: conversation_id,
    user_id: null
  });

  const handleChange = e => {
    setState({ ...state, text: e.target.value, user_id: currentUser_id });
  };

  const handleSubmit = e => {
    e.preventDefault();

    addNewMessageToConversation(state)
    setState({ ...state, text: '' });
  };

  return (
    <div className="newMessageForm">
      <form onSubmit={handleSubmit}>
        <input
          className="message-textfield"
          placeholder="Enter new message"
          type="text"
          value={state.text}
          onChange={handleChange}
        />
        <button className="submit-message" type="submit" value="Submit">
          <span>Send</span>
          <i className="fas fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
}
