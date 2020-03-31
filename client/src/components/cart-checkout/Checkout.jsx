import React from "react";
import Icon from "../common/iconButton";
import Button from "../common/textButton";
import { Link } from "react-router-dom";

export default function Checkout({ cart, users, addNewConversation }) {
  const listOwnersOfItem = function(cartItems) {
    let owners = [];
    for (let item of cartItems) {
      owners.push(item.userId);
    }
    return [...new Set(owners)];
  };

  const ownerAvatar = function(users, owner) {
    for (let user of users) {
      if (user.id === owner) {
        return (
          <div className="owner_avatar_container">
            <img
              alt="Owner of owner avatar."
              key={user.id}
              id={user.id}
              className="ownerAvatar_image_of_cart_container"
              src={user.avatar_url}
            />
            <p>{user.name}</p>
          </div>
        );
      }
    }
  };

  const listItemsForEachOwner = function(cartItems, owner) {
    let resultItemsOfOwner = null;
    for (let item of cartItems) {
      if (item.userId === owner) {
        resultItemsOfOwner = cartItems
          .filter(item => item.userId === owner)
          .map(item => (
            <img
              alt={"This is an item id " + item.id + ", size " + item.size}
              id={item.userId}
              key={item.id}
              className="clothingItem_image_of_cart_container"
              src={item.imgUrl}
            />
          ));
      }
    }
    return resultItemsOfOwner;
  };

  const displaySectionOfOwners = listOwnersOfItem(cart).map(owner => (
    <div key={owner} className="single_owner_section">
      <div className="items_of_owner_section">
        {listItemsForEachOwner(cart, owner)}
      </div>
      {ownerAvatar(users, owner)}
    </div>
  ));

  const sendAutomatedMessages = () => {
    let ownerIds = listOwnersOfItem(cart);

    ownerIds.forEach(user => addNewConversation(user));
  };

  const checkIfCartEmpty = function() {
    let finalResult = null;
    let ownerIds = listOwnersOfItem(cart);
    if (ownerIds.length === 0) {
      finalResult = <h2>Your cart is empty.</h2>;
    } else {
      finalResult = (
        <div className="checkout_footer">
          <Link
            to={{
              pathname: "/confirmation"
            }}
          >
            <Button
              onClick={() => sendAutomatedMessages()}
              primary
              label="CONFIRM ALL"
            />
          </Link>
        </div>
      );
    }
    return finalResult;
  };
  return (
    <div className="checkout_main_section">
      <header className="checkout_header">
        <div className="checkout_header_block">
          <Link
            to={{
              pathname: "/cart"
            }}
          >
            <Icon secondary label="<"></Icon>
          </Link>
          <span className="span_eclo_logo">
            <Link
              to={{
                pathname: "/feed"
              }}
            >
              <img id="eclo_logo" src="./images/eclo_main_logo.png" />
            </Link>
          </span>
          <div></div>
        </div>
        <img
          alt="Top wave decoration."
          className="header_wave_green"
          src="./images/final_project_header_wave_2.png"
        ></img>
      </header>
      <div className="content_checkout_container">
        <h1>Ready to checkout?</h1>
        {displaySectionOfOwners}
        {checkIfCartEmpty()}
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
