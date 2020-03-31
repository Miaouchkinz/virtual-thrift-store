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
          <span className="span_eclo_logo">
            <Link
              to={{
                pathname: "/feed"
              }}
            >
              <img id="eclo_logo" src="./images/eclo_main_logo.png" />
            </Link>
          </span>
        </div>
        <img
          alt="Top wave decoration."
          className="header_wave_green"
          src="./images/final_project_header_wave_2.png"
        ></img>
      </header>
      <div className="content_container">
        <h1>Click an item to try it on!</h1>
        <div className="clothingItem_cart_carousel">
          {checkIfCartEmpty(cartItemList)}
        </div>
        <div className="ready_to_checkout">
          <Link
            to={{
              pathname: "/checkout"
            }}
          >
            <h3> Ready to checkout </h3>
          </Link>
        </div>
      </div>
      <div className="dressing_room_container">
        <DressingRoom selectedItemForTrying={selectedItemForTrying} />
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
