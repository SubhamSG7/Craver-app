import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_BACKEND_API;

export const GetCategory = createAsyncThunk(
    "category/GetCategory",
    async (restaurantId, { rejectWithValue }) => {
        
        try {
            const resp = await axios.get(`${url}/api/restaurant/getcategories`, {
                params: { id: restaurantId }, 
                withCredentials: true,
            });
            return resp.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error?.response?.data?.message || "An error occurred"); 
        }
    }
);
