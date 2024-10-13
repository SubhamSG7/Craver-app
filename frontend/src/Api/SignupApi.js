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
    try {
      const response = await axios.post(
        `http://localhost:3000/api/${role}/register`,
        userData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
