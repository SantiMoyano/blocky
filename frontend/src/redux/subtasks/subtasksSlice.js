import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define an async thunk for getting all subtasks
export const getAllSubtasks = createAsyncThunk(
  "subtask/getAllSubtasks",
  async (taskId, { dispatch }) => {
    try {
      dispatch(getAllSubtasksRequest());
      const response = await axios.get("/api/v1/subtask/" + taskId);
      dispatch(getAllSubtasksSuccess(response.data));
    } catch (error) {
      dispatch(getAllSubtasksFailure(error.response.data));
      throw error.response.data;
    }
  }
);

const subtaskSlice = createSlice({
  name: "subtask",
  initialState: {
    subtasks: [],
    loading: false,
    error: null,
  },
  reducers: {
    getAllSubtasksRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAllSubtasksSuccess: (state, action) => {
      state.loading = false;
      state.subtasks = action.payload;
    },
    getAllSubtasksFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle the pending action for getAllSubtasks
    builder.addCase(getAllSubtasks.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
  },
});

export const {
  getAllSubtasksRequest,
  getAllSubtasksSuccess,
  getAllSubtasksFailure,
} = subtaskSlice.actions;
export default subtaskSlice.reducer;
