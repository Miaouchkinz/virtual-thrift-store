import React from "react";
import Icon from "./common/iconButton";
import { Link } from "react-router-dom";

export default function Checkout({ cart, clothing }) {
  // ARRAY OF ALL OWNERS (USER_IC) FROM CART STATE
  const ownersOfItem = function(cartItems) {
    let owners = [];
    for (let item of cartItems) {
      owners.push(item.userId);
    }
    return [...new Set(owners)];
  };

  const divideClothingItemByOwner = function(cartItems, owner) {
    for (let item of cartItems) {
      if (!item.userId === owner) {
      } else if (item.userId === owner) {
        return (
          <div>
            {" "}
            ITEMS OF OWNER {item.id}{" "}
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
  };

  const ownersSection = function() {
    return ownersOfItem(cart).map(owner => (
      <div key={owner}>
        OWNER {owner} ---{divideClothingItemByOwner(cart, owner)}
      </div>
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
              pathname: "/cart"
            }}
          >
            <Icon secondary label="<"></Icon>
          </Link>
        </div>
      </header>
      <h1>This is Checkout</h1>
      <div className="checkout_owner_section">{ownersSection()}</div>
      <footer>
        <button></button>
      </footer>
    </div>
  );
}
