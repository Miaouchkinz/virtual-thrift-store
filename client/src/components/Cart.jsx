import React from "react";
import { Link } from "react-router-dom";

export default function Cart({ cart, clothing }) {
  const itemInCartId = function() {
    let finalIdList = [];
    for (let item of cart) {
      finalIdList.push(item.id);
    }
    return finalIdList;
  };

  const cartItemList = clothing
    .filter(item => itemInCartId().includes(item.id))
    .map(clothingItem => (
      <div className="clothingItem_of_cart_container" key={clothingItem.id}>
        <img
          className="clothingItem_image_of_cart_container"
          src={clothingItem.image_url}
          alt={clothingItem.clothing_category_id}
          id={clothingItem.size}
        ></img>
        <footer></footer>
      </div>
    ));

  const checkIfCartEmpty = function(cartItemList) {
    let result = null;
    if (cart.length === 0) {
      result = <h2>Your cart is empty.</h2>;
    } else {
      result = cartItemList;
    }
    return result;
  };

  return (
    <div>
      <header className="feed_header">
        <div className="feed_header_block">
          <Link
            to={{
              pathname: "/user/profile"
            }}
          >
            <span className="feed_header_profile_icon">
              <img
                id="feed_profile_icon"
                src="./images/feed_profile_logo.png"
              ></img>
            </span>
          </Link>
          <Link
            to={{
              pathname: "/feed"
            }}
          >
            <span className="feed_header_hanger_icon">
              Acts like back button
            </span>
          </Link>
        </div>
      </header>
      <h1>
        Selected items <span className="total_item_in_cart">{cart.length}</span>
      </h1>
      <div className="clothingItem_cart_carousel">
        {checkIfCartEmpty(cartItemList)}
      </div>
      <div>
        <h1>Future machine learning cool stuff here</h1>
      </div>
      <footer>
        <Link
          to={{
            pathname: "/checkout"
          }}
        >
          Go to Checkout >>
        </Link>
      </footer>
    </div>
  );
}
