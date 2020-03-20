import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Feed({ clothing, clothingCategories, cart, setCart }) {
  const [size, setSize] = useState({
    S: false,
    M: false,
    L: false
  });

  const [activeCategories, setActiveCategories] = useState([]);

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

  const categoryList = allCategories => {
    let categoriesResult = [];

    for (let category in allCategories) {
      categoriesResult.push(
        <label key={allCategories[category].id}>
          {allCategories[category].name}
          <input
            name={allCategories[category].id}
            type="checkbox"
            checked={activeCategories[name]}
            onChange={() => ifCheckBoxActive(category, allCategories)}
          />
        </label>
      );
    }
    return categoriesResult;
  };

  const clothingList = clothing && clothing;

  const clothingFilteredByCategory = clothing.filter(clothingItem =>
    Object.values(activeCategories).includes(clothingItem.clothing_category_id)
  );

  const clothingFilteredBySize = clothing.filter(
    clothingItem =>
      Object.keys(size).find(sizeKey => size[sizeKey] === true) ===
      clothingItem.size
  );

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

  const addToCartButtonChecked = function() {
    let buttonIsCalledOnce = false;

    if (buttonIsCalledOnce === false) {
      buttonIsCalledOnce = true;
    } else {
    }
    return buttonIsCalledOnce;
  };

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
        <img
          width="100%"
          src={clothingItem.image_url}
          alt={clothingItem.clothing_category_id}
          id={clothingItem.size}
        ></img>
        <footer>
          <button
            className="add_to_cart_button"
            onClick={() =>
              addToCartButtonChecked(
                setCart(
                  clothingItem.id,
                  clothingItem.size,
                  clothingItem.clothing_category_id
                )
              )
            }
          >
            Add to cart
          </button>
        </footer>
      </div>
    ));
  };

  return (
    <div className="Feed">
      <header className="feed_header">
        <div className="feed_header_block">
          <span className="feed_header_profile_icon">
            <img
              id="feed_profile_icon"
              src="./images/feed_profile_logo.png"
            ></img>
          </span>
          <Link
            to={{
              pathname: "/cart"
            }}
          >
            <span className="feed_header_hanger_icon">
              <img
                id="feed_hanger_icon"
                src="./images/feed_hanger_logo.png"
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
          <label>
            S
            <input
              name="isSmall"
              type="checkbox"
              checked={size["S"]}
              onChange={() => setSize({ ...size, S: !size["S"] })}
            />
          </label>
          <label>
            M
            <input
              name="isMedium"
              type="checkbox"
              checked={size["M"]}
              onChange={() => setSize({ ...size, M: !size["M"] })}
            />
          </label>
          <label>
            L
            <input
              name="isLarge"
              type="checkbox"
              checked={size["L"]}
              onChange={() => setSize({ ...size, L: !size["L"] })}
            />
          </label>
        </form>
      </div>
      <div className="availables_grid_container">
        {filteredClothingList(clothing, activeCategories, size)}
      </div>
    </div>
  );
}
