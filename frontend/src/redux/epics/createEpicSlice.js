import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createEpic = createAsyncThunk(
  "epic/createEpic",
  async (request, { dispatch }) => {
    try {
      dispatch(createEpicRequest());
      const response = await axios.post("/api/v1/epic", request);
      dispatch(createEpicSuccess(response.data));
    } catch (error) {
      dispatch(createEpicFailure(error.response.data));
      throw error.response.data;
    }
  }
);

const initialState = {
  creating: false,
  success: null,
  error: null,
};

const createEpicSlice = createSlice({
  name: "createEpic",
  initialState,
  reducers: {
    createEpicRequest: (state) => {
      state.creating = true;
      state.success = null;
      state.error = null;
    },
    createEpicSuccess: (state) => {
      state.creating = false;
      state.success = true;
      state.error = null;
    },
    createEpicFailure: (state) => {
      state.creating = false;
      state.success = null;
      state.error = true;
    },
  },
});

export const { createEpicRequest, createEpicSuccess, createEpicFailure } =
  createEpicSlice.actions;

export default createEpicSlice.reducer;
