import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAddress = createAsyncThunk(
  "users/getAddress",
  async (_, { rejectWithValue }) => {
    const url = import.meta.env.VITE_BACKEND_API; 
    try {
      const response = await axios.get(`${url}/api/restaurant/getaddress`, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch address");
    }
  }
);
