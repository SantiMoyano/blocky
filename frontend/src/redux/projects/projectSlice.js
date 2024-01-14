import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define an async thunk for getting all projects
export const getProjects = createAsyncThunk(
  "project/getProjects",
  async (id, { dispatch }) => {
    try {
      dispatch(getProjectsRequest());
      const response = await axios.get("/api/v1/project/" + id);
      dispatch(getProjectsSuccess(response.data));
    } catch (error) {
      dispatch(getProjectsFailure(error.response.data));
      throw error.response.data;
    }
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState: {
    project: [],
    loading: false,
    error: null,
  },
  reducers: {
    getProjectsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getProjectsSuccess: (state, action) => {
      state.loading = false;
      state.project = action.payload;
    },
    getProjectsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetProject: (state) => {
      state.project = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle the pending action for getProjects
    builder.addCase(getProjects.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
  },
});

export const {
  getProjectsRequest,
  getProjectsSuccess,
  getProjectsFailure,
  resetProject,
} = projectSlice.actions;
export default projectSlice.reducer;
