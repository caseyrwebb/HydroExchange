// export const loginUser = () => {
//   return {
//     type: "LOGIN_USER",
//   };
// };

import { USER_AUTH, USER_ERROR } from "../types";
import axios from "axios";

export const getUser = (userData) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:4000/api/auth/", userData);
    dispatch({
      type: USER_AUTH,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: USER_ERROR,
      payload: console.log(e),
    });
  }
};

export const toggleBidModal = () => {
  return {
    type: "TOGGLE_BID_MODAL",
  };
};
