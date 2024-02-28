import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

// Define an async thunk for getting all Tasks
export const getAllTasks = createAsyncThunk(
  "task/getAllTasks",
  async (featureId, { dispatch }) => {
    try {
      dispatch(getAllTasksRequest());
      const response = await axios.get("/api/v1/task/" + featureId);
      dispatch(getAllTasksSuccess(response.data));
    } catch (error) {
      dispatch(getAllTasksFailure(error.response.data));
      throw error.response.data;
    }
  }
);

// Define a separate async thunk for toggling the "isDone" property
export const toggleIsDone = createAsyncThunk(
  "task/toggleIsDone",
  async (taskId, { dispatch }) => {
    try {
      // Use separate action types and action creators for this thunk
      dispatch(toggleIsDoneRequest());
      const response = await axios.put(`/api/v1/task/toggle/${taskId}`);
      dispatch(toggleIsDoneSuccess(response.data));
    } catch (error) {
      dispatch(toggleIsDoneFailure(error.response.data));
      throw error.response.data;
    }
  }
);

const tasksSlice = createSlice({
  name: "subtask",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {
    getAllTasksRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAllTasksSuccess: (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    },
    getAllTasksFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Define separate action types and action creators for toggleIsDone
    toggleIsDoneRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    toggleIsDoneSuccess: (state, action) => {
      state.loading = false;
      state.tasks = action.payload; // Update the state accordingly
    },
    toggleIsDoneFailure: (state, action) => {
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

export const {
  getAllTasksRequest,
  getAllTasksSuccess,
  getAllTasksFailure,
  toggleIsDoneRequest,
  toggleIsDoneSuccess,
  toggleIsDoneFailure,
} = tasksSlice.actions;
export default tasksSlice.reducer;
