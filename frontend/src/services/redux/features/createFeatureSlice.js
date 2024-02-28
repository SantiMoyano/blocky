import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const createFeature = createAsyncThunk(
  "Feature/createFeature",
  async (request, { dispatch }) => {
    try {
      dispatch(createFeatureRequest());
      const response = await axios.post("/api/v1/feature", request);
      dispatch(createFeatureSuccess(response.data));
    } catch (error) {
      dispatch(createFeatureFailure(error.response.data));
      throw error.response.data;
    }
  }
);

const initialState = {
  creating: false,
  success: null,
  error: null,
};

const createFeatureSlice = createSlice({
  name: "createFeature",
  initialState,
  reducers: {
    createFeatureRequest: (state) => {
      state.creating = true;
      state.success = null;
      state.error = null;
    },
    createFeatureSuccess: (state, action) => {
      state.creating = false;
      state.success = true;
      state.error = null;
    },
    createFeatureFailure: (state, action) => {
      state.creating = false;
      state.success = null;
      state.error = true;
    },
  },
});

export const {
  createFeatureRequest,
  createFeatureSuccess,
  createFeatureFailure,
} = createFeatureSlice.actions;

export default createFeatureSlice.reducer;
