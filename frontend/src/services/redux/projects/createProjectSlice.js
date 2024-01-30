import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createProject = createAsyncThunk(
  "project/createProject",
  async ({ token, request }, { dispatch }) => {
    try {
      dispatch(createProjectRequest());
      const response = await axios.post("/api/v1/project", request, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(createProjectSuccess(response.data));
    } catch (error) {
      dispatch(createProjectFailure(error.response.data));
      throw error.response.data;
    }
  }
);

const initialState = {
  creating: false,
  success: null,
  error: null,
};

const createProjectSlice = createSlice({
  name: "createProject",
  initialState,
  reducers: {
    createProjectRequest: (state) => {
      state.creating = true;
      state.success = null;
      state.error = null;
    },
    createProjectSuccess: (state, action) => {
      state.creating = false;
      state.success = true;
      state.error = null;
    },
    createProjectFailure: (state, action) => {
      state.creating = false;
      state.success = null;
      state.error = true;
    },
  },
});

export const {
  createProjectRequest,
  createProjectSuccess,
  createProjectFailure,
} = createProjectSlice.actions;

export default createProjectSlice.reducer;
