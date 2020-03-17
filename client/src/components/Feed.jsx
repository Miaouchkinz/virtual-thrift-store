import React, { useState } from 'react';
import './Feed.scss';

export default function Feed({ clothing, clothingCategories }) {


  const clothingCategories = {
    "01": { name: "T-Shirt", id: 1, active: true },
    "02": { name: "Pants", id: 2, active: true }
  }

  //1- Test 01 and 02 for rendering below
  //2- Axios GET all clothing_category
  //3- Render all the list with all active: true
  //4- Filter everything with .filter in clothingList

  //     < label key = { 02} >
  //       Pants
  //       < input
  //   name = { CatId }
  //   type = 'checkbox'
  //   checked = { type.pants }
  //   onChange = {() => setType({ ...type, tshirt: !type.pants })
  // }
  // />
  //   </label >

  const [type, setType] = useState(clothingCategories);

  const activeList = Object.values(type).filter(current => current.active).map(current => current.id)


  const [size, setSize] = useState({
    "S": false,
    "M": false,
    "L": false
  });

  const clothingList = clothing
    // .filter(clothingItem => clothingItem.clothing_category_id includes in ActiveList)
    .map(clothingItem => (
      <li key={clothingItem.id}>
        <img src={clothingItem.image_url} alt={clothingItem.id}></img >
      </li>
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
        Create form here
        Create onSubmit event
        + Local State, control input on the form

            <form id="typeForm">
          <p>Type:</p>
          <label>
            T-Shirt
              <input
              name='isShirt'
              type='checkbox'
              checked={type.tshirt}
              onChange={() => setType({ ...type, tshirt: !type.tshirt })}
            />
          </label>
          <label>
            Pants
              <input
              name='isPants'
              type='checkbox'
              checked={type.pants}
              onChange={() => setType({ ...type, tshirt: !type.pants })}
            />
          </label>
        </form>

        <form id="sizeForm">
          <p>Size:</p>
          <label>
            S
              <input
              name='isSmall'
              type='checkbox'
              checked={size.small}
              onChange={() => setType({ ...size, small: !size.small })}
            />
          </label>
          <label>
            M
              <input
              name='isMedium'
              type='checkbox'
              checked={size.medium}
              onChange={() => setType({ ...size, medium: !size.medium })}
            />
          </label>
          <label>
            L
              <input
              name='isLarge'
              type='checkbox'
              checked={size.large}
              onChange={() => setType({ ...size, large: !size.large })}
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



