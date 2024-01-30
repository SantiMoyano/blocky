import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Asynchronous action using createAsyncThunk
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { dispatch }) => {
    try {
      dispatch(registerRequest()); // Dispatch the request action

      const response = await axios.post("/api/v1/auth/register", userData);

      dispatch(registerSuccess());
    } catch (error) {
      dispatch(registerFailure(error.message)); // Dispatch the failure action
    }
  }
);

// Create a slice using createSlice
const registerSlice = createSlice({
  name: "register",
  initialState: {
    registering: false,
    error: null,
  },
  reducers: {
    registerRequest: (state) => {
      state.registering = true;
      state.error = null;
      state.registrationSuccess = false;
    },
    registerSuccess: (state) => {
      state.registering = false;
      state.error = null;
      state.registrationSuccess = true;
    },
    registerFailure: (state, action) => {
      state.registering = false;
      state.error = action.payload;
    },
  },
});

// Export automatically generated actions and reducer
export const { registerRequest, registerSuccess, registerFailure } =
  registerSlice.actions;
export default registerSlice.reducer;
