import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define an async thunk for getting epic details
export const getEpicDetails = createAsyncThunk(
  "epic/getEpicDetails",
  async (epicId, { dispatch }) => {
    try {
      dispatch(getEpicDetailsRequest());
      const response = await axios.get(`/api/v1/epic/details/${epicId}`);
      dispatch(getEpicDetailsSuccess(response.data));
    } catch (error) {
      dispatch(getEpicDetailsFailure());
      throw error.response.data;
    }
  }
);

// Define an async thunk for deleting an epic
export const deleteEpic = createAsyncThunk(
  "epic/deleteEpic",
  async (epicId, { dispatch }) => {
    try {
      dispatch(deleteEpicRequest());
      await axios.delete(`/api/v1/epic/${epicId}`);
      dispatch(deleteEpicSuccess(epicId));
    } catch (error) {
      dispatch(deleteEpicFailure(error.response.data));
      throw error.response.data;
    }
  }
);

// Define the initial state for the epic detail slice
const initialState = {
  epic: {},
  loading: false,
  error: null,
};

// Create the Redux slice for epic details
const epicDetailSlice = createSlice({
  name: "epic",
  initialState,
  reducers: {
    getEpicDetailsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getEpicDetailsSuccess: (state, action) => {
      state.loading = false;
      state.epic = action.payload;
    },
    getEpicDetailsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Reducer for delete epic request
    deleteEpicRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    // Reducer for delete epic success
    deleteEpicSuccess: (state, action) => {
      state.loading = false;
      // Filter out the deleted epic from the state
      state.epic = null; // or handle according to your use case
    },
    // Reducer for delete epic failure
    deleteEpicFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export the actions and reducer for the epic detail slice
export const {
  getEpicDetailsRequest,
  getEpicDetailsSuccess,
  getEpicDetailsFailure,
  deleteEpicRequest,
  deleteEpicSuccess,
  deleteEpicFailure,
} = epicDetailSlice.actions;
export default epicDetailSlice.reducer;
