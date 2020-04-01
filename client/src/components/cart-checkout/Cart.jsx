import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../common/iconButton";
import DressingRoom from "./DressingRoom";

export default function Cart({ cart, availableClothing, removeFromCart }) {
  const [selectedItemForTrying, setSelectedItemForTrying] = useState([
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
        <div>
          <img
            className="delete_item_button"
            alt="Remove item from cart button."
            onClick={() => removeFromCart(cart, clothingItem.id)}
            src="./images/remove_item_from_cart.png"
            width="30px"
          ></img>
        </div>
        <img
          onClick={() =>
            setSelectedItemForTrying({
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
      </div>
    ));

  const checkIfCartEmpty = function(cartItemList) {
    let result = null;
    if (cart.length === 0) {
      result = <h4>There's nothing hung up in your dressing room.</h4>;
    } else {
      result = cartItemList;
    }
    return result;
  };

  return (
    <div>
      <header className="cart_header">
        <div className="cart_header_block">
          <Link
            to={{
              pathname: "/feed"
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
      <div className="content_container">
        <h2>Your Dressing Room</h2>
        <p>Click on one of your finds below to try it on!</p>
        <div className="clothingItem_cart_carousel">
          {checkIfCartEmpty(cartItemList)}
        </div>
        <div className="ready_to_checkout">
          <span>Find something that fits?</span>
          <div>
            <Link
              to={{
                pathname: "/checkout"
              }}
            >
              <button class="btn primary">Request Trades</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="dressing_room_container">
        <DressingRoom selectedItemForTrying={selectedItemForTrying} />
      </div>
    </div>
  );
}
