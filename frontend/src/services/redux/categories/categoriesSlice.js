import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define an async thunk for getting all categories
export const getAllCategories = createAsyncThunk(
  "categories/getAllCategories",
  async (arg, { dispatch }) => {
    try {
      dispatch(getAllCategoriesRequest());
      const response = await axios.get("/api/v1/category");
      dispatch(getAllCategoriesSuccess(response.data));
    } catch (error) {
      dispatch(getAllCategoriesFailure(error.response.data));
      throw error.response.data;
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {
    getAllCategoriesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAllCategoriesSuccess: (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    },
    getAllCategoriesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getAllCategoriesRequest,
  getAllCategoriesSuccess,
  getAllCategoriesFailure,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
