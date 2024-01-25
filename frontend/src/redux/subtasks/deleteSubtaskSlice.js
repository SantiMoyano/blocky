import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define an async thunk for deleting a subtask
export const deleteSubtask = createAsyncThunk(
  "subtask/deleteSubtask",
  async (subtaskId, { dispatch }) => {
    try {
      dispatch(deleteSubtaskRequest());
      await axios.delete(`/api/v1/subtask/${subtaskId}`);
      dispatch(deleteSubtaskSuccess(subtaskId));
    } catch (error) {
      dispatch(deleteSubtaskFailure(error.response.data));
      throw error.response.data;
    }
  }
);

// Define the initial state for the subtask delete slice
const initialState = {
  deleting: false,
  success: null,
  error: null,
};

// Create the Redux slice for subtask deletion
const deleteSubtaskSlice = createSlice({
  name: "deleteSubtask",
  initialState,
  reducers: {
    deleteSubtaskRequest: (state) => {
      state.deleting = true;
      state.success = null;
      state.error = null;
    },
    deleteSubtaskSuccess: (state) => {
      state.deleting = false;
      state.success = true;
      state.error = null;
    },
    deleteSubtaskFailure: (state, action) => {
      state.deleting = false;
      state.success = null;
      state.error = action.payload;
    },
  },
});

// Export the actions and reducer for the subtask delete slice
export const {
  deleteSubtaskRequest,
  deleteSubtaskSuccess,
  deleteSubtaskFailure,
} = deleteSubtaskSlice.actions;
export default deleteSubtaskSlice.reducer;
