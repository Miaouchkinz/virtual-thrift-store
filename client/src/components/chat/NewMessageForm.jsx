import React, { useState } from 'react';
// import axios from "axios";
import { API_ROOT, HEADERS } from '../../constants';


export default function NewMessageForm({currentUser, conversation_id}) {
  const [ state, setState] = useState({
    text: '',
    conversation_id: conversation_id,
    user_id: null
  });

  // const componentWillReceiveProps = nextProps => {
  //   setState({ ...state, conversation_id: nextProps.conversation_id });
  // };

  const handleChange = e => {
    setState({ ...state, text: e.target.value, user_id: currentUser.id });
  };

  const handleSubmit = e => {
    e.preventDefault();

    fetch(`${API_ROOT}/messages`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(state)
    });
    setState({ ...state, text: '' });
  };

  return (
    <div className="newMessageForm">
      <form onSubmit={handleSubmit}>
        <label>New Message:</label>
        <br />
        <input
          type="text"
          value={state.text}
          onChange={handleChange}
        />
        <input type="submit" />
      </form>
    </div>
  );
}
