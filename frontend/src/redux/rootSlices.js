import { combineReducers } from "@reduxjs/toolkit";
import registerSlice from "./auth/registerSlice";
import loginSlice from "./auth/loginSlice";

const rootSlices = combineReducers({
  register: registerSlice,
  login: loginSlice,
});

export default rootSlices;
