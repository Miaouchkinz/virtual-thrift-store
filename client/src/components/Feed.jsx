import React, { useState } from "react";
import Icon from "./common/iconButton";
import { Link } from "react-router-dom";

export default function Feed({ clothing, clothingCategories, cart, setCart }) {
  //////////////////////////////////////////////
  //_____________
  // LOCAL STATES|
  // ____________|

  //SIZE
  const [size, setSize] = useState({
    S: false,
    M: false,
    L: false
  });

  //CATEGORIES
  const [activeCategories, setActiveCategories] = useState([]);

  //ITEM ADDED TO CART COUNT
  const [addToCartCount, setaddToCartCount] = useState([
    {
      totalCount: 0
    }
  ]);

  //////////////////////////////////////////////

  // Check state of categories that has been checked or unchecked in the filter form
  const ifCheckBoxActive = (category, allCategories) => {
    const activeCategoryName = allCategories[category].name;
    if (activeCategories[activeCategoryName]) {
      const updatedActiveCategories = { ...activeCategories };
      delete updatedActiveCategories[activeCategoryName];
      setActiveCategories(updatedActiveCategories);
    } else {
      setActiveCategories({
        ...activeCategories,
        [allCategories[category].name]: allCategories[category].id
      });
    }
  };

  // Creates array of labels for each category from the allCategories object
  const categoryList = allCategories => {
    let categoriesResult = [];

    for (let category in allCategories) {
      categoriesResult.push(
        <div className="label_container">
          <label key={allCategories[category].id}>
            <input
              name={allCategories[category].id}
              type="checkbox"
              checked={activeCategories[name]}
              onChange={() => ifCheckBoxActive(category, allCategories)}
            />
            {allCategories[category].name}
          </label>
        </div>
      );
    }
    return categoriesResult;
  };

  // Function that keeps state of if add-to-cart button has been clicked, and set Cart's global state
  // if button has never been clicked before.
  const addToCartButtonClicked = function(
    clothingId,
    clothingSize,
    clothingCategory,
    clothingUserId,
    clothingImgUrl,
    addItemToCart
  ) {
    if (
      addToCartCount[0].totalCount === 0 &&
      !addToCartCount.some(key => key[clothingId] === clothingId)
    ) {
      setaddToCartCount([
        ...addToCartCount,
        { totalCount: 1, [clothingId]: clothingId }
      ]);
      addItemToCart(
        clothingId,
        clothingSize,
        clothingCategory,
        clothingUserId,
        clothingImgUrl
      );
    }
  };
  ///////////////////////////////////////////////// ///////////////////////////
  // Variable that holds all clothing (where available = true) from backend
  const clothingList = clothing && clothing;

  // Variable that holds clothingList filtered by category
  const clothingFilteredByCategory = clothing.filter(clothingItem =>
    Object.values(activeCategories).includes(clothingItem.clothing_category_id)
  );

  // Variable that holds clothingList filtered by size
  const clothingFilteredBySize = clothing.filter(
    clothingItem =>
      Object.keys(size).find(sizeKey => size[sizeKey] === true) ===
      clothingItem.size
  );

  // Variable that holds clothingList filtered by category AND size
  const clothingFilteredByAll = clothing
    .filter(
      clothingItem =>
        Object.keys(size).find(sizeKey => size[sizeKey] === true) ===
        clothingItem.size
    )
    .filter(clothingItem =>
      Object.values(activeCategories).includes(
        clothingItem.clothing_category_id
      )
    );
  ///////////////////////////////////////////////// ///////////////////////////

  // Function that filters clothingList depending on variables above, and returns
  // filtered clothingList as output.
  const filteredClothingList = function(clothing, activeCategories, size) {
    let finalFilteredClothingList = null;
    let contentOfStateCategory = Object.entries(activeCategories).length;
    let contentOfSizeTrue = Object.values(size).includes(true);

    if (contentOfStateCategory === 0 && !contentOfSizeTrue) {
      finalFilteredClothingList = clothingList;
    } else if (contentOfStateCategory > 0 && contentOfSizeTrue) {
      finalFilteredClothingList = clothingFilteredByAll;
    } else if (contentOfStateCategory > 0 || contentOfSizeTrue) {
      if (contentOfStateCategory > 0) {
        finalFilteredClothingList = clothingFilteredByCategory;
      } else {
        finalFilteredClothingList = clothingFilteredBySize;
      }
    }
    return finalFilteredClothingList.map(clothingItem => (
      <div className="clothingItem_of_grid_container" key={clothingItem.id}>
        <header className="clothingItem_size">{clothingItem.size}</header>
        <img
          className="clothingItem_image_of_grid_container"
          src={clothingItem.image_url}
          alt={clothingItem.clothing_category_id}
          id={clothingItem.size}
        ></img>
        <footer>
          <div
            className="add_to_cart_button"
            onClick={() =>
              addToCartButtonClicked(
                clothingItem.id,
                clothingItem.size,
                clothingItem.clothing_category_id,
                clothingItem.user_id,
                clothingItem.image_url,
                setCart
              )
            }
          >
            <img
              id="add_to_cart_button"
              src="./images/add_hanger_icon_full.png"
            ></img>
          </div>
        </footer>
      </div>
    ));
  };

  return (
    <div className="Feed">
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
                src="./images/profile_icon_full.png"
              ></img>
            </span>
          </Link>
          <Link
            to={{
              pathname: "/cart"
            }}
          >
            <span className="feed_header_hanger_icon">
              <img
                id="feed_hanger_icon"
                src="./images/hanger_icon_full.png"
              ></img>
              {cart.length}
            </span>
          </Link>
        </div>
      </header>
      <div className="filters_available">
        <h3>Filter by:</h3>
        <form className="typeForm">
          <p>Category</p>
          {categoryList(clothingCategories)}
        </form>

        <form className="sizeForm">
          <p>Size</p>
          <div className="label_container">
            <label>
              <input
                name="isSmall"
                type="checkbox"
                checked={size["S"]}
                onChange={() => setSize({ ...size, S: !size["S"] })}
              />
              S
            </label>
          </div>
          <div className="label_container">
            <label>
              <input
                name="isMedium"
                type="checkbox"
                checked={size["M"]}
                onChange={() => setSize({ ...size, M: !size["M"] })}
              />
              M
            </label>
          </div>
          <div className="label_container">
            <label>
              <input
                name="isLarge"
                type="checkbox"
                checked={size["L"]}
                onChange={() => setSize({ ...size, L: !size["L"] })}
              />
              L
            </label>
          </div>
        </form>
      </div>
      <div className="availables_grid_container">
        {filteredClothingList(clothing, activeCategories, size)}
      </div>
    </div>
  );
}
