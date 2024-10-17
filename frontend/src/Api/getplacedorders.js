import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; 

export const getPlacedOrders = createAsyncThunk(
  "placedorders/getPlacedOrders",
  async (_, { rejectWithValue }) => {
    const url = import.meta.env.VITE_BACKEND_API; 
    try {
      const response = await axios.get(`${url}/api/users/placedorders`, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch placed orders");
    }
  }
);
