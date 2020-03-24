import React from "react";
import { Link } from "react-router-dom";

export default function OrderConfirmation({ cart, users, emptyCart }) {
  const createOwnersList = function() {
    let ownersList = [];
    for (let user of users) {
      for (let item of cart) {
        if (user.id === item.userId) {
          ownersList.push(user);
        }
      }
    }
    return ownersList.map(owner => (
      <img
        key={owner.avatar_url}
        alt={"Owner of item avatar. Owner's name: " + owner.name}
        className="owner_avatar"
        src={owner.avatar_url}
      />
    ));
  };

  return (
    <div>
      <header>
        <div className="feed_header_block">
          <Link
            to={{
              pathname: "/user/profile"
            }}
          >
            <img
              alt="Go to profile page button."
              id="feed_profile_icon"
              src="./images/avatar_full_shadow.png"
            ></img>
          </Link>
          <Link
            onClick={() => {
              emptyCart();
            }}
            to={{
              pathname: "/feed"
            }}
          >
            <img
              alt="Go to Home page button."
              id="feed_profile_icon"
              src="./images/full_home_shadow.png"
            ></img>
          </Link>
        </div>
        <img
          className="header_wave_green"
          src="./images/final_project_header_wave_2.png"
        ></img>
      </header>
      <div className="content_container">
        <div className="thank_you_message">
          <img
            alt="Earth Icon"
            className="earth_icon"
            src="./images/earth.png"
          />
          <h4>
            A message have successfully <br />
            been sent to each owners.
          </h4>
          <h1>
            Together, we're <br /> saving the <br /> planet.
          </h1>
        </div>
        <div className="owner_avatar_carousel">{createOwnersList()}</div>
      </div>
    </div>
  );
}
