import React, { useState } from 'react';
import axios from 'axios';

export default function Registration(props) {

  // TOFIX: NEED TO MOVE TO USEAPPDATA
  const [state, setState] = useState({
    name: "",
    email: "",
    password:"",
    password_confirmation: "",
    registrationErrors: ""
  })

  const handleSubmit = (e) => {
    // TOFIX: NEED TO MOVE TO USEAPPDATA
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
        props.handleSuccessfulAuth(res.data)
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
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name"
          placeholder="Name"
          value={state.name}
          onChange={handleChange}
          required>
        </input>

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

        <input 
          type="password" 
          name="password_confirmation"
          placeholder="Password confirmation"
          value={state.password_confirmation}
          onChange={handleChange}
          required>
        </input>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};