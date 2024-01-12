import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define an async thunk for getting all projects
export const getAllProjects = createAsyncThunk("project/getAllProjects", async (token, { dispatch }) => {
  try {
    dispatch(getAllProjectsRequest());
    console.log(`Bearer ${token}`);
    const response = await axios.get("/api/v1/project", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getAllProjectsSuccess(response.data));
  } catch (error) {
    dispatch(getAllProjectsFailure(error.response.data));
    throw error.response.data;
  }
});

const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: [],
    loading: false,
    error: null,
  },
  reducers: {
    getAllProjectsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAllProjectsSuccess: (state, action) => {
      state.loading = false;
      state.projects = action.payload;
    },
    getAllProjectsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle the pending action for getAllProjects
    builder.addCase(getAllProjects.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
  },
});

export const { getAllProjectsRequest, getAllProjectsSuccess, getAllProjectsFailure } = projectSlice.actions;
export default projectSlice.reducer;


