import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const updateEpic = createAsyncThunk(
  "epic/updateEpic",
  async ({ epicId, request }, { dispatch }) => {
    try {
      dispatch(updateEpicRequest());
      const response = await axios.put(`/api/v1/epic/${epicId}`, request);
      dispatch(updateEpicSuccess(response.data));
    } catch (error) {
      dispatch(updateEpicFailure(error.response.data));
      throw error.response.data;
    }
  }
);

const initialState = {
  updating: false,
  success: null,
  error: null,
};

const updateEpicSlice = createSlice({
  name: "updateEpic",
  initialState,
  reducers: {
    updateEpicRequest: (state) => {
      state.updating = true;
      state.success = null;
      state.error = null;
    },
    updateEpicSuccess: (state) => {
      state.updating = false;
      state.success = true;
      state.error = null;
    },
    updateEpicFailure: (state) => {
      state.updating = false;
      state.success = null;
      state.error = true;
    },
  },
});

export const { updateEpicRequest, updateEpicSuccess, updateEpicFailure } =
  updateEpicSlice.actions;

export default updateEpicSlice.reducer;
