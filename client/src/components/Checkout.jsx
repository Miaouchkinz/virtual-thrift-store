import React from "react";
import Icon from "./common/iconButton";
import Button from "./common/textButton";
import { Link } from "react-router-dom";

export default function Checkout({ cart, users }) {
  const listOwnersOfItem = function(cartItems) {
    let owners = [];
    for (let item of cartItems) {
      owners.push(item.userId);
    }
    return [...new Set(owners)];
  };

  const ownerAvatar = function(cartItems, usersList) {
    for (let item of cartItems) {
      for (let user of usersList) {
        if (item.userId === user.id) {
          return (
            <img
              id={user.id}
              className="ownerAvatar_image_of_cart_container"
              src={user.avatar_url}
            />
          );
        }
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
      {ownerAvatar(cart, users)}
    </div>
  ));

  const checkIfCartEmpty = function() {
    let finalResult = null;
    if (listOwnersOfItem(cart).length === 0) {
      finalResult = <h2>Your cart is empty.</h2>;
    } else {
      finalResult = (
        <div className="checkout_footer">
          <Link
            to={{
              pathname: "/confirmation"
            }}
          >
            <Button primary label="CONFIRM ALL" />
          </Link>
        </div>
      );
    }
    return finalResult;
  };
  return (
    <div className="checkout_main_section">
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
              pathname: "/cart"
            }}
          >
            <Icon secondary label="<"></Icon>
          </Link>
        </div>
      </header>
      <h1>Ready to checkout!</h1>
      {displaySectionOfOwners}
      {checkIfCartEmpty()}
    </div>
  );
}
