import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async ({ taskId, request }, { dispatch }) => {
    try {
      dispatch(updateTaskRequest());
      const response = await axios.put(`/api/v1/task/${taskId}`, request);
      dispatch(updateTaskSuccess(response.data));
    } catch (error) {
      dispatch(updateTaskFailure(error.response.data));
      throw error.response.data;
    }
  }
);

const initialState = {
  updating: false,
  success: null,
  error: null,
};

const updateTaskSlice = createSlice({
  name: "updateTask",
  initialState,
  reducers: {
    updateTaskRequest: (state) => {
      state.updating = true;
      state.success = null;
      state.error = null;
    },
    updateTaskSuccess: (state) => {
      state.updating = false;
      state.success = true;
      state.error = null;
    },
    updateTaskFailure: (state) => {
      state.updating = false;
      state.success = null;
      state.error = true;
    },
  },
});

export const { updateTaskRequest, updateTaskSuccess, updateTaskFailure } =
  updateTaskSlice.actions;

export default updateTaskSlice.reducer;
