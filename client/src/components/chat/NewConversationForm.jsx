import React, { useState } from 'react';
// import axios from 'axios'
import { API_ROOT, HEADERS } from '../../constants';

export default function NewConversationForm({currentUser}){
  const [ state, setState] = useState({
    title: '',
    user_1_id: null,
    user_2_id: 2
  });

  const handleChange = e => {
    setState({ ...state, user_1_id: currentUser.id, title: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    fetch(`${API_ROOT}/conversations`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(state)
    }).then(() => setState({ ...state, title: '' }));
  };

  return (
    <div className="newConversationForm">
      <form onSubmit={handleSubmit}>
    <label>New Conversation: {`currentUser is ${currentUser.id}`}</label>
        <br />
        <input
          type="text"
          value={state.title}
          onChange={handleChange}
        />
        <input type="submit" />
      </form>
    </div>
  );

}