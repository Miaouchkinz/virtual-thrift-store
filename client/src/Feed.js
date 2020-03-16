import React from 'react';
import './Feed.scss';
import useApplicationData from './hooks/useApplicationData';

function Feed() {
  const { state, dispatch } = useApplicationData();

  const clothingList = state.users.map(clothing => (
    <li key={clothing.image_url}>
      {clothing.image_url}
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
