import { createSlice } from "@reduxjs/toolkit";
import { getPlacedOrders } from "../Api/getplacedorders";
import { cancelOrder } from "../Api/cancelOrder";
import { updateOrderStatus } from "../Api/updateOrderStatus";




const placedOrderSlice=createSlice({
    name:"placedorders",
    initialState:{
        listOforders:[],
        status:null,
        orders:null,
        cancelorderStatus:null,
        updateStatus:null,
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
        .addCase(cancelOrder.pending,(state,action)=>{
            state.cancelorderStatus="loading"
        })
        .addCase(cancelOrder.fulfilled,(state,action)=>{
            console.log(action.payload);
            
            state.cancelorderStatus="success"
        })
        .addCase(cancelOrder.rejected,(state,action)=>{
            state.cancelorderStatus=action.payload
        })
        .addCase(updateOrderStatus.pending,(state,action)=>{
            state.updateStatus="loading"
        })
        .addCase(updateOrderStatus.fulfilled,(state,action)=>{
            state.updateStatus="success"
        })
        .addCase(updateOrderStatus.rejected,(state,action)=>{
            state.updateStatus=action.payload
        })
    }
})

export default placedOrderSlice.reducer;