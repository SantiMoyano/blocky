import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define an async thunk for getting task details
export const getTaskDetails = createAsyncThunk(
  "task/getTaskDetails",
  async (taskId, { dispatch }) => {
    try {
      dispatch(getTaskDetailsRequest());
      const response = await axios.get(`/api/v1/task/details/${taskId}`);
      dispatch(getTaskDetailsSuccess(response.data));
    } catch (error) {
      dispatch(getTaskDetailsFailure());
      throw error.response.data;
    }
  }
);

// Define an async thunk for deleting a task
export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (taskId, { dispatch }) => {
    try {
      dispatch(deleteTaskRequest());
      await axios.delete(`/api/v1/task/${taskId}`);
      dispatch(deleteTaskSuccess(taskId));
    } catch (error) {
      dispatch(deleteTaskFailure(error.response.data));
      throw error.response.data;
    }
  }
);

// Define the initial state for the task detail slice
const initialState = {
  task: {},
  loading: false,
  error: null,
};

// Create the Redux slice for task details
const taskDetailSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    getTaskDetailsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getTaskDetailsSuccess: (state, action) => {
      state.loading = false;
      state.task = action.payload;
    },
    getTaskDetailsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Reducer for delete task request
    deleteTaskRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    // Reducer for delete task success
    deleteTaskSuccess: (state, action) => {
      state.loading = false;
      // Handle task deletion in the state
      state.task = null; // or handle according to your use case
    },
    // Reducer for delete task failure
    deleteTaskFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export the actions and reducer for the task detail slice
export const {
  getTaskDetailsRequest,
  getTaskDetailsSuccess,
  getTaskDetailsFailure,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskFailure,
} = taskDetailSlice.actions;
export default taskDetailSlice.reducer;
