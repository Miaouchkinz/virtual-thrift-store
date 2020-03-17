import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import useApplicationData from './hooks/useApplicationData';


function IndexPage(props) {

  useApplicationData()

  console.log("Inside IndexPage")
  const userList = props.state.users.map(user => (
    <li key={user.email}>
      {user.name} {user.email} {user.image_url}
    </li>
  ));

  return (
    <div className='App'>
      <h1>Users</h1>

      {props.state.loading && <h3>Loading...</h3>}

      <ul>{!props.state.loading && userList}</ul>
    </div>
  );
};


export default IndexPage;

ReactDOM.render(<App />, document.getElementById('root'));