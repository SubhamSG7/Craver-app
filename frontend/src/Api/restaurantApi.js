import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const url=import.meta.env.VITE_BACKEND_API
export const sendRestaurantData = createAsyncThunk(
  "restaurant/sendRestaurantData",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${url}/api/restaurant`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);