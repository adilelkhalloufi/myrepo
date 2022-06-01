const initialState = {
  profil: null,
  User: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "ACTION_LOGIN": {
      return {
        ...state,
        User: action.User,
      };
    }
    case "ACTION_CLEAR": {
      return {
        ...state,
        User: null,
      };
    }

    default:
      return state;
  }
}
export default reducer;
