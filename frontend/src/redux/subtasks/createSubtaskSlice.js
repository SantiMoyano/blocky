import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createSubtask = createAsyncThunk(
  "subtask/createSubtask",
  async (request, { dispatch }) => {
    try {
      dispatch(createSubtaskRequest());
      const response = await axios.post("/api/v1/subtask", request);
      dispatch(createSubtaskSuccess(response.data));
    } catch (error) {
      dispatch(createSubtaskFailure(error.response.data));
      throw error.response.data;
    }
  }
);

const initialState = {
  creating: false,
  success: null,
  error: null,
};

const createSubtaskSlice = createSlice({
  name: "createSubtask",
  initialState,
  reducers: {
    createSubtaskRequest: (state) => {
      state.creating = true;
      state.success = null;
      state.error = null;
    },
    createSubtaskSuccess: (state) => {
      state.creating = false;
      state.success = true;
      state.error = null;
    },
    createSubtaskFailure: (state) => {
      state.creating = false;
      state.success = null;
      state.error = true;
    },
  },
});

export const {
  createSubtaskRequest,
  createSubtaskSuccess,
  createSubtaskFailure,
} = createSubtaskSlice.actions;

export default createSubtaskSlice.reducer;
