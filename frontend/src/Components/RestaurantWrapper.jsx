import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function RestaurantWrapper({ data }) {
  const navigate=useNavigate();
  function handleRestaurant(id) {
    navigate(`/restaurant/${id}`)
  }

  const truncateAbout = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
  };

  return (
    <div className="relative bg-white shadow-black shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointet">
      <div className="absolute inset-0">
        <img
          src={data.imageUrl}
          alt={data.name}
          className="h-full w-full object-cover blur-[3px] transition-all duration-300"
        />
      </div>
      <div className="relative p-4 bg-black bg-opacity-40 rounded-lg">
        <h3 className="text-2xl font-bold mb-2 text-center text-white font-poppins">{data.name}</h3>
        <p className="text-white mb-4 font-poppins">{data.address}</p>
        <p className="text-lg text-white font-poppins mb-4">{truncateAbout(data.about, 50)}</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" onClick={()=>handleRestaurant(data._id)}>
          Order from here
        </button>
      </div>
    </div>
  );
}

export default RestaurantWrapper;
