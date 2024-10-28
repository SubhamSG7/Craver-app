import React from "react";
import { useNavigate } from "react-router-dom";

function RestaurantWrapper({ data }) {
  const navigate = useNavigate();

  const handleRestaurant = (id) => {
    navigate(`/restaurant/${id}`);
  };

  const truncateAbout = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return words.join(" ");
  };

  return (
    <div className="shadow-xl rounded-2xl overflow-hidden transform transition-all duration-500 hover:scale-101 cursor-pointer hover:shadow-2xl flex flex-col h-fit sm:max-w-[40%] md:max-w-[30%]">
      <div className="h-[400px] overflow-hidden rounded-t-2xl">
        <img
          src={data.imageUrl}
          alt={data.name}
          className="h-full w-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-110"
        />
      </div>
      <div className="flex flex-col gap-5 p-6 bg-white rounded-b-2xl text-gray-800 h-full">
        <h3 className="text-lg md:text-3xl font-bold text-center font-sans tracking-widest text-purple-700">
          {data.name}
        </h3>
        <p className="text-sm text-gray-600 font-light text-center">
          {data.address}
        </p>
        <p className="text-md font-light text-gray-800 text-center text-clip line-clamp-3">
          {truncateAbout(data.about, 40)}
        </p>
        <button
          className="block mx-auto text-lg font-bold tracking-wider py-3 px-6 custom-md:px-10 rounded-full border-b-4 border-green-600 bg-transparent text-gray-800 transition-all duration-300 ease-in-out hover:bg-gradient-to-r from-green-600 to-green-400 hover:text-white"
          onClick={() => handleRestaurant(data._id)}
        >
          Order Now
        </button>
      </div>
    </div>
  );
}

export default RestaurantWrapper;
