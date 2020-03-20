import { useEffect, useReducer } from "react";
import dataReducer, {
  SET_USERS,
  SET_AVAILABLE_CLOTHING,
  SET_CLOTHING_CATEGORIES,
  SET_CURRENT_USER,
  SET_CART
} from "../reducers/dataReducer";
import axios from "axios";

const useApplicationData = () => {
  const [state, dispatch] = useReducer(dataReducer, {
    users: [],
    clothing: [],
    clothingCategories: [],
    loading: true,
    currentUser: {},
    loggedInStatus: "NOT_LOGGED_IN",
    cart: []
  });

  const handleLogout = () => {
    dispatch({
      type: SET_CURRENT_USER,
      value: {
        currentUser: {},
        loggedInStatus: "NOT_LOGGED_IN"
      }
    });
  };

  const handleLogin = data => {
    dispatch({
      type: SET_CURRENT_USER,
      value: {
        currentUser: data.user,
        loggedInStatus: "LOGGED_IN"
      }
    });
  };

  const handleSuccessfulAuth = (data, history) => {
    handleLogin(data);
    history.push("/feed");
  };

  const setCart = (id, size, categoryId) => {
    dispatch({
      ...state,
      type: SET_CART,
      value: { id, size, categoryId }
    });
  };

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3001/api/users"),
      axios.get("http://localhost:3001/logged_in", { withCredentials: true }),
      axios.get("http://localhost:3001/api/clothings"),
      axios.get("http://localhost:3001/api/clothing_categories")
    ])
      .then(all => {
        // Handle list of all users
        dispatch({ type: SET_USERS, users: all[0].data });

        // Handle Login status & current user
        if (all[1].data.logged_in && state.loggedInStatus === "NOT_LOGGED_IN") {
          dispatch({
            type: SET_CURRENT_USER,
            value: {
              currentUser: all[1].data.user,
              loggedInStatus: "LOGGED_IN"
            }
          });
        } else if (
          !all[1].data.logged_in &&
          state.loggedInStatus === "LOGGED_IN"
        ) {
          dispatch({
            type: SET_CURRENT_USER,
            value: {
              currentUser: {},
              loggedInStatus: "NOT_LOGGED_IN"
            }
          });
        }

        // Handles all clothings that are available for exchange
        dispatch({ type: SET_AVAILABLE_CLOTHING, clothing: all[2].data });
        // Handles clothing category types
        dispatch({
          type: SET_CLOTHING_CATEGORIES,
          clothingCategories: all[3].data
        });
      })
      .catch(err => console.log(err));
  }, []);

  return {
    state,
    handleLogout,
    handleSuccessfulAuth,
    setCart
  };
};

export default useApplicationData;
