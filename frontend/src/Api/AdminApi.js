import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateStaff = createAsyncThunk(
  "staff/update",
  async (staffData, { rejectWithValue }) => {
    const url = import.meta.env.VITE_BACKEND_API; 
    
    try {
      const response = await axios.put(`${url}/api/admin/updatestaff`, staffData, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update staff");
    }
  }
);
