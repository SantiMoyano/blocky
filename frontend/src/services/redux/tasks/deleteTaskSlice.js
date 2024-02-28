import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

// Define an async thunk for deleting a Task
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

// Define the initial state for the Task delete slice
const initialState = {
  deleting: false,
  success: null,
  error: null,
};

// Create the Redux slice for Task deletion
const deleteTaskSlice = createSlice({
  name: "deleteTask",
  initialState,
  reducers: {
    deleteTaskRequest: (state) => {
      state.deleting = true;
      state.success = null;
      state.error = null;
    },
    deleteTaskSuccess: (state) => {
      state.deleting = false;
      state.success = true;
      state.error = null;
    },
    deleteTaskFailure: (state, action) => {
      state.deleting = false;
      state.success = null;
      state.error = action.payload;
    },
  },
});

// Export the actions and reducer for the Task delete slice
export const { deleteTaskRequest, deleteTaskSuccess, deleteTaskFailure } =
  deleteTaskSlice.actions;
export default deleteTaskSlice.reducer;
