// const userReducer = (state = false, action) => {
//   switch (action.type) {
//     case "LOGIN_USER":
//       return !state;
//     default:
//       return state;
//   }
// };
//
// export default userReducer;

import { USER_AUTH } from "../types";

const initialState = {
  user: [],
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_AUTH:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
