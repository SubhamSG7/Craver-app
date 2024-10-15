import { createSlice } from "@reduxjs/toolkit";
import { SendCategory } from "../Api/AddCategory";



const categorySlice=createSlice({
    name:"category",
    initialState:{
        restaurant:null,
        dish:{},
        status:'loading',
        apiStatus:null
    },
    reducers:{
        setRestaurant:(state,action)=>{
            state.restaurant=action.payload;
            state.status="sucess"
        },
        setDish:(state,action)=>{
            const {name,value}=action.payload;
            state.dish[name]=value;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(SendCategory.pending,(state,action)=>{
            state.apiStatus="Loading"
        })
        .addCase(SendCategory.fulfilled,(state,action)=>{
            state.apiStatus="Success"
            state.dish={}
        })
        .addCase(SendCategory.rejected,(state,action)=>{
            state.apiStatus=action.payload
        })
    }
})
export const {setRestaurant,setDish}=categorySlice.actions;
export default categorySlice.reducer;