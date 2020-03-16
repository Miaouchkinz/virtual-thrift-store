export const SET_USERS = 'SET_USERS';
export const SET_CLOTHINGS = 'SET_CLOTHINGS'

const dataReducer = (state, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.users,
        loading: false,
      };
    case SET_CLOTHINGS:
      return {
        ...state,
        clothings: action.clothings,
        loading: false
      };
    default:
      return state;
  }
};

export default dataReducer;