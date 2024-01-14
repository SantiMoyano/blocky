import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define an asynchronous thunk for getting all epics
export const getAllEpics = createAsyncThunk(
  "epics/getAllEpics",
  async (projectId, { dispatch }) => {
    try {
      // Dispatch the action to indicate the start of the request
      dispatch(getAllEpicsRequest());
      // Make the API request to fetch all epics for the given project
      const response = await axios.get(`/api/v1/epic/project/${projectId}`);
      // Dispatch the action with the received data on success
      dispatch(getAllEpicsSuccess(response.data));
    } catch (error) {
      // Dispatch the action with the error information on failure
      dispatch(getAllEpicsFailure(error.response.data));
      // Rethrow the error to be caught by the component or other error handling mechanisms
      throw error.response.data;
    }
  }
);

// Define the initial state for the epic slice
const initialState = {
  epics: [],
  loading: false,
  error: null,
};

// Create the Redux slice for epics
const epicSlice = createSlice({
  name: "epics",
  initialState,
  reducers: {
    // Reducer for indicating the start of the request
    getAllEpicsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    // Reducer for handling the success of the request
    getAllEpicsSuccess: (state, action) => {
      state.loading = false;
      state.epics = action.payload;
    },
    // Reducer for handling the failure of the request
    getAllEpicsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle the pending action for getAllEpics
    builder.addCase(getAllEpics.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
  },
});

// Export the actions and reducer for the epic slice
export const { getAllEpicsRequest, getAllEpicsSuccess, getAllEpicsFailure } =
  epicSlice.actions;
export default epicSlice.reducer;
