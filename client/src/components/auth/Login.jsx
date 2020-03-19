import React, { useState } from 'react';
import Button from '../common/button'
import axios from 'axios';

export default function Login({ history, handleSuccessfulAuth }) {

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
        handleSuccessfulAuth(res.data, history)
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
    <main id="auth">
      <form onSubmit={handleSubmit}>
        <h1>LOGIN</h1>
        <input
          className="text-input"
          type="email" 
          name="email"
          placeholder="Email Address"
          value={state.email}
          onChange={handleChange}
          required>
        </input>

        <input 
          className="text-input"
          type="password" 
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
          required>
        </input>

        <Button type="submit" onClick={handleSubmit} primary fullWidth label="LOGIN"/>
        <Button onClick={() => history.push('/register')} secondary fullWidth label="SIGN UP"/>
      </form>
    </main>
  );
};