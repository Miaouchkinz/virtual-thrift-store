import React from "react";
import Button from "./common/textButton";

export default function Landing({ history }) {
  return (
    <main id="landing">
      <header>
        <img
          className="landing_header_wave_green"
          src="./images/final_project_header_wave_2.png"
        ></img>
      </header>

      <div className="logo-placeholder"></div>
      <h1 className="welcome-message">Welcome to TraderJane's</h1>
      <Button
        onClick={() => history.push("/login")}
        label="LOGIN"
        primary
        fullWidth
      />
      <Button
        onClick={() => history.push("/register")}
        label="SIGN UP"
        secondary
        fullWidth
      />
      <footer>
        <img
          className="landing_footer_wave_green"
          src="./images/final_project_footer_wave_1.png"
        ></img>
      </footer>
    </main>
  );
}
