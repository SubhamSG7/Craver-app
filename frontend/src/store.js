import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./Slices/usersSlice";
import restaurantSlice from "./Slices/restaurantSlice";
import apiStatusSlice from "./Slices/apiStatusSlice";


export const store = configureStore({
  reducer: { users: usersSlice, restaurant: restaurantSlice,loader:apiStatusSlice },
});
