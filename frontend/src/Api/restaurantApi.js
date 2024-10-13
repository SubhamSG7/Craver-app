import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendRestaurantData = createAsyncThunk(
  "restaurant/sendRestaurantData",
  async (formData, { rejectWithValue }) => {
    for (let pairs of formData.entries()) {
      console.log(pairs);
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/restaurant",
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
