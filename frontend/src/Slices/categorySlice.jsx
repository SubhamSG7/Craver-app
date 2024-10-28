import { createSlice } from "@reduxjs/toolkit";
import { SendCategory } from "../Api/AddCategory";
import { GetCategory } from "../Api/GetCategory";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    restaurant: null,
    categories: null,
    categoryList: [],
    cuisineList: [],
    dish: {},
    filteroptions: { search: null, category: null, cuisine: null },
    status: "loading",
    apiStatus: null,
    filteredData: null,
  },
  reducers: {
    setRestaurant: (state, action) => {
      state.restaurant = action.payload;
      state.status = "success";
    },
    setDish: (state, action) => {
      const { name, value } = action.payload;
      state.dish[name] = value;
    },
    setList: (state, action) => {
      const uniqueCategories = [
        ...new Set(state.categories.map((val) => val.category)),
      ];
      const uniqueCuisine = [
        ...new Set(state.categories.map((val) => val.cuisine)),
      ];
      state.categoryList = uniqueCategories;
      state.cuisineList = uniqueCuisine;
    },
    resetDish: (state) => {
      state.dish = {};
    },
    setFilterMenu: (state, action) => {
      const { name, value } = action.payload;
      state.filteroptions[name] = value;
    },
    clearFilterMenu: (state, action) => {
      state.filteroptions = { search: null, category: null, cuisine: null };
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    filterMenu: (state, action) => {
      const { search, category, cuisine } = state.filteroptions;
      let filteredData = state.categories.filter((val) => {
        const matchesSearch = search
          ? val.name.toLowerCase().includes(search.toLowerCase())
          : true;
        const matchesCategory = category ? val.category === category : true;
        const matchesCuisine = cuisine ? val.cuisine === cuisine : true;
        return matchesSearch && matchesCategory && matchesCuisine;
      });
      filteredData.length > 0
        ? (state.filteredData = filteredData)
        : (state.filteredData = "Not Found");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SendCategory.pending, (state) => {
        state.apiStatus = "loading";
      })
      .addCase(SendCategory.fulfilled, (state) => {
        state.apiStatus = "success";
        state.dish = {};
      })
      .addCase(SendCategory.rejected, (state, action) => {
        state.apiStatus = action.payload;
      })
      .addCase(GetCategory.pending, (state) => {
        state.apiStatus = "loading";
      })
      .addCase(GetCategory.fulfilled, (state, action) => {
        state.apiStatus = "success";
        state.categories = action.payload;
      })
      .addCase(GetCategory.rejected, (state, action) => {
        state.apiStatus = action.payload;
      });
  },
});

export const {
  setRestaurant,
  setDish,
  setList,
  setFilterMenu,
  filterMenu,
  clearFilterMenu,
  resetDish,
  setStatus,
} = categorySlice.actions;
export default categorySlice.reducer;
