import { createAsyncThunk } from "@reduxjs/toolkit";

export const signInStaff = createAsyncThunk(
  "users/signInUser",
  async (incomingData, { rejectWithValue }) => {
    const userData = {
      name: incomingData.name,
      email: incomingData.email,
      password: incomingData.password,
    };
    const { role } = incomingData;
    const url = import.meta.env.VITE_BACKEND_API;
    try {
      const response = await axios.post(
        `${url}/api/${role}/register`,
        userData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
