import { useEffect, useReducer } from 'react';
import dataReducer, { SET_USERS, SET_CURRENT_USER } from '../reducers/dataReducer';
import axios from 'axios';

const useApplicationData = () => {
  const [state, dispatch] = useReducer(dataReducer, {
    users: [],
    loading: true,
    currentUser: {},
    loggedInStatus: "NOT_LOGGED_IN"
  });

  const handleLogout = () => {
    dispatch({
      type: SET_CURRENT_USER,
      value: { 
        currentUser:{},
        loggedInStatus: "NOT_LOGGED_IN"
      }});
  };

  const handleLogin = (data) => {
    dispatch({
      type: SET_CURRENT_USER,
      value: { 
        currentUser: data.user,
        loggedInStatus: "LOGGED_IN"
      }});
  };

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:3001/api/users'),
      axios.get('http://localhost:3001/logged_in', { withCredentials: true })
    ])
    .then((all) => {
      dispatch({ type: SET_USERS, users: all[0].data });

      // Handle Login status & current user
      if(all[1].data.logged_in && state.loggedInStatus === "NOT_LOGGED_IN") {
        dispatch({
          type: SET_CURRENT_USER,
          value: { 
            currentUser: all[1].data.user,
            loggedInStatus: "LOGGED_IN"
          }});
      } else if (!all[1].data.logged_in && state.loggedInStatus === "LOGGED_IN") {
        dispatch({
          type: SET_CURRENT_USER,
          value: { 
            currentUser:{},
            loggedInStatus: "NOT_LOGGED_IN"
          }});
      }
    })
    .catch(err => console.log(err));
  }, []);

  return {
    state,
    handleLogout,
    handleLogin
  };
};

export default useApplicationData;