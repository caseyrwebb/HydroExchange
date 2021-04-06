// import { combineReducers } from "redux";
// import userReducer from "./userReducer";
//
// const allReducers = combineReducers({
//   userReducer,
// });
//
// export default allReducers;

import { combineReducers } from "redux";
import userReducer from "./userReducer";
import bidModalReducer from "./bidModalReducer";

export default combineReducers({
  user: userReducer,
  bidModal: bidModalReducer,
});
