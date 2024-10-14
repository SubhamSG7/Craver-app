import { createSlice } from "@reduxjs/toolkit";




const apiStatusSlice=createSlice({
    name:"loading",
    initialState:{
        status:null,
        data:null
    },
    reducers:{
        setStatus:(state,action)=>{
            state.status=action.payload;
        },
        setData:(state,action)=>{
            state.data=action.payload
        }
    }
})
export const {setStatus,setData}=apiStatusSlice.actions;
export default apiStatusSlice.reducer;