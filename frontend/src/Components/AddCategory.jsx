import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageLoaders from "../Loaders/PageLoaders";
import { setDish, setRestaurant } from "../Slices/categorySlice";
import { SendCategory } from "../Api/AddCategory";

function AddCategory() {
  const { dish, restaurant, status } = useSelector(state => state.category);
  const dispatch = useDispatch();
  let url = import.meta.env.VITE_BACKEND_API;

  function handleDishSubmission(e){
    e.preventDefault();
    dispatch(SendCategory(dish))
  }

  async function getStaffRestaurant() {
    try {
      const resp = await axios.get(`${url}/api/staff/getrestaurant`, {
        withCredentials: true,
      });
      dispatch(setRestaurant(resp?.data));
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getStaffRestaurant();
  }, []);
  
  if (status === "loading") return <PageLoaders />;

  return (
    <div className="relative bg-gray-200">
      <img 
        src={restaurant?.imageUrl} 
        alt="Restaurant" 
        className="w-full h-[25rem] object-cover blur-[3px]" 
      />
      <div className="absolute top-16 flex flex-col justify-center items-center text-white bg-[#34323288] bg-opacity-50 z-10 p-5">
        <h3 className="text-3xl font-bold">{restaurant?.name}</h3>
        <p className="text-2xl">{restaurant?.address}</p>
        <p className="text-lg text-center">{restaurant?.about}</p>
      </div>
      <form className="mt-4 p-6 bg-white rounded-lg shadow-lg z-20 relative max-w-md mx-auto " onSubmit={handleDishSubmission}>
        <h2 className="text-xl font-semibold text-[#333333] mb-4">Add a New Dish</h2>
        <div className="mb-4">
          <label className="block text-[#555555] mb-1">Dish Name</label>
          <input 
            type="text" 
            name="dishname"
            className="w-full p-3 border border-[#dddddd] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007BFF]" 
            placeholder="Enter dish name" 
            required 
            onChange={(e)=>dispatch(setDish({name:e.target.name,value:e.target.value}))}
          />
        </div>
        <div className="mb-4">
          <label className="block text-[#555555] mb-1">Category</label>
          <input 
            type="text" 
            name="category"
            className="w-full p-3 border border-[#dddddd] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007BFF]" 
            placeholder="Enter category" 
            onChange={(e)=>dispatch(setDish({name:e.target.name,value:e.target.value}))}
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-[#555555] mb-1">Cuisine</label>
          <input 
            type="text" 
            className="w-full p-3 border border-[#dddddd] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007BFF]" 
            placeholder="Enter cuisine" 
            name="cuisine"
            onChange={(e)=>dispatch(setDish({name:e.target.name,value:e.target.value}))}
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-[#555555] mb-1">Dish Details</label>
          <textarea 
            className="w-full p-3 border border-[#dddddd] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007BFF] resize-none" 
            placeholder="Enter dish details"
            name="dishdetail"
            onChange={(e)=>dispatch(setDish({name:e.target.name,value:e.target.value}))}
            rows="4"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-[#555555] mb-1">Price</label>
          <input 
            type="number" 
            className="w-full p-3 border border-[#dddddd] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007BFF]" 
            placeholder="Enter price" 
            name="price"
            onChange={(e)=>dispatch(setDish({name:e.target.name,value:e.target.value}))}
          />
        </div>
        <div className="mb-4">
          <label className="block text-[#555555] mb-1">Discount</label>
          <input 
            type="number" 
            className="w-full p-3 border border-[#dddddd] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007BFF]" 
            placeholder="Enter discount" 
            name="discount"
            onChange={(e)=>dispatch(setDish({name:e.target.name,value:e.target.value}))}
          />
        </div>
        <button type="submit" className="w-full p-3 bg-[#007BFF] text-white rounded-lg hover:bg-[#0056b3] transition duration-200">Add Dish</button>
      </form>
    </div>
  );
}

export default AddCategory;
