import React, { useState } from "react";
import Header from "../components/Header";

export default function Feed({ clothing, clothingCategories }) {
  const [cart, setCart] = useState({
    totalItem: 0
  });
  const [size, setSize] = useState({
    S: false,
    M: false,
    L: false
  });

  const [activeCategories, setActiveCategories] = useState(clothingCategories);

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
          src={clothingItem.image_url}
          alt={clothingItem.clothing_category_id}
          id={clothingItem.size}
        ></img>
        <footer>
          <button
            onClick={() =>
              setCart({
                ...cart,
                totalItem: cart.totalItem + 1,
                [clothingItem.id]: clothingItem.size
              })
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
      <header>
        <span>
          <img src="../images/hanger_logo.png"></img>
          {cart.totalItem}
        </span>
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
        <h1>Clothings</h1>
        {filteredClothingList(clothing, activeCategories, size)}
      </div>
    </div>
  );
}
