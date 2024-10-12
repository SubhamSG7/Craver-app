import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./Slices/usersSlice";

export const store = configureStore({
  reducer: { users: usersSlice },
});
