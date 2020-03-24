import React, { useState } from "react";
import Button from "./common/textButton";
import Icon from "./common/iconButton";
import Closet from "./Closet";
import axios from "axios";

export default function Profile(props) {
  const {
    history,
    userName,
    avatar,
    handleLogout,
    userId,
    allClothing
  } = props;

  // tabs: closet, convos, camera
  const [tab, setTab] = useState("closet");

  const handleLogoutClick = () => {
    axios
      .delete("http://localhost:3001/logout", {
        withCredentials: true
      })
      .then(res => {
        handleLogout();
        history.push("/");
      })
      .catch(err => console.log("logout err", err));
  };

  return (
    <div id="profile-page">
      <div id="wave">{/* <div id="inner-wave"></div> */}</div>
      <nav>
        <Icon secondary onClick={() => history.push("/feed")} label="<"></Icon>
        <Button onClick={() => handleLogoutClick()} primary label="LOG OUT" />
      </nav>
      <img
        src="./images/final_project_header_wave_1.png"
        alt="Top wave decoration."
      ></img>
      <header>
        <img className="avatar_url-image" src={avatar} alt="user_avatar" />
        <span className="user-name">{userName}</span>
        <div>
          <Icon
            primary
            large
            onClick={() => setTab("closet")}
            selected={tab === "closet"}
            icon="hanger"
          ></Icon>
          <Icon
            primary
            large
            onClick={() => setTab("convos")}
            selected={tab === "convos"}
            icon="convos"
          ></Icon>
          <Icon
            primary
            large
            onClick={() => setTab("camera")}
            selected={tab === "camera"}
            icon="camera"
          ></Icon>
        </div>
      </header>
      <main>
        {" "}
        <div className="profile-feed-placeholder">
          <Closet
            userId={userId}
            allClothing={allClothing}
            userName={userName}
          ></Closet>
        </div>
      </main>
    </div>
  );
}
