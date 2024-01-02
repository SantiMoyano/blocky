import { combineReducers } from "@reduxjs/toolkit";
import registerSlice from "./auth/registerSlice";
// Importa otros reducers si los tienes

const rootSlices = combineReducers({
  auth: registerSlice,
  // Agrega otros reducers aquí
});

export default rootSlices;
