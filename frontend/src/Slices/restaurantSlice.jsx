import { createSlice } from "@reduxjs/toolkit";
import { sendRestaurantData } from "../Api/restaurantApi";
import { LocationCalculator } from "../Handlers/LocationCalculator";

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState: {
    restaurantData: { name: "", address: "", about: "" },
    loading: null,
    error: null,
    userLongitude: null,
    userLatitude: null,
    allRestaurant: [],
    selectedRestaurantId:null,
    restaurantAdded:false,
  },
  reducers: {
    editRestaurantData: (state, action) => {
      const { field, value } = action.payload;

      if (state.restaurantData.hasOwnProperty(field)) {
        state.restaurantData[field] = value;
      }
    },
    setLocation: (state, action) => {
      const { longitude, latitude } = action.payload;
      state.userLongitude = longitude;
      state.userLatitude = latitude;
    },
    setrestaurantAdded:(state,action)=>{
      state.restaurantAdded=action.payload
    },
    setSelectedRestaurantId:(state,action)=>{
      state.selectedRestaurantId=action.payload;
    },
    setAllRestaurant: (state, action) => {
      let restaurantList = action.payload;
      const thresholdDistance = 500;
      restaurantList = restaurantList.filter((val) => {
        const { latitude, longitude } = val.geolocation;
        const distance = LocationCalculator(
          state.userLatitude,
          state.userLongitude,
          latitude,
          longitude
        );
        return distance <= thresholdDistance;
      });

      state.allRestaurant = restaurantList;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendRestaurantData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendRestaurantData.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurantData = { name: "", address: "", image: "", about: "" };
        
        state.restaurantAdded=true;
      })
      .addCase(sendRestaurantData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { editRestaurantData, setLocation, setAllRestaurant,setSelectedRestaurantId,setrestaurantAdded } =
  restaurantSlice.actions;
export default restaurantSlice.reducer;
