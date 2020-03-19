import React, { useState } from "react";

export default function Feed({ clothing, clothingCategories }) {
  const [size, setSize] = useState({
    S: false,
    M: false,
    L: false
  });

  const [activeCategories, setActiveCategories] = useState(clothingCategories);

  console.log(activeCategories);
  console.log(size);

  const checkBoxDeMARDE = (category, allCategories) => {
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
            onChange={() => checkBoxDeMARDE(category, allCategories)}
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
      <div className="item_of_grid_container" key={clothingItem.id}>
        <img
          src={clothingItem.image_url}
          alt={clothingItem.clothing_category_id}
          id={clothingItem.size}
        ></img>
      </div>
    ));
  };

  return (
    <div className="Feed">
      <div className="filter_availables">
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
