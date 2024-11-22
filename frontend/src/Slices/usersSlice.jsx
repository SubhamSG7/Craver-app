import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { getAddress } from "../Api/getAddress";

export const signInUser = createAsyncThunk(
  "users/signIn",
  async (userData, { rejectWithValue }) => {
    try {
      const url1 = import.meta.env.VITE_BACKEND_API;
      const url =
        userData.role === undefined
          ? `${url1}/api/users/register`
          : `${url1}/api/${userData.role}/register`;
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
      const url1 = import.meta.env.VITE_BACKEND_API;
      const url =
        userData.role === undefined
          ? `${url1}/api/users/login`
          : `${url1}/api/${userData.role}/login`;
      const response = await axios.post(url, userData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const regex = {
  name: /^[A-Za-z\s]+$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phone: /^\+91[1-9]{1}[0-9]{9}$|^[1-9]{1}[0-9]{9}$/,
  password: /^(?=.*[a-zA-Z0-9]).{7,}$/,
};

const errMessage = {
  name: "Name should be provided without any special characters",
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
    loggedUser: null,
    address: null,
    status: null,
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
    setSigninStatus: (state, action) => {
      state.signInStatus = action.payload;
    },
    setLoggedUser: (state, action) => {
      state.loggedUser = action.payload;
    },
    clearUserField: (state, action) => {
      state.userData = { name: "", email: "", phone: "", password: "" };
      state.loginStatus = null;
    },

    checkValidation: (state, action) => {
      const field = action.payload;
      const value = state.userData[field];
      console.log("chla");
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
        toast.success("Sign in successful!");
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.signInStatus = "failed";
        state.signInError = action.payload;
        toast.error(`Sign in failed: ${action.payload}`);
      })
      .addCase(loginUser.pending, (state) => {
        state.loginStatus = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginStatus = "succeeded";
        state.userData = action.payload.user;
        toast.success("Login successful!");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.loginError = action.payload;
        toast.error(`Login failed: ${action.payload}`);
      })
      .addCase(getAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAddress.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.address = action.payload.address;
      })
      .addCase(getAddress.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const {
  updateUserField,
  checkValidation,
  setRole,
  setLoggedUser,
  clearUserField,
  setSigninStatus,
} = usersSlice.actions;

export default usersSlice.reducer;
