import React from "react";
import { Link } from "react-router-dom";
import Icon from "./common/iconButton";

export default function OrderConfirmation({ cart, users }) {
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
      <img className="owner_avatar" src={owner.avatar_url} />
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
            <Icon secondary icon=""></Icon>
          </Link>
          <Link
            to={{
              pathname: "/feed"
            }}
          >
            <Icon secondary label="Home"></Icon>
          </Link>
        </div>
      </header>
      <div className="thank_you_message">
        <img className="earth_icon" src="./images/earth.png" />
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
  );
}
