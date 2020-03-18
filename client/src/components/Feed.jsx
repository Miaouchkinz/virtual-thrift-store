import React, { useState } from 'react';



export default function Feed({ clothing, clothingCategories }) {

  //3- Render all the list with all active: true
  //4- Filter everything with .filter in clothingList

  console.log(clothingCategories)


  const [type, setType] = useState(clothingCategories);

  const categoryList = (allCategories) => {
    let categoriesResult = [];

    for (let category in allCategories) {
      // SET ALL CATEGORIES TO FALSE WHEN NOT CHECKED YET
      allCategories[category].active = false;

      categoriesResult.push(
        < label key={allCategories[category].id} >
          {allCategories[category].name}
          < input
            name={allCategories[category].id}
            type='checkbox'
            checked={type.name}
            onChange={() => setType({ ...type, active: !type.active })}
          />
        </label >
      )
    }
    return categoriesResult;
  };

  console.log('TYPE', type)
  const activeList = Object.keys(type).filter(current => current.active).map(current => current.id)


  const [size, setSize] = useState({
    "S": false,
    "M": false,
    "L": false
  });

  const clothingList = clothing && clothing
    // .filter(clothingItem => clothingItem.clothing_category_id === activeList)
    .map(clothingItem => (
      <div className='item_of_grid_container' key={clothingItem.id}>
        <img src={clothingItem.image_url} alt={clothingItem.id}></img >
      </div>
    ));

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
            // checked={size.small}
            // onChange={() => setType({ ...size, small: !size.small })}
            />
          </label>
          <label>
            M
              <input
              name='isMedium'
              type='checkbox'
            // checked={size.medium}
            // onChange={() => setType({ ...size, medium: !size.medium })}
            />
          </label>
          <label>
            L
              <input
              name='isLarge'
              type='checkbox'
            // checked={size.large}
            // onChange={() => setType({ ...size, large: !size.large })}
            />
          </label>
        </form>
      </div>
      <div className='availables_grid_container'>
        <h1>Clothings</h1>
        {clothingList}
      </div>
    </div>


  );

};



