import React from "react";

function RestaurantWrapper({ data }) {
  function handleRestaurant(){
    
  }
  return (
    <div className="bg-white shadow-black shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer" onClick={handleRestaurant}>
      <img
        src={data.imageUrl}
        alt={data.name}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2 font-poppins">{data.name}</h3>
        <p className="text-gray-600 mb-4 font-poppins">{data.address}</p>
        <p className="text-sm text-gray-700 font-poppins">{data.about}</p>
      </div>
    </div>
  );
}

export default RestaurantWrapper;
