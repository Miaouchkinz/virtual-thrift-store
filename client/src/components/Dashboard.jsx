import React from 'react';
import axios from 'axios';

export default function Dashboard({ loggedInStatus, handleLogout, history }) {

  const handleLogoutClick = () => {
    axios.delete('http://localhost:3001/logout', {
      withCredentials: true
    })
    .then(res => handleLogout())
    .catch(err => console.log("logout err", err));
  }

  return (
    <div>
      <div>
        <h1>Dashboard</h1>
        <h2>Status: {loggedInStatus}</h2>
        <button onClick={() => handleLogoutClick()}>Logout</button>
        <button onClick={() => history.push('/user/profile')}>Profile</button>
      </div>
    </div>
  );
};