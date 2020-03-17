import React, { useState } from 'react';
import '../Feed.scss'

export default function Feed({ clothing }) {
  // clothingCategories GOES ABOVE IN PROPS LATER

  const clothingCategories = {
    "01": { name: "T-Shirt", id: 1, active: true },
    "02": { name: "Pants", id: 2, active: true }
  }

  const categoryList = (allCategories) => {
    let categoriesResult = [];
    for (let category in allCategories) {
      categoriesResult.push(
        < label key={[category].id} >
          {allCategories[category].name}
          < input
            name={[category].id}
            type='checkbox'
          // checked={type[category.name]}
          // onChange={() => setType({ ...type, tshirt: !type.pants })}
          />
        </label >
      )
    }
    return categoriesResult;
  };

  //1- Test 01 and 02 for rendering below
  //2- Axios GET all clothing_category
  //3- Render all the list with all active: true
  //4- Filter everything with .filter in clothingList



  const [type, setType] = useState(clothingCategories);

  // const activeList = Object.values(type).filter(current => current.active).map(current => current.id)


  const [size, setSize] = useState({
    "S": false,
    "M": false,
    "L": false
  });

  const clothingList = clothing && clothing.map(clothingItem => (
    <li key={clothingItem.id}>
      <img src={clothingItem.image_url} alt={clothingItem.id}></img >
    </li>
    // .filter(clothingItem => clothingItem.clothing_category_id includes in ActiveList)
  ));

  // const handleSubmitFilters = event => {

  //   setType({
  //     type: event.target.value
  //   });

  //   setSize({
  //     size: event.target.value
  //   });

  //   props.setClothingFilters(type, size)
  // call a function for filtering the state.clothes
  // It must be called from app. Here it's passed a prop

  // in the filtering function in app -> dispatch({type: SET_FILTERS, action: {type: '', size: ''}) // filter
  // add a filter key in the state

  return (
    <div className='Feed'>

      <header>
        <span>Profile</span>
        <span>Dressing Room</span>
      </header>

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
      <div className='availables_grid'>
        <h1>Clothings</h1>
        <ul>{clothingList}</ul>
      </div>
    </div>


  );

};



