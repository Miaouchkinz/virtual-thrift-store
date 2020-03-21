import React from "react";
import { Link } from "react-router-dom";
import Icon from "./common/iconButton";

export default function OrderConfirmation(props) {
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
        <img src="./images/earth.png" />
        <h1>
          Together, we're <br /> saving the <br /> planet.
        </h1>
      </div>
    </div>
  );
}
