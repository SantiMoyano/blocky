import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (userData, { dispatch }) => {
    try {
      dispatch(loginRequest());
      const response = await axios.post("/api/v1/auth/login", userData);
      const token = response.data.token;
      localStorage.setItem("authToken", token);
      localStorage.setItem("username", userData.username);
      dispatch(loginSuccess());
    } catch (error) {
      error.message = "Incorrect username or password";
      dispatch(loginFailure(error));
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    loggingIn: false,
    error: null,
    loginSuccess: false, // Assuming you want to track login success
  },
  reducers: {
    loginRequest: (state) => {
      state.loggingIn = true;
      state.error = null;
      state.loginSuccess = false;
    },
    loginSuccess: (state) => {
      state.loggingIn = false;
      state.error = null;
      state.loginSuccess = true;
    },
    loginFailure: (state, action) => {
      state.loggingIn = false;
      state.error = action.payload;
    },
    reset: (state) => {
      state.loggingIn = false;
      state.error = null;
      state.loginSuccess = false;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, reset } =
  loginSlice.actions;
export default loginSlice.reducer;
