export const SET_USERS = 'SET_USERS';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

const dataReducer = (state, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.users,
        loading: false,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.value.currentUser,
        loggedInStatus: action.value.loggedInStatus
      };
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
    };
};

export default dataReducer;