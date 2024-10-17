import { createSlice } from "@reduxjs/toolkit";
import { getPlacedOrders } from "../Api/getplacedorders";




const placedOrderSlice=createSlice({
    name:"placedorders",
    initialState:{
        listOforders:[],
        status:null,
        orders:null
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(getPlacedOrders.pending,(state,action)=>{
            state.status="loading"
        })
        .addCase(getPlacedOrders.fulfilled,(state,action)=>{
            state.status='success',
            state.orders=action.payload
        })
        .addCase(getPlacedOrders.rejected,(state,action)=>{
            state.status=action.payload
        })
    }
})

export default placedOrderSlice.reducer;