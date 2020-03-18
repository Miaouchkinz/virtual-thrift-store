import { useEffect, useReducer } from 'react';
import dataReducer, { SET_USERS, SET_AVAILABLE_CLOTHING, SET_CLOTHING_CATEGORIES } from '../reducers/dataReducer';
import axios from 'axios';


const useApplicationData = () => {
  const [state, dispatch] = useReducer(dataReducer, {
    users: [],
    clothing: [],
    clothingCategories: [],
    loading: true
  });

  //_______________
  // GET USERS DATA|
  //_______________|

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/users',
    })
      .then(({ data }) => {
        dispatch({ type: SET_USERS, users: data });
      })
      .catch(err => console.log(err));
  }, []);

  //______________________________
  // GET AVAILABLE CLOTHINGS DATA|
  //_____________________________|

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/clothings',
    })
      .then(({ data }) => {
        dispatch({ type: SET_AVAILABLE_CLOTHING, clothing: data });
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/clothing_categories',
    })
      .then(({ data }) => {
        console.log(data);
        dispatch({ type: SET_CLOTHING_CATEGORIES, clothingCategories: data });
      })
      .catch(err => console.log(err));
  }, []);

  return {
    state,
    dispatch,
  };
};

export default useApplicationData;

// /api/clothing_category