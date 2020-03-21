export const SET_USERS = "SET_USERS";
export const SET_AVAILABLE_CLOTHING = "SET_AVAILABLE_CLOTHING";
export const SET_CLOTHING_CATEGORIES = "SET_CLOTHING_CATEGORIES";
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const SET_CART = "SET_CART";

const dataReducer = (state, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.users,
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
    case SET_CART:
      return {
        ...state,
        cart: [
          ...state.cart,
          {
            id: action.value.id,
            size: action.value.size,
            categoryId: action.value.categoryId,
            userId: action.value.userId
          }
        ]
      };
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
};

export default dataReducer;
