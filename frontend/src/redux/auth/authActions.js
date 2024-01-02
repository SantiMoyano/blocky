import axios from "axios";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "./actionTypes";

function registerRequest() {
  return { type: REGISTER_REQUEST };
}

function registerSuccess() {
  return { type: REGISTER_SUCCESS };
}

function registerFailure(error) {
  return { type: REGISTER_FAILURE, error };
}

function registerUser(userData) {
  return function (dispatch) {
    dispatch(registerRequest());

    axios
      .post("/api/register", userData) // Ajusta la URL según tu backend
      .then((response) => {
        dispatch(registerSuccess());
      })
      .catch((error) => {
        dispatch(registerFailure(error.message));
      });
  };
}

export { registerUser };
