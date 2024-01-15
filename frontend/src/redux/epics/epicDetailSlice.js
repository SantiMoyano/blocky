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
  },
});

// Export the actions and reducer for the epic detail slice
export const {
  getEpicDetailsRequest,
  getEpicDetailsSuccess,
  getEpicDetailsFailure,
} = epicDetailSlice.actions;
export default epicDetailSlice.reducer;
