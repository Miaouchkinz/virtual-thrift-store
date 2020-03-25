import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Feed({
  clothing,
  clothingCategories,
  cart,
  addToCart
}) {
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
      if (allCategories[category].name === "tshirt") {
        categoriesResult.push(
          <div className="label_container" key={allCategories[category].id}>
            <label key={allCategories[category].type}>
              <input
                className="hidden_checkbox"
                key={allCategories[category].id}
                name={allCategories[category].id}
                type="checkbox"
                checked={activeCategories[name]}
                onChange={() => ifCheckBoxActive(category, allCategories)}
              />
              <div className="size_icon">
                <img src="./images/tshirt_icon.png" width="25px"></img>
              </div>
            </label>
          </div>
        );
      } else if (allCategories[category].name === "sweater") {
        categoriesResult.push(
          <div className="label_container" key={allCategories[category].id}>
            <label key={allCategories[category].type}>
              <input
                className="hidden_checkbox"
                key={allCategories[category].id}
                name={allCategories[category].id}
                type="checkbox"
                checked={activeCategories[name]}
                onChange={() => ifCheckBoxActive(category, allCategories)}
              />
              <div className="size_icon">
                <img src="./images/sweater_icon.png" width="25px"></img>
              </div>
            </label>
          </div>
        );
      } else if (allCategories[category].name === "dress") {
        categoriesResult.push(
          <div className="label_container" key={allCategories[category].id}>
            <label key={allCategories[category].type}>
              <input
                className="hidden_checkbox"
                key={allCategories[category].id}
                name={allCategories[category].id}
                type="checkbox"
                checked={activeCategories[name]}
                onChange={() => ifCheckBoxActive(category, allCategories)}
              />
              <div className="size_icon">
                <img src="./images/dress_icon.png" width="25px"></img>
              </div>
            </label>
          </div>
        );
      } else if (allCategories[category].name === "shorts") {
        categoriesResult.push(
          <div className="label_container" key={allCategories[category].id}>
            <label key={allCategories[category].type}>
              <input
                className="hidden_checkbox"
                key={allCategories[category].id}
                name={allCategories[category].id}
                type="checkbox"
                checked={activeCategories[name]}
                onChange={() => ifCheckBoxActive(category, allCategories)}
              />
              <div className="size_icon">
                <img src="./images/shorts_icon.png" width="25px"></img>
              </div>
            </label>
          </div>
        );
      } else if (allCategories[category].name === "pants") {
        categoriesResult.push(
          <div className="label_container" key={allCategories[category].id}>
            <label key={allCategories[category].type}>
              <input
                className="hidden_checkbox"
                key={allCategories[category].id}
                name={allCategories[category].id}
                type="checkbox"
                checked={activeCategories[name]}
                onChange={() => ifCheckBoxActive(category, allCategories)}
              />
              <div className="size_icon">
                <img src="./images/pants_icon.png" width="25px"></img>
              </div>
            </label>
          </div>
        );
      }
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
    addToCart
  ) {
    if (
      addToCartCount[0].totalCount === 0 &&
      !addToCartCount.some(key => key[clothingId] === clothingId)
    ) {
      setaddToCartCount([
        ...addToCartCount,
        { totalCount: 1, [clothingId]: clothingId }
      ]);
      addToCart(
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
        <header>
          <div className="clothingItem_size">{clothingItem.size}</div>
        </header>
        <img
          className="clothingItem_image_of_grid_container"
          src={clothingItem.image_url}
          alt={
            "This is an item of type " +
            clothingItem.clothing_category_id +
            ", size " +
            clothingItem.size
          }
          id={clothingItem.size}
        ></img>
        <footer>
          <div
            onClick={() =>
              addToCartButtonClicked(
                clothingItem.id,
                clothingItem.size,
                clothingItem.clothing_category_id,
                clothingItem.user_id,
                clothingItem.image_url,
                addToCart
              )
            }
          >
            <img
              alt="Add item to cart button."
              id="add_to_cart_button"
              src="./images/hanger_border_black.png"
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
                alt="Go to profile page button"
                id="feed_profile_icon"
                src="./images/profile_avatar_full.png"
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
                alt="Go to cart to see all items selected button."
                id="feed_hanger_icon"
                src="./images/hanger_full.png"
              ></img>
              {cart.length}
            </span>
          </Link>
        </div>
        <img
          className="header_wave_green"
          src="./images/final_project_header_wave_2.png"
        ></img>
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
                className="hidden_checkbox"
                name="isSmall"
                type="checkbox"
                checked={size["S"]}
                onChange={() => setSize({ ...size, S: !size["S"] })}
              />
              <div className="size_icon">
                <img src="./images/small_size_icon.png" width="25px"></img>
              </div>
            </label>
          </div>
          <div className="label_container">
            <label>
              <input
                className="hidden_checkbox"
                name="isMedium"
                type="checkbox"
                checked={size["M"]}
                onChange={() => setSize({ ...size, M: !size["M"] })}
              />
              <div className="size_icon">
                <img src="./images/medium_size_icon.png" width="25px"></img>
              </div>
            </label>
          </div>
          <div className="label_container">
            <label>
              <input
                id="toggle"
                className="hidden_checkbox"
                name="isLarge"
                type="checkbox"
                checked={size["L"]}
                onChange={() => setSize({ ...size, L: !size["L"] })}
              />
              <div className="size_icon">
                <img src="./images/large_size_icon.png" width="25px"></img>
              </div>
            </label>
          </div>
        </form>
      </div>
      <div className="availables_grid_container">
        {filteredClothingList(clothing, activeCategories, size)}
      </div>
      <footer className="orange_footer">
        <img
          className="orange_footer_wave"
          alt="Wave decoration"
          src="./images/footer_orange_resized.png"
        ></img>
      </footer>
    </div>
  );
}
