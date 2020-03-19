import React, { useState } from 'react';
import Button from '../common/button'
import axios from 'axios';

export default function Registration({ handleSuccessfulAuth, history }) {

  const [state, setState] = useState({
    name: "",
    email: "",
    password:"",
    password_confirmation: "",
    registrationErrors: ""
  })

  const handleSubmit = (e) => {
    axios.post("http://localhost:3001/api/registrations", {
      user: {
        name: state.name,
        email: state.email,
        password: state.password,
        password_confirmation: state.password_confirmation
      }
    },
      { withCredentials: true }
    ).then(res => {
      if(res.data.status === "created") {
        handleSuccessfulAuth(res.data, history)
      }
    })
     .catch(err => console.log("registration error", err));

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
        <h1>SIGN UP</h1>
        <input 
          className="text-input"
          type="text" 
          name="name"
          placeholder="Name"
          value={state.name}
          onChange={handleChange}
          required>
        </input>

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

        <input 
          className="text-input"
          type="password" 
          name="password_confirmation"
          placeholder="Password confirmation"
          value={state.password_confirmation}
          onChange={handleChange}
          required>
        </input>
        <Button type="submit" onClick={handleSubmit} primary fullWidth label="SIGN UP"/>
        <Button onClick={() => history.push('/login')} secondary fullWidth label="LOGIN"/>
      </form>
    </main>
  );
};