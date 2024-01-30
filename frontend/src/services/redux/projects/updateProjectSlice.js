import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const updateProject = createAsyncThunk(
  "project/updateProject",
  async ({ projectId, request }, { dispatch }) => {
    try {
      dispatch(updateProjectRequest());
      const response = await axios.put(`/api/v1/project/${projectId}`, request);
      dispatch(updateProjectSuccess(response.data));
    } catch (error) {
      dispatch(updateProjectFailure(error.response.data));
      throw error.response.data;
    }
  }
);

const initialState = {
  updating: false,
  success: null,
  error: null,
};

const updateProjectSlice = createSlice({
  name: "updateProject",
  initialState,
  reducers: {
    updateProjectRequest: (state) => {
      state.updating = true;
      state.success = null;
      state.error = null;
    },
    updateProjectSuccess: (state) => {
      state.updating = false;
      state.success = true;
      state.error = null;
    },
    updateProjectFailure: (state) => {
      state.updating = false;
      state.success = null;
      state.error = true;
    },
  },
});

export const {
  updateProjectRequest,
  updateProjectSuccess,
  updateProjectFailure,
} = updateProjectSlice.actions;

export default updateProjectSlice.reducer;
