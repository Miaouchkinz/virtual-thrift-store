export const SET_USERS = "SET_USERS";
export const SET_AVAILABLE_CLOTHING = "SET_AVAILABLE_CLOTHING";
export const SET_CLOTHING_CATEGORIES = "SET_CLOTHING_CATEGORIES";
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const ADD_TO_CART = "ADD_TO_CART";
export const SET_CLOTHING = "SET_CLOTHING";
export const EMPTY_CART = "EMPTY_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

const dataReducer = (state, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.users,
        loading: false
      };
    case SET_CLOTHING:
      return {
        ...state,
        allClothing: action.allClothing,
        loading: false
      };
    case SET_AVAILABLE_CLOTHING:
      return {
        ...state,
        clothing: action.clothing,
        loading: false
      };
    case SET_CLOTHING_CATEGORIES:
      return {
        ...state,
        clothingCategories: action.clothingCategories,
        loading: false
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.value.currentUser,
        loggedInStatus: action.value.loggedInStatus
      };
    case ADD_TO_CART:
      return {
        ...state,
        cart: [
          ...state.cart,
          {
            id: action.value.id,
            size: action.value.size,
            categoryId: action.value.categoryId,
            userId: action.value.userId,
            imgUrl: action.value.imgUrl
          }
        ]
      };
    case EMPTY_CART:
      return {
        ...state,
        cart: []
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: action.value.cart
      };
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
};

export default dataReducer;
