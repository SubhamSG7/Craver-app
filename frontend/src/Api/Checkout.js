import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const Checkout=createAsyncThunk("cart/checkout",async(orderData,{rejectWithValue })=>{
    const url=import.meta.env.VITE_BACKEND_API; 
    try {
        const response = await axios.post(`${url}/api/restaurant/placeorder`, orderData, { withCredentials: true });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to update staff");
      }
})