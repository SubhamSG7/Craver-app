import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signInUser = createAsyncThunk(
  "users/signInUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/register",
        userData
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        userData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const regex = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phone: /^\+91[1-9]{1}[0-9]{9}$|^[1-9]{1}[0-9]{9}$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/,
};

const errMessage = {
  email: "Provide a Valid Email",
  phone: "Phone Number Must be 10 Characters Only Numbers",
  password: "Password Should be minimum 6 characters and alphanumeric",
};

const usersSlice = createSlice({
  name: "users",
  initialState: {
    userData: { name: "", email: "", phone: "", password: "" },
    validationErr: {},
    signInStatus: null,
    signInError: null,
    loginStatus: null,
    loginError: null,
  },
  reducers: {
    updateUserField: (state, action) => {
      const { field, value } = action.payload;
      if (state.userData.hasOwnProperty(field)) {
        state.userData[field] = value;
      }
    },
    checkValidation: (state, action) => {
      const field = action.payload;
      const value = state.userData[field];

      if (!regex[field].test(value)) {
        if (!state.validationErr[field]) {
          state.validationErr[field] = errMessage[field];
        }
      } else {
        if (state.validationErr[field]) {
          state.validationErr[field] = "";
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.signInStatus = "loading";
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.signInStatus = "succeeded";
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.signInStatus = "failed";
        state.signInError = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loginStatus = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginStatus = "succeeded";
        state.userData = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.loginError = action.payload;
      });
  },
});

export const { updateUserField, checkValidation } = usersSlice.actions;
export default usersSlice.reducer;
