import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Feed({
  availableClothing,
  clothingCategories,
  cart,
  addToCart,
  currentUser
}) {
  const [size, setSize] = useState({
    S: false,
    M: false,
    L: false
  });

  const [activeCategories, setActiveCategories] = useState([]);

  const toggleSelected = (e) => {
    e.target.classList.toggle("selected")
  }

  const [addToCartCount, setaddToCartCount] = useState([
    {
      totalCount: 0
    }
  ]);

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

  const iconForCategory = categoryName => {
    let iconFile = null;
    if (categoryName === "tshirt") {
      iconFile = "tshirt_icon.png";
    } else if (categoryName === "sweater") {
      iconFile = "sweater_icon.png";
    } else if (categoryName === "dress") {
      iconFile = "dress_icon.png";
    } else if (categoryName === "shorts") {
      iconFile = "shorts_icon.png";
    } else if (categoryName === "pants") {
      iconFile = "pants_icon.png";
    }
    return iconFile;
  };

  const categoryList = allCategories => {
    let categoriesResult = [];

    for (let category in allCategories) {
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
              <img
                alt="Icon for filtering clothing by types."
                src={
                  "./images/" + iconForCategory(allCategories[category].name)
                }
                width="25px"
              />
            </div>
          </label>
        </div>
      );
    }
    return categoriesResult;
  };

  const addToCartButtonClicked = function(
    clothingId,
    clothingSize,
    clothingCategory,
    clothingUserId,
    clothingImgUrl,
    leftOffset,
    rightOffset,
    topOffset,
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
        clothingImgUrl,
        leftOffset,
        rightOffset,
        topOffset
      );
    }
  };

  const clothingList = availableClothing;

  const clothingFilteredByCategory = availableClothing.filter(clothingItem =>
    Object.values(activeCategories).includes(clothingItem.clothing_category_id)
  );

  const clothingFilteredBySize = availableClothing.filter(
    clothingItem =>
      Object.keys(size).find(sizeKey => size[sizeKey] === true) ===
      clothingItem.size
  );

  const clothingFilteredByAll = availableClothing
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

  const filteredClothingList = function(
    availableClothing,
    activeCategories,
    size
  ) {
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
      <div className="clothing-item" key={clothingItem.id}>
        {/* <header>
          <div className="size">{clothingItem.size}</div>
        </header> */}
        <img
          className="clothing-img"
          src={clothingItem.image_url}
          alt={
            "This is an item of type " +
            clothingItem.clothing_category_id +
            ", size " +
            clothingItem.size
          }
        ></img>
        <footer className="add-to-cart-footer">
          <div
            onClick={(e) => {
              toggleSelected(e);
              addToCartButtonClicked(
                clothingItem.id,
                clothingItem.size,
                clothingItem.clothing_category_id,
                clothingItem.user_id,
                clothingItem.image_url,
                clothingItem.left_offset_percent,
                clothingItem.rigth_offset_percent,
                clothingItem.top_offset_percent,
                addToCart
              )
            }}
          >
            <img
              className="hanger-icon"
              alt="Add item to cart button."
              src="./images/hanger_border_black.png"
            ></img>
            <span>HANG IT UP!</span>
          </div>
        </footer>
      </div>
    ));
  };

  return (
    <div className="Feed">
      <header className="feed_header">
        <div className="feed_header_menu">
          <Link to={{pathname: "/user/profile"}}>
            <div className="profile-nav-block">
              <img className="feed_profile_icon" src={currentUser.avatar_url} alt="user_avatar" />
              <span className="feed-username">{currentUser.name}</span>
            </div>
          </Link>
          <div className="feed-logo-header">
            <button className="home-button" onClick={() => history.push("/feed")}>
              <img src={`/images/eclo_main_logo.png`} alt="Home button"/>
            </button>
          </div>
          <Link to={{pathname: "/cart"}}>
            <div className="feed-cart-nav">
              <span className="cart-quantity">{cart.length}</span>
              <img
                alt="Go to cart to see all items selected button."
                id="feed_hanger_icon"
                className="btn icon-btn"
                src="./images/hanger_border_black.png"
              ></img>
              <span className="dressing-room-copy">Dressing Room</span>
            </div>
          </Link>
        </div>
        <img
          alt="Top wave decoration."
          className="header_wave_green"
          src="./images/final_project_header_wave_2.png"
        ></img>
      </header>
      <div className="filters_available">
        <h2>Community Thrift-Pile</h2>
        <p>Dig through some clothes, hang 'em up, and then try 'em on in the Dressing Room!</p>
        <form className="typeForm">
          <p>Category</p>
          <div>
            {categoryList(clothingCategories)}
          </div>
        </form>

        <form className="sizeForm">
          <p>Size</p>
          <div>
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
                  <img
                    alt="Checkbox for size Small"
                    src="./images/small_size_icon.png"
                    width="25px"
                  ></img>
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
                  <img
                    alt="Checkbox for size Medium"
                    src="./images/medium_size_icon.png"
                    width="25px"
                  ></img>
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
                  <img
                    alt="Checkbox for size Large"
                    src="./images/large_size_icon.png"
                    width="25px"
                  ></img>
                </div>
              </label>
            </div>
          </div>
        </form>
      </div>
      <div className="availables_container">
        <img
          className="orange_footer_wave"
          alt="Wave decoration"
          src="./images/footer_orange_resized.png"
        ></img>
        <div className="availables_grid_container">
          {filteredClothingList(availableClothing, activeCategories, size)}
        </div>
      </div>
      {/* <footer className="orange_footer">
        
      </footer> */}
    </div>
  );
}
