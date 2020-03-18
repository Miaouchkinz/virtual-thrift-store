import React from 'react';
import Registration from './auth/Registration';
import Login from './auth/Login';

export default function Home(props) {
  const { loggedInStatus, history, handleLogin } = props
  
  const handleSuccessfulAuth = (data) => {
    handleLogin(data);
    history.push('/dashboard')
  }

  return (
    <div>
      <h1>Home</h1>
      <h2>Status: {loggedInStatus}</h2>
      <Registration handleSuccessfulAuth={handleSuccessfulAuth}/>
      <Login handleSuccessfulAuth={handleSuccessfulAuth}/>
    </div>
  );
};