import { useEffect, useReducer } from "react";
import dataReducer, {
  SET_USERS,
  SET_AVAILABLE_CLOTHING,
  SET_CLOTHING_CATEGORIES,
  SET_CURRENT_USER
} from "../reducers/dataReducer";
import axios from "axios";

const useApplicationData = () => {
  const [state, dispatch] = useReducer(dataReducer, {
    users: [],
    clothing: [],
    clothingCategories: [],
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

  const handleSuccessfulAuth = (data, history) => {
    handleLogin(data);
    history.push('/dashboard')
  }

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

  //______________________________
  // GET AVAILABLE CLOTHINGS DATA|
  //_____________________________|

  useEffect(() => {
    axios({
      method: "GET",
      url: "/api/clothings"
    })
      .then(({ data }) => {
        dispatch({ type: SET_AVAILABLE_CLOTHING, clothing: data });
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    axios({
      method: "GET",
      url: "/api/clothing_categories"
    })
      .then(({ data }) => {
        console.log(data);
        dispatch({ type: SET_CLOTHING_CATEGORIES, clothingCategories: data });
      })
      .catch(err => console.log(err));
  }, []);

  return {
    state,
    handleLogout,
    handleSuccessfulAuth
  };
};

export default useApplicationData;
