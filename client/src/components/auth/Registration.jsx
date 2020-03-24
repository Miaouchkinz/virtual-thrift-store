import React, { useState } from "react";
import Button from "../common/textButton";
import Icon from "../common/iconButton";
import axios from "axios";

export default function Registration({ handleSuccessfulAuth, history }) {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    registrationErrors: ""
  });

  const handleSubmit = e => {
    axios
      .post(
        "http://localhost:3001/api/registrations",
        {
          user: {
            name: state.name,
            email: state.email,
            password: state.password,
            password_confirmation: state.password_confirmation
          }
        },
        { withCredentials: true }
      )
      .then(res => {
        if (res.data.status === "created") {
          handleSuccessfulAuth(res.data, history);
        }
      })
      .catch(err => console.log("registration error", err));

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
          <h1>SIGN UP</h1>
          <input
            className="text-input"
            type="text"
            name="name"
            placeholder="Name"
            value={state.name}
            onChange={handleChange}
            required
          ></input>

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

          <input
            className="text-input"
            type="password"
            name="password_confirmation"
            placeholder="Password confirmation"
            value={state.password_confirmation}
            onChange={handleChange}
            required
          ></input>
          <Button
            type="submit"
            onClick={handleSubmit}
            primary
            fullWidth
            label="SIGN UP"
          />
          <Button
            onClick={() => history.push("/login")}
            secondary
            fullWidth
            label="LOGIN"
          />
        </form>
      </main>
      <footer>
        <img
          className="signup_footer_wave_green"
          src="./images/final_project_footer_wave_1.png"
          alt="Bottom wave decoration."
        ></img>
      </footer>
    </div>
  );
}
