import React from 'react';
import Button from './common/button';

export default function Landing({ history }) {

  return (
    <main id="landing">
      <div className="logo-placeholder"></div>
      <h1 className="welcome-message">Welcome to TraderJane's</h1>
      <Button onClick={() => history.push('/login')} label="LOGIN" primary fullWidth />
      <Button onClick={() => history.push('/register')} label="SIGN UP" secondary fullWidth />
    </main>
  );
};
