import React, { useState } from 'react';
import axios from 'axios';

export default function Login(props) {

  const [state, setState] = useState({
    name: "",
    email: "",
    password:"",
    LoginErrors: ""
  })

  const handleSubmit = (e) => {
    axios.post("http://localhost:3001/sessions", {
      user: {
        email: state.email,
        password: state.password,
      }
    },
      { withCredentials: true }
    ).then(res => {
      if(res.data.logged_in) {
        props.handleSuccessfulAuth(res.data)
      }
    })
     .catch(err => console.log("login error", err));

    e.preventDefault();
  }

  const handleChange = (e) => {
    setState({...state, 
      [e.target.name]: e.target.value
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          name="email"
          placeholder="Email Address"
          value={state.email}
          onChange={handleChange}
          required>
        </input>

        <input 
          type="password" 
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
          required>
        </input>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};