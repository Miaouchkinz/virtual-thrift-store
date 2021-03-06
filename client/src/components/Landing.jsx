import React from "react";
import Button from "./common/textButton";

export default function Landing({ history }) {
  return (
    <div>
      <header>
        <img
          className="landing_header_wave_green"
          src="./images/final_project_header_wave_2.png"
          alt="Top wave decoration."
        ></img>
      </header>
      <main id="landing">
        <div>
          <img src="./images/eclo_main_logo.png" width="250px" />
          <p className="welcome-message">
            A community-focused, online thrift store where you can 
            try on clothes in your virtual dressing room.
          </p>
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
        </div>
      </main>
      <footer>
        <img
          className="landing_footer_wave_green"
          src="./images/final_project_footer_wave_1.png"
          alt="Bottom wave decoration."
        ></img>
      </footer>
    </div>
  );
}
