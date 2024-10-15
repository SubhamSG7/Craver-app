import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const SendCategory = createAsyncThunk(
  "category/SendCategory",
  async (dish, { rejectWithValue }) => {
    const url = import.meta.env.VITE_BACKEND_API; 
    try {
      const response = await axios.post(
        `${url}/api/staff/addcategory`,
        dish,
        {
        withCredentials:true
        }
      );
      return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to send category");
    }
  }
);
