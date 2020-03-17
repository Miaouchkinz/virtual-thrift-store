export const SET_USERS = 'SET_USERS';
export const SET_AVAILABLE_CLOTHINGS = 'SET_CLOTHINGS'

const dataReducer = (state, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.users,
        loading: false,
      };
    case SET_AVAILABLE_CLOTHINGS:
      return {
        ...state,
        clothing: action.clothing,
        loading: false
      };
  };
};

export default dataReducer;