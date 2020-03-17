export const SET_USERS = 'SET_USERS';
export const SET_CLOTHINGS = 'SET_CLOTHINGS'
export const SET_FILTERS = 'SET_FILTERS'

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
    case SET_FILTERS:
      return {
        ...state,
        filters: action.filters
      }
    default:
      return state;
  };
};

export default dataReducer;