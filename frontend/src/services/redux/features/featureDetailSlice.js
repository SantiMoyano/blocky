import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

// Define an async thunk for getting Feature details
export const getFeatureDetails = createAsyncThunk(
  "feature/getFeatureDetails",
  async (featureId, { dispatch }) => {
    try {
      dispatch(getFeatureDetailsRequest());
      const response = await axios.get(`/api/v1/feature/details/${featureId}`);
      dispatch(getFeatureDetailsSuccess(response.data));
    } catch (error) {
      dispatch(getFeatureDetailsFailure());
      throw error.response.data;
    }
  }
);

// Define an async thunk for deleting a Feature
export const deleteFeature = createAsyncThunk(
  "feature/deleteFeature",
  async (featureId, { dispatch }) => {
    try {
      dispatch(deleteFeatureRequest());
      await axios.delete(`/api/v1/feature/${featureId}`);
      dispatch(deleteFeatureSuccess(featureId));
    } catch (error) {
      dispatch(deleteFeatureFailure(error.response.data));
      throw error.response.data;
    }
  }
);

// Define the initial state for the Feature detail slice
const initialState = {
  feature: {},
  loading: false,
  error: null,
};

// Create the Redux slice for Feature details
const FeatureDetailSlice = createSlice({
  name: "feature",
  initialState,
  reducers: {
    getFeatureDetailsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getFeatureDetailsSuccess: (state, action) => {
      state.loading = false;
      state.feature = action.payload;
    },
    getFeatureDetailsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Reducer for delete Feature request
    deleteFeatureRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    // Reducer for delete Feature success
    deleteFeatureSuccess: (state, action) => {
      state.loading = false;
      // Handle Feature deletion in the state
      state.feature = null; // or handle according to your use case
    },
    // Reducer for delete Feature failure
    deleteFeatureFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export the actions and reducer for the Feature detail slice
export const {
  getFeatureDetailsRequest,
  getFeatureDetailsSuccess,
  getFeatureDetailsFailure,
  deleteFeatureRequest,
  deleteFeatureSuccess,
  deleteFeatureFailure,
} = FeatureDetailSlice.actions;
export default FeatureDetailSlice.reducer;
