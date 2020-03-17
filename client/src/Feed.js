import React from 'react';
import './Feed.scss';
import useApplicationData from './hooks/useApplicationData';



function Feed(props) {

  const submitForms = function () {
    console.log('yo')
    document.getElementById("typeForm").submit();
    document.getElementById("sizeForm").submit();
  }

  const [setType, type] = useState("");
  const [setSize, size] = useState("");

  const clothingList = props.state.clothings
    // .filter(cloting => condition filter)
    .map(clothing => (
      <li key={clothing.id}>
        <img src={clothing.image_url} alt={clothing.id}></img >
      </li>
    ));

  const handleSubmitFilters = event => {

    setType({
      type: event.target.value
    });

    setSize({
      size: event.target.value
    });

    props.setClothingFilters(type, size)
    // call a function for filtering the state.clothes
    // It must be called from app. Here it's passed a prop

    // in the filtering function in app -> dispatch({type: SET_FILTERS, action: {type: '', size: ''}) // filter
    // add a filter key in the state

  };

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
            // checked={props.state.isShirt}
            // onChange={handleSubmitFilters}
            />
          </label>
          <label>
            Pants
            <input
              name='isPants'
              type='checkbox'
            // checked={props.state.isShirt}
            // onChange={handleSubmitFilters}
            />
          </label>
        </form>

        <form id="sizeForm">
          <p>Size:</p>
          <label>
            S
            <input
              name='isLarge'
              type='checkbox'
            // checked={props.state.isShirt}
            // onChange={handleSubmitFilters}
            />
          </label>
          <label>
            M
            <input
              name='isMedium'
              type='checkbox'
            // checked={props.state.isShirt}
            // onChange={handleSubmitFilters}
            />
          </label>
          <label>
            L
            <input
              name='isLarge'
              type='checkbox'
            // checked={props.state.isShirt}
            // onChange={handleSubmitFilters}
            />
          </label>
          <input type="submit" value="Filter please!" onClick={submitForms} />
        </form>


      </div>

      <div className='availables_grid'>
        <h1>Clothings</h1>
        {props.state.loading && <h3>Loading...</h3>}
        <ul>{!props.state.loading && clothingList}</ul>
      </div>
    </div>

  );
}

export default Feed;
