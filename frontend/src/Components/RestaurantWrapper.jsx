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
    return text;
  };

  return (
    <div className="relative bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 shadow-xl rounded-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 cursor-pointer hover:shadow-2xl">
      {/* Restaurant Image */}
      <div className="h-48 w-full overflow-hidden rounded-t-2xl">
        <img
          src={data.imageUrl}
          alt={data.name}
          className="h-full w-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-110"
        />
      </div>

      {/* Card Content */}
      <div className="p-6 bg-white rounded-b-2xl text-gray-800">
        <h3 className="text-3xl font-bold mb-4 text-center font-sans tracking-widest text-purple-700">
          {data.name}
        </h3>

        <p className="text-sm text-gray-600 font-light text-center mb-4">
          {data.address}
        </p>

        <p className="text-md font-light text-gray-800 mb-6 text-center">
          {truncateAbout(data.about, 50)}
        </p>

        {/* Button */}
        <button
          className="block mx-auto bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white py-3 px-8 rounded-full text-lg font-bold tracking-wider hover:from-blue-600 hover:via-purple-600 hover:to-indigo-600 transition-transform transform hover:scale-105 shadow-lg"
          onClick={() => handleRestaurant(data._id)}
        >
          Order Now
        </button>
      </div>
    </div>
  );
}

export default RestaurantWrapper;
