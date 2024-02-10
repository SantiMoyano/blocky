import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const updateSubtask = createAsyncThunk(
  "subtask/updateSubtask",
  async ({ subtaskId, request }, { dispatch }) => {
    try {
      dispatch(updateSubtaskRequest());
      const response = await axios.put(`/api/v1/subtask/${subtaskId}`, request);
      dispatch(updateSubtaskSuccess(response.data));
    } catch (error) {
      dispatch(updateSubtaskFailure(error.response.data));
      throw error.response.data;
    }
  }
);

const initialState = {
  updating: false,
  success: null,
  error: null,
};

const updateSubtaskSlice = createSlice({
  name: "updateSubtask",
  initialState,
  reducers: {
    updateSubtaskRequest: (state) => {
      state.updating = true;
      state.success = null;
      state.error = null;
    },
    updateSubtaskSuccess: (state) => {
      state.updating = false;
      state.success = true;
      state.error = null;
    },
    updateSubtaskFailure: (state) => {
      state.updating = false;
      state.success = null;
      state.error = true;
    },
    reset: (state) => {
      state.updating = false;
      state.success = null;
      state.error = null;
    },
  },
});

export const {
  updateSubtaskRequest,
  updateSubtaskSuccess,
  updateSubtaskFailure,
  reset,
} = updateSubtaskSlice.actions;

export default updateSubtaskSlice.reducer;
