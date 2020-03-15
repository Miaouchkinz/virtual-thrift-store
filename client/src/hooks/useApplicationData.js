import { useEffect, useReducer } from 'react';
import dataReducer, { SET_USERS, SET_CLOTHINGS } from '../reducers/dataReducer';
import axios from 'axios';

const useApplicationData = () => {
  const [state, dispatch] = useReducer(dataReducer, {
    users: [],
    clothings: [],
    loading: true,
  });

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/users',
    })
      .then(({ data }) => {
        console.log(data);
        dispatch({ type: SET_USERS, users: data });
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/clothings',
    })
      .then(({ data }) => {
        console.log(data);
        dispatch({ type: SET_CLOTHINGS, clothings: data });
      })
      .catch(err => console.log(err));
  }, [clothings]);

  return {
    state,
    dispatch,
  };
};

export default useApplicationData;