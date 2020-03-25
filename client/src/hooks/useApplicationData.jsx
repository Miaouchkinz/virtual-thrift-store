import { useEffect, useReducer } from "react";
import dataReducer, {
  SET_USERS,
  SET_AVAILABLE_CLOTHING,
  SET_CLOTHING_CATEGORIES,
  SET_CURRENT_USER,
  ADD_TO_CART,
  SET_CLOTHING,
  EMPTY_CART,
  REMOVE_FROM_CART
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

  const addToCart = (id, size, categoryId, userId, imgUrl) => {
    dispatch({
      ...state,
      type: ADD_TO_CART,
      value: { id, size, categoryId, userId, imgUrl }
    });
  };

  const emptyCart = () => {
    dispatch({
      type: EMPTY_CART
    });
  };

  const removeFromCart = (cart, itemId) => {
    cart = cart.filter(item => item.id !== itemId);
    console.log(cart);
    dispatch({
      ...state,
      type: REMOVE_FROM_CART,
      value: { cart }
    });
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/users"),
      axios.get("/logged_in", { withCredentials: true }),
      axios.get("/api/clothing_categories"),
      axios.get("/api/clothings"),
      axios.get("/api/clothings/available_for_exchange")
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

        dispatch({
          type: SET_CLOTHING_CATEGORIES,
          clothingCategories: all[2].data
        });
        dispatch({
          type: SET_CLOTHING,
          allClothing: all[3].data
        });
        dispatch({ type: SET_AVAILABLE_CLOTHING, clothing: all[4].data });
      })
      .catch(err => console.log(err));
  }, []);

  return {
    state,
    handleLogout,
    handleSuccessfulAuth,
    addToCart,
    emptyCart,
    removeFromCart
  };
};

export default useApplicationData;
