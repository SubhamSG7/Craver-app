import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signInUser = createAsyncThunk(
  "users/signIn",
  async (userData, { rejectWithValue }) => {
    console.log(userData);
    try {
      const url =
        userData.role === undefined
          ? "http://localhost:3000/api/users/register"
          : `http://localhost:3000/api/${userData.role}/register`;
      const response = await axios.post(url, userData);
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
      const url =
        userData.role === undefined
          ? "http://localhost:3000/api/users/login"
          : `http://localhost:3000/api/${userData.role}/login`;
      console.log(url);
      const response = await axios.post(url, userData);
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
  email: "Provide a valid email",
  phone: "Phone number must be 10 characters only, containing numbers",
  password: "Password should be minimum 6 characters and alphanumeric",
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
    role: null,
  },
  reducers: {
    updateUserField: (state, action) => {
      const { field, value } = action.payload;
      if (state.userData.hasOwnProperty(field)) {
        state.userData[field] = value;
      }
    },
    setRole: (state, action) => {
      state.role = action.payload;
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

export const { updateUserField, checkValidation, setRole } = usersSlice.actions;

export default usersSlice.reducer;