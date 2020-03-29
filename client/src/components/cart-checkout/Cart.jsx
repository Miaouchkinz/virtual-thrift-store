import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../common/iconButton";
import DressingRoom from "./DressingRoom";

export default function Cart({ cart, availableClothing, removeFromCart }) {
  const [itemData, setItemData] = useState([
    {
      itemId: null,
      itemUrl: null,
      itemLeft: null,
      itemRight: null,
      itemTop: null
    }
  ]);

  const itemsInCartId = function() {
    let finalIdList = [];
    if (cart) {
      for (let item of cart) {
        finalIdList.push(item.id);
      }
    }

    return finalIdList;
  };

  const cartItemList = availableClothing
    .filter(item => itemsInCartId().includes(item.id))
    .map(clothingItem => (
      <div className="clothingItem_of_cart_container" key={clothingItem.id}>
        <img
          onClick={() =>
            setItemData({
              itemId: clothingItem.id,
              itemUrl: clothingItem.image_url,
              itemLeft: clothingItem.left_offset_percent,
              itemRight: clothingItem.right_offset_percent,
              itemTop: clothingItem.top_offset_percent
            })
          }
          className="clothingItem_image_of_cart_container"
          src={clothingItem.image_url}
          alt={
            "This is an item of type " +
            clothingItem.clothing_category_id +
            ", size " +
            clothingItem.size
          }
          id={clothingItem.size}
        ></img>
        <div>
          <img
            alt="Remove item from cart button."
            onClick={() => removeFromCart(cart, clothingItem.id)}
            src="./images/remove_item_from_cart.png"
            width="40px"
          ></img>
        </div>
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
              pathname: "/feed"
            }}
          >
            <Icon secondary label="<"></Icon>
          </Link>
          <Link
            to={{
              pathname: "/checkout"
            }}
          >
            <span className="feed_header_profile_icon">
              <img
                alt="Go to profile page button."
                id="feed_profile_icon"
                src="./images/checkout_full.png"
              ></img>
            </span>
          </Link>
        </div>
        <img
          alt="Top wave decoration."
          className="header_wave_green"
          src="./images/final_project_header_wave_2.png"
        ></img>
      </header>
      <div className="content_container">
        <h1>
          Selected items
          <span className="total_item_in_cart">{cart.length}</span>
        </h1>
        <div className="clothingItem_cart_carousel">
          {checkIfCartEmpty(cartItemList)}
        </div>
        <div>
          <h1>Future machine learning cool stuff here</h1>
        </div>
      </div>
      <div className="dressing_room_container">
        <DressingRoom itemData={itemData} />
      </div>
      <footer className="orange_footer_cart">
        <img
          className="orange_footer_wave_cart"
          alt="Wave decoration"
          src="./images/footer_orange_resized.png"
        ></img>
      </footer>
    </div>
  );
}
