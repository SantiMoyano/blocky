// authSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Acción asincrónica utilizando createAsyncThunk
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { dispatch }) => {
    try {
      dispatch(registerRequest()); // Disparar la acción de solicitud

      const response = await axios.post("/api/v1/auth/register", userData);

      dispatch(registerSuccess());
      // Introducir un pequeño retraso antes de cambiar registrationSuccess a true
      dispatch(setRegistrationSuccess(true));
    } catch (error) {
      dispatch(registerFailure(error.message)); // Disparar la acción de error
    }
  }
);

// Crear un slice utilizando createSlice
const authSlice = createSlice({
  name: "auth",
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
    },
    registerFailure: (state, action) => {
      state.registering = false;
      state.error = action.payload;
    },
    setRegistrationSuccess: (state, action) => {
      state.registrationSuccess = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.registering = true;
        state.error = null;
        state.registrationSuccess = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.registering = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registering = false;
        state.error = action.payload;
      });
  },
});

// Exportar las acciones generadas automáticamente y el reducer
export const {
  registerRequest,
  registerSuccess,
  registerFailure,
  setRegistrationSuccess,
} = authSlice.actions;
export default authSlice.reducer;
