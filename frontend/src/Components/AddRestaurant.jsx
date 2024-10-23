import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editRestaurantData, setrestaurantAdded } from "../Slices/restaurantSlice";
import { sendRestaurantData } from "../Api/restaurantApi";
import { useNavigate } from "react-router-dom";

function AddRestaurant() {
  const { restaurantData, loading, error ,restaurantAdded} = useSelector(
    (state) => state.restaurant
  )
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const image = e.target.image.files[0];
    const formData = new FormData();
    formData.append("name", restaurantData.name);
    formData.append("address", restaurantData.address);
    formData.append("image", image);
    formData.append("about", restaurantData.about);
    dispatch(sendRestaurantData(formData));
  };
  useEffect(()=>{
    if(restaurantAdded===true){
      dispatch(setrestaurantAdded(false));
      navigate("/")
    }
  },[restaurantAdded])

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6"
      >
        <input
          type="text"
          name="name"
          placeholder="Restaurant Name"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          onChange={(e) =>
            dispatch(
              editRestaurantData({
                field: e.target.name,
                value: e.target.value,
              })
            )
          }
        />
        <textarea
          name="address"
          placeholder="Address"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          onChange={(e) =>
            dispatch(
              editRestaurantData({
                field: e.target.name,
                value: e.target.value,
              })
            )
          }
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        <textarea
          name="about"
          placeholder="About the Restaurant"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          onChange={(e) =>
            dispatch(
              editRestaurantData({
                field: e.target.name,
                value: e.target.value,
              })
            )
          }
        />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
        >
          Add Restaurant
        </button>
      </form>
    </>
  );
}

export default AddRestaurant;
