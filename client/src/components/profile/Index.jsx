import React, { useState } from "react";
import axios from "axios";
import Button from "../common/textButton";
import Icon from "../common/iconButton";
import Closet from "./Closet";
import ConversationsList from "../chat/ConversationsList";

export default function Profile(props) {
  const {
    history,
    userName,
    avatar,
    handleLogout,
    currentUserId,
    allClothing,
    conversations,
    handleReceivedConversation
  } = props;

  // tabs: closet, convos, camera
  const [tab, setTab] = useState("convos");

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
      <nav>
        <div className="wave-spacer">
          <img
            className="profile-wave"
            src="/images/final_project_header_wave_1.png"
            alt="Top wave decoration."
          ></img>
        </div>
        <div className="profile-menu">
          <button className="home-button" onClick={() => history.push("/feed")}>
            <img src={`/images/eclo_main_logo.png`} alt="Home button"/>
          </button>
          <Button onClick={() => handleLogoutClick()} primary small label="LOG OUT" />
        </div>
      </nav>
      <header>
        <img className="avatar_url-image" src={avatar} alt="user_avatar" />
        <span className="user-name">{userName}'s Profile</span>
        <div id="profile-toggle-menu">
          <div id="closet-profile-toggle">
            <Icon
              primary
              large
              onClick={() => setTab("closet")}
              selected={tab === "closet"}
              icon="hanger"
            ></Icon>
            <span>Closet</span>
          </div>
          <div id="convos-profile-toggle">
            <Icon
              primary
              large
              onClick={() => setTab("convos")}
              selected={tab === "convos"}
              icon="convos"
              label="chat"
            ></Icon>
            <span>Chat</span>
          </div>
          <div id="camera-profile-toggle">
            <Icon
              primary
              large
              onClick={() => setTab("camera")}
              selected={tab === "camera"}
              icon="camera"
            ></Icon>
            <span>Camera</span>
          </div>
        </div>
      </header>
      <main>
        <div className="profile-feed-placeholder">
          {tab === "convos" && conversations && <ConversationsList conversations={conversations} handleReceivedConversation={handleReceivedConversation} currentUserId={currentUserId}/>}
          {tab === "closet" && allClothing && 
            <Closet
            currentUserId={currentUserId}
            allClothing={allClothing}
            userName={userName}
            ></Closet>}
        </div>
      </main>
    </div>
  );
}
