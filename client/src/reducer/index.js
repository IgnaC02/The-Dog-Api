const initalState = {
  dogs: [],
};

function rootReducer(state = initalState, action) {
  switch (action.type) {
    case "GET_DOGS":
      return {
        ...state,
        dogs: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
