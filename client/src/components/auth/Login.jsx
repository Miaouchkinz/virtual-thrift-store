import React, { useState } from "react";
import Button from "../common/textButton";
import Icon from "../common/iconButton";
import axios from "axios";

export default function Login({ history, handleSuccessfulAuth }) {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    LoginErrors: ""
  });

  const handleSubmit = e => {
    axios
      .post(
        "http://localhost:3001/sessions",
        {
          user: {
            email: state.email,
            password: state.password
          }
        },
        { withCredentials: true }
      )
      .then(res => {
        if (res.data.logged_in) {
          handleSuccessfulAuth(res.data, history);
        }
      })
      .catch(err => console.log("login error", err));

    e.preventDefault();
  };

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <header>
        <nav className="login-signup-nav">
          <Icon secondary onClick={() => history.push("/")} label="<"></Icon>
        </nav>
        <img
          className="login_header_wave_green"
          src="./images/final_project_header_wave_2.png"
          alt="Top wave decoration."
        ></img>
      </header>
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
            required
          ></input>

          <input
            className="text-input"
            type="password"
            name="password"
            placeholder="Password"
            value={state.password}
            onChange={handleChange}
            required
          ></input>

          <Button
            type="submit"
            onClick={handleSubmit}
            primary
            fullWidth
            label="LOGIN"
          />
          <Button
            onClick={() => history.push("/register")}
            secondary
            fullWidth
            label="SIGN UP"
          />
        </form>
      </main>
      <footer>
        <img
          className="login_footer_wave_green"
          src="./images/final_project_footer_wave_1.png"
          alt="Bottom wave decoration."
        ></img>
      </footer>
    </div>
  );
}
