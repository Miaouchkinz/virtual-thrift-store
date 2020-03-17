import React from 'react';
import './Feed.scss';
import useApplicationData from './hooks/useApplicationData';

function Feed(props) {
  // const { state, dispatch } = useApplicationData();

  // const [setType, type] = useState("");
  // const [setSize, size] = useState("");

  // const clothingList = state.clothings
  //   .filter(cloting => condition filter)
  //   .map(clothing => (
  //     <li>
  //       <img src={clothing.image_url} alt={clothing.id}></img >
  //     </li>
  //   ));

  // const handleSubmit = event => {

  //   // call a function for filtering the state.clothes
  //   // It must be called from app. Here it's passed a prop

  //   // in the filtering function in app -> dispatch({type: SET_FILTERS, action: {type: '', size: ''}) // filter
  //   // add a filter key in the state

  // }

  return (
    <div className='Feed'>

      <div className='filter_availables'>
        Create form here
        Create onSubmit event
        + Local State, control input on the form

        <form>



        </form>

      </div>

      {/* <div className='availables_grid'>
        <h1>Clothings</h1>
        {props.state.loading && <h3>Loading...</h3>}
        <ul>{!props.state.loading && clothingList}</ul>
      </div> */}
    </div>

  );
}

export default Feed;
