// authSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Acción asincrónica utilizando createAsyncThunk
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { dispatch }) => {
    try {
      dispatch(registerRequest()); // Disparar la acción de solicitud

      const response = await axios.post("/api/register", userData);

      dispatch(registerSuccess()); // Disparar la acción de éxito
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
    // Reducers síncronos si es necesario
    registerRequest: (state) => {
      state.registering = true;
      state.error = null;
    },
    registerSuccess: (state) => {
      state.registering = false;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.registering = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Manejar los casos async de la acción registerUser
    builder
      .addCase(registerUser.pending, (state) => {
        state.registering = true;
        state.error = null;
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
export const { registerRequest, registerSuccess, registerFailure } =
  authSlice.actions;
export default authSlice.reducer;
