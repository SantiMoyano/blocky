import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createTask = createAsyncThunk(
  "task/createTask",
  async (request, { dispatch }) => {
    try {
      dispatch(createTaskRequest());
      const response = await axios.post("/api/v1/task", request);
      dispatch(createTaskSuccess(response.data));
    } catch (error) {
      dispatch(createTaskFailure(error.response.data));
      throw error.response.data;
    }
  }
);

const initialState = {
  creating: false,
  success: null,
  error: null,
};

const createTaskSlice = createSlice({
  name: "createTask",
  initialState,
  reducers: {
    createTaskRequest: (state) => {
      state.creating = true;
      state.success = null;
      state.error = null;
    },
    createTaskSuccess: (state, action) => {
      state.creating = false;
      state.success = true;
      state.error = null;
    },
    createTaskFailure: (state, action) => {
      state.creating = false;
      state.success = null;
      state.error = true;
    },
  },
});

export const { createTaskRequest, createTaskSuccess, createTaskFailure } =
  createTaskSlice.actions;

export default createTaskSlice.reducer;
