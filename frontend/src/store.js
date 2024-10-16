import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./Slices/usersSlice";
import restaurantSlice from "./Slices/restaurantSlice";
import apiStatusSlice from "./Slices/apiStatusSlice";
import categorySlice from "./Slices/categorySlice";
import cartSlice from "./Slices/cartSlice";


export const store = configureStore({
  reducer: { users: usersSlice, restaurant: restaurantSlice,loader:apiStatusSlice,category:categorySlice ,cart:cartSlice},
});
