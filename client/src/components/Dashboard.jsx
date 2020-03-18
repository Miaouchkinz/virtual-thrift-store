import React from 'react';

export default function Dashboard({ loggedInStatus }) {

  return (
    <div>
      <div>
        <h1>Dashboard</h1>
        <h2>Status: {loggedInStatus}</h2>
      </div>
    </div>
  );
};