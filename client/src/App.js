import React from 'react';
import logo from './logo.svg';
import './App.scss';
import useApplicationData from './hooks/useApplicationData';

function App() {
  const { state, dispatch } = useApplicationData();

  const userList = state.users.map(user => (
    <li key={user.email}>
      {user.name} {user.email} {user.image_url}
    </li>
  ));

  return (
    <div className='App'>
      <h1>Users</h1>

      {state.loading && <h3>Loading...</h3>}

      <ul>{!state.loading && userList}</ul>
    </div>
  );
}

export default App;
