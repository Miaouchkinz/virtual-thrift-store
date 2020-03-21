import React from "react";
import Icon from "./common/iconButton";
import Button from "./common/textButton";
import { Link } from "react-router-dom";

export default function Checkout({ cart }) {
  // ARRAY OF ALL OWNERS FROM CART STATE
  const ownersOfItem = function(cartItems) {
    let owners = [];
    for (let item of cartItems) {
      owners.push(item.userId);
    }
    return [...new Set(owners)];
  };

  const divideClothingItemByOwner = function(cartItems, owner) {
    console.log(cartItems);
    let finalResult = null;
    for (let item of cartItems) {
      if (item.userId === owner) {
        finalResult = (
          <div>
            {" "}
            ITEMS OF OWNER {item.userId}{" "}
            <img
              className="clothingItem_image_of_cart_container"
              src={item.imgUrl}
              alt={item.clothing_category_id}
              id={item.size}
            ></img>
          </div>
        );
      }
    }
    return finalResult;
  };

  const ownersSection = function() {
    let ownersSectionDisplay = null;
    if (ownersOfItem(cart).length === 0) {
      ownersSectionDisplay = <h2>Your cart is empty.</h2>;
    } else {
      ownersSectionDisplay = ownersOfItem(cart).map(owner => (
        <div key={owner} className="single_owner_section">
          {divideClothingItemByOwner(cart, owner)} --- OWNER {owner}
        </div>
      ));
    }
    return ownersSectionDisplay;
  };

  const showConfirmAllButton = function() {
    if (ownersOfItem(cart).length === 0) {
    } else {
      return (
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
      <div className="checkout_owners_section">{ownersSection()}</div>
      {showConfirmAllButton()}
    </div>
  );
}
