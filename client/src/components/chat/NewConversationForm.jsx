import React, { useState } from 'react';
// import axios from 'axios'
import { API_ROOT, HEADERS } from '../../constants';

export default function NewConversationForm(){
  const [ state, setState] = useState({
    title: ''
  });

  const handleChange = e => {
    setState({ title: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    fetch(`${API_ROOT}/conversations`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(state)
    }).then(() => setState({ title: '' }));
  };

  return (
    <div className="newConversationForm">
      <form onSubmit={handleSubmit}>
        <label>New Conversation:</label>
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