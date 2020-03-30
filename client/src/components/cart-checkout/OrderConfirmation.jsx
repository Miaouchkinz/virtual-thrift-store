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
              src="./images/profile_avatar_full.png"
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
              alt="Home page link"
              id="feed_profile_icon"
              src="./images/home_full.png"
            ></img>
          </Link>
        </div>
        <img
          alt="Top wave decoration."
          className="header_wave_green"
          src="./images/final_project_header_wave_2.png"
        ></img>
      </header>
      <div className="confirmation-modal">
        <div className="thank_you_message">
          <img
            alt="Earth Icon"
            className="earth_icon"
            src="./images/earth.png"
          />
          <h4>
            A message was sent <br />
            out to each other member.
          </h4>
          <h1>
            Together, we're <br /> saving the <br /> planet.
          </h1>
        </div>
        <div className="owner_avatar_carousel">{createOwnersList()}</div>
      </div>
      <footer className="orange_footer_cart">
        <img
          className="orange-footer-wave-cart"
          alt="Wave decoration"
          src="./images/footer_orange_resized.png"
        ></img>
      </footer>
    </div>
  );
}
