import { configureStore } from "@reduxjs/toolkit";
import rootSlices from "./rootSlices";

const store = configureStore({
  reducer: rootSlices,
  // ...otras configuraciones según sea necesario
});

export default store;
