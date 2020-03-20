import React from "react";

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

  return (
    <div>
      <h1>This is Cart</h1>
      <div className="clothingItem_cart_carousel">{cartItemList}</div>
    </div>
  );
}
