import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const updateFeature = createAsyncThunk(
  "feature/updateFeature",
  async ({ featureId, request }, { dispatch }) => {
    try {
      dispatch(updateFeatureRequest());
      const response = await axios.put(`/api/v1/feature/${featureId}`, request);
      dispatch(updateFeatureSuccess(response.data));
    } catch (error) {
      dispatch(updateFeatureFailure(error.response.data));
      throw error.response.data;
    }
  }
);

const initialState = {
  updating: false,
  success: null,
  error: null,
};

const updateFeatureSlice = createSlice({
  name: "updateFeature",
  initialState,
  reducers: {
    updateFeatureRequest: (state) => {
      state.updating = true;
      state.success = null;
      state.error = null;
    },
    updateFeatureSuccess: (state) => {
      state.updating = false;
      state.success = true;
      state.error = null;
    },
    updateFeatureFailure: (state) => {
      state.updating = false;
      state.success = null;
      state.error = true;
    },
  },
});

export const {
  updateFeatureRequest,
  updateFeatureSuccess,
  updateFeatureFailure,
} = updateFeatureSlice.actions;

export default updateFeatureSlice.reducer;
