import React from 'react';
import './Feed.scss';
import useApplicationData from './hooks/useApplicationData';

function Feed() {
  const { state, dispatch } = useApplicationData();

  const clothingList = state.users.map(user => (
    <li key={clothing.size}>
      {clothing.size}
      <img src={clothing.image_url} alt="Italian Trulli"></img>
    </li>
  ));

  return (
    <div className='App'>
      <h1>Clothings</h1>

      {state.loading && <h3>Loading...</h3>}

      <ul>{!state.loading && clothingList}</ul>
    </div>
  );
}

export default Feed;
