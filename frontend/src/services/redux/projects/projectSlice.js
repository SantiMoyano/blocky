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

// Define an async thunk for deleting a project
export const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async (projectId, { dispatch }) => {
    try {
      dispatch(deleteProjectRequest());
      await axios.delete(`/api/v1/project/${projectId}`);
      dispatch(deleteProjectSuccess(projectId));
    } catch (error) {
      dispatch(deleteProjectFailure(error.response.data));
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
    // Reducer for delete project request
    deleteProjectRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    // Reducer for delete project success
    deleteProjectSuccess: (state, action) => {
      state.loading = false;
      state.project = state.project.filter(
        (project) => project.id !== action.payload
      );
    },
    // Reducer for delete project failure
    deleteProjectFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
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
  deleteProjectRequest,
  deleteProjectSuccess,
  deleteProjectFailure,
} = projectSlice.actions;
export default projectSlice.reducer;
