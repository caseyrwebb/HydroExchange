const bidModalReducer = (state = false, action) => {
  switch (action.type) {
    case "TOGGLE_BID_MODAL":
      return !state;
    default:
      return state;
  }
};

export default bidModalReducer;
