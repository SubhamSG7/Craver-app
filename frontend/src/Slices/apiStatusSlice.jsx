import { createSlice } from "@reduxjs/toolkit";
import { updateStaff } from "../Api/AdminApi";

const apiStatusSlice = createSlice({
  name: "loading",
  initialState: {
    status: null,
    staffData: [],  
    restaurantData: [], 
  },
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setStaffData: (state, action) => {
      state.staffData = action.payload;
    },
    setRestaurantData: (state, action) => {
      state.restaurantData = action.payload;
    },
    handleStaffStatusChange: (state, action) => {
      const { _id,type, restaurant_id} = action.payload;
      if(type==="approval"){
        state.staffData = state.staffData.map((staff) => {
            if (staff._id === _id) {
              return { ...staff, approved: !staff.approved }; 
            }
            return staff; 
          });
      }
      if(type==="restaurant"){
        let restaurant=state.restaurantData.find((data)=>data._id===restaurant_id)
        if (restaurant) {
            state.staffData = state.staffData.map((staff) => {
              if (staff._id === _id) {
                return { ...staff, restaurant: restaurant.name }; 
              }
              return staff;
            });
          }
        
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateStaff.pending, (state) => {
        state.status = "loading";
        state.error = null; 
      })
      .addCase(updateStaff.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedStaff = action.payload;
        state.staffData = state.staffData.map((staff) =>
          staff._id === updatedStaff._id ? updatedStaff : staff
        );
      })
      .addCase(updateStaff.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setStatus, setStaffData, setRestaurantData, handleStaffStatusChange } = apiStatusSlice.actions;
export default apiStatusSlice.reducer;
