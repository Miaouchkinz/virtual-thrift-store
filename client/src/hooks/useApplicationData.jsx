import { useEffect, useReducer } from "react";
import dataReducer, {
  SET_USERS,
  SET_CURRENT_USER,
  SET_ALL_CLOTHING,
  SET_AVAILABLE_CLOTHING,
  SET_CLOTHING_CATEGORIES,
  ADD_TO_CART,
  EMPTY_CART,
  REMOVE_FROM_CART,
  SET_USER_CONVERSATIONS,
  ADD_NEW_CONVERSATION,
  ADD_MSG_TO_CONVERSATION
} from "../reducers/dataReducer";
import axios from "axios";
import { API_ROOT, HEADERS } from '../constants';

const useApplicationData = () => {
  const [state, dispatch] = useReducer(dataReducer, {
    users: [],
    availableClothing: [],
    allClothing: [],
    clothingCategories: [],
    loading: true,
    currentUser: {},
    loggedInStatus: "NOT_LOGGED_IN",
    convesations: [],
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

  useEffect(() => {
    if (state.currentUser.id) {
      fetch(`${API_ROOT}/conversations/${state.currentUser.id}`)
        .then(res => res.json())
        .then(conversations => {
          dispatch({
            type: SET_USER_CONVERSATIONS,
            conversations
          })
        })
        .catch(error => console.log(error))
      };
  }, [state.currentUser]);

  const addNewConversation = (user_2_id) => {
    fetch(`${API_ROOT}/conversations`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        title: `${state.currentUser.name} is interested in some items you have to offer. Please let them know if you are still open for an exchange! :)`,
        user_1_id: state.currentUser.id,
        user_2_id
      })
    }).catch(error => console.log(error));
  }

  const addNewMessageToConversation = ({text, conversation_id, user_id}) => {
    fetch(`${API_ROOT}/messages`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        text,
        conversation_id,
        user_id
      })
    }).catch(error => console.log(error));
  }

  const handleReceivedMessage = res => {
    dispatch({
      type: ADD_MSG_TO_CONVERSATION,
      message: res
    });
  }

  const handleReceivedConversation = res => {
    dispatch({
      type: ADD_NEW_CONVERSATION,
      conversation: res
    })
  }

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
        // Gets all clothing categories
        dispatch({
          type: SET_CLOTHING_CATEGORIES,
          clothingCategories: all[2].data
        });
        // Gets all clothes
        dispatch({
          type: SET_ALL_CLOTHING,
          allClothing: all[3].data
        });
        // Gets all clothes that are set to available_for_exchange
        dispatch({ type: SET_AVAILABLE_CLOTHING, availableClothing: all[4].data });
      })
      .catch(err => console.log(err));
  }, []);

  return {
    state,
    handleLogout,
    handleSuccessfulAuth,
    addToCart,
    emptyCart,
    removeFromCart,
    addNewConversation,
    addNewMessageToConversation,
    handleReceivedMessage,
    handleReceivedConversation
  };
};

export default useApplicationData;
