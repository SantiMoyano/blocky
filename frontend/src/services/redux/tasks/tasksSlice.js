import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define an asynchronous thunk for getting all tasks
export const getAllTasks = createAsyncThunk(
  "epics/getAllTasks",
  async (epicId, { dispatch }) => {
    try {
      // Dispatch the action to indicate the start of the request
      dispatch(getAllTasksRequest());
      // Make the API request to fetch all tasks for the given epic
      const response = await axios.get(`/api/v1/task/${epicId}`);
      // Dispatch the action with the received data on success
      dispatch(getAllTasksSuccess(response.data));
    } catch (error) {
      // Dispatch the action with the error information on failure
      dispatch(getAllTasksFailure(error.response.data));
      // Rethrow the error to be caught by the component or other error handling mechanisms
      throw error.response.data;
    }
  }
);

// Define the initial state for the task slice
const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

// Create the Redux slice for tasks
const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // Reducer for indicating the start of the request
    getAllTasksRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    // Reducer for handling the success of the request
    getAllTasksSuccess: (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    },
    // Reducer for handling the failure of the request
    getAllTasksFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle the pending action for getAllTasks
    builder.addCase(getAllTasks.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
  },
});

// Export the actions and reducer for the tasks slice
export const { getAllTasksRequest, getAllTasksSuccess, getAllTasksFailure } =
  tasksSlice.actions;
export default tasksSlice.reducer;
