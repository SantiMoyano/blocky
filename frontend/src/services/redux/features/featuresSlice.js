import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

// Define an asynchronous thunk for getting all Features
export const getAllFeatures = createAsyncThunk(
  "epics/getAllFeatures",
  async (epicId, { dispatch }) => {
    try {
      // Dispatch the action to indicate the start of the request
      dispatch(getAllFeaturesRequest());
      // Make the API request to fetch all Features for the given epic
      const response = await axios.get(`/api/v1/feature/${epicId}`);
      // Dispatch the action with the received data on success
      dispatch(getAllFeaturesSuccess(response.data));
    } catch (error) {
      // Dispatch the action with the error information on failure
      dispatch(getAllFeaturesFailure(error.response.data));
      // Rethrow the error to be caught by the component or other error handling mechanisms
      throw error.response.data;
    }
  }
);

// Define the initial state for the task slice
const initialState = {
  features: [],
  loading: false,
  error: null,
};

// Create the Redux slice for Features
const FeaturesSlice = createSlice({
  name: "features",
  initialState,
  reducers: {
    // Reducer for indicating the start of the request
    getAllFeaturesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    // Reducer for handling the success of the request
    getAllFeaturesSuccess: (state, action) => {
      state.loading = false;
      state.features = action.payload;
    },
    // Reducer for handling the failure of the request
    getAllFeaturesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    reset: (state) => {
      state.features = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle the pending action for getAllFeatures
    builder.addCase(getAllFeatures.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
  },
});

// Export the actions and reducer for the Features slice
export const {
  getAllFeaturesRequest,
  getAllFeaturesSuccess,
  getAllFeaturesFailure,
  reset,
} = FeaturesSlice.actions;
export default FeaturesSlice.reducer;
