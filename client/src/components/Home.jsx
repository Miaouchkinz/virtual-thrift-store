import React from 'react';
import Registration from './auth/Registration';
import Login from './auth/Login';
import axios from 'axios';

export default function Home(props) {
  const { 
    loggedInStatus,
    history,
    handleLogin,
    handleLogout
  } = props
  
  const handleSuccessfulAuth = (data) => {
    handleLogin(data);
    history.push('/dashboard')
  }

  const handleLogoutClick = () => {
    axios.delete('http://localhost:3001/logout', {
      withCredentials: true
    })
    .then(res => handleLogout())
    .catch(err => console.log("logout err", err));
  }

  return (
    <div>
      <h1>Home</h1>
      <h2>Status: {loggedInStatus}</h2>
      <Registration handleSuccessfulAuth={handleSuccessfulAuth}/>
      <Login handleSuccessfulAuth={handleSuccessfulAuth}/>
      <button onClick={() => handleLogoutClick()}>Logout</button>
    </div>
  );
};