import { combineReducers } from "@reduxjs/toolkit";
import registerSlice from "./auth/registerSlice";
import loginSlice from "./auth/loginSlice";
import projectSlices from "./projects/projectSlices";
import projectSlice from "./projects/projectSlice";

const rootSlices = combineReducers({
  register: registerSlice,
  login: loginSlice,
  projects: projectSlices,
  project: projectSlice,
});

export default rootSlices;
