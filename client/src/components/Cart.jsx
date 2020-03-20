import React from "react";
import Feed from "./Feed";

export default function Cart({ cart, clothing }) {
  console.log(cart);

  const itemInCartId = function() {
    let finalIdList = [];
    for (let item of cart) {
      finalIdList.push(item.id);
    }
    return finalIdList;
  };
  console.log("HERE", itemInCartId());

  const cartItemList = clothing
    .filter(item => itemInCartId().includes(item.id))
    .map(clothingItem => (
      <div className="clothingItem_of_grid_container" key={clothingItem.id}>
        <img
          src={clothingItem.image_url}
          alt={clothingItem.clothing_category_id}
          id={clothingItem.size}
        ></img>
        <footer></footer>
      </div>
    ));

  console.log("CART ITEM:", cartItemList);

  return (
    <div>
      <h1>This is Cart</h1>
      <div>{cartItemList}</div>
    </div>
  );
}
