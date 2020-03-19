import React, { useState } from 'react';


export default function Feed({ clothing, clothingCategories }) {

  const [size, setSize] = useState({
    "S": false,
    "M": false,
    "L": false
  });

  const [activeCategories, setActiveCategories] = useState(clothingCategories);

  console.log(activeCategories)
  console.log(size)

  const checkBoxDeMARDE = (category, allCategories) => {
    const activeCategoryName = allCategories[category].name
    if (activeCategories[activeCategoryName]) {
      const updatedActiveCategories = { ...activeCategories }
      delete updatedActiveCategories[activeCategoryName]
      setActiveCategories(updatedActiveCategories)
    } else {
      setActiveCategories({
        ...activeCategories,
        [allCategories[category].name]: allCategories[category].id
      });
    }
  }
  const categoryList = (allCategories) => {
    let categoriesResult = [];

    for (let category in allCategories) {
      categoriesResult.push(
        < label key={allCategories[category].id} >
          {allCategories[category].name}
          < input
            name={allCategories[category].id}
            type='checkbox'
            checked={activeCategories[name]}
            onChange={() => checkBoxDeMARDE(category, allCategories)}
          />
        </label >
      )
    }
    return categoriesResult;
  };

  const clothingList = clothing && clothing

  const clothingFilteredByCategory = clothing
    .filter(clothingItem => Object.values(activeCategories).includes(clothingItem.clothing_category_id));

  const clothingFilteredBySize = clothing
    .filter(clothingItem => Object.keys(size).find(sizeKey => size[sizeKey] === true) === clothingItem.size);


  const filteredClothingList = function (clothing, activeCategories, size) {
    let finalFilteredClothingList = null;
    if (Object.entries(activeCategories).length === 0 && !Object.values(size).includes(true)) {
      finalFilteredClothingList = clothingList;
    } else if (Object.entries(activeCategories).length > 0) {
      finalFilteredClothingList = clothingFilteredByCategory
    } else if (Object.values(size).includes(true)) {
      finalFilteredClothingList = clothingFilteredBySize
    }
    return finalFilteredClothingList
      .map(clothingItem => (
        <div className='item_of_grid_container' key={clothingItem.id}>
          <img src={clothingItem.image_url} alt={clothingItem.clothing_category_id} id={clothingItem.size}></img >
        </div>
      ));
  };


  return (
    <div className='Feed'>
      <div className='filter_availables'>
        <form id="typeForm">
          <p>Type:</p>
          {categoryList(clothingCategories)}
        </form>

        <form id="sizeForm">
          <p>Size:</p>
          <label>
            S
              <input
              name='isSmall'
              type='checkbox'
              checked={size['S']}
              onChange={() => setSize({ ...size, 'S': !size['S'] })}
            />
          </label>
          <label>
            M
              <input
              name='isMedium'
              type='checkbox'
              checked={size['M']}
              onChange={() => setSize({ ...size, 'M': !size['M'] })}
            />
          </label>
          <label>
            L
              <input
              name='isLarge'
              type='checkbox'
              checked={size['L']}
              onChange={() => setSize({ ...size, 'L': !size['L'] })}
            />
          </label>
        </form>
      </div>
      <div className='availables_grid_container'>
        <h1>Clothings</h1>
        {filteredClothingList(clothing, activeCategories, size)}
      </div>
    </div>


  );

};



