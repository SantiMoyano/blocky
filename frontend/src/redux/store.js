import { configureStore } from "@reduxjs/toolkit";
import rootSlices from "./rootSlices";

const store = configureStore({
  reducer: rootSlices,
});

export default store;
