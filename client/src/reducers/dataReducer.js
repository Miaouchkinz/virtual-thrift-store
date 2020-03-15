export const SET_USERS = 'SET_USERS';

const dataReducer = (state, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.users,
        loading: false,
      };
    default:
      return state;
  }
};

export default dataReducer;