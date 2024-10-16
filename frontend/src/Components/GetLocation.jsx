import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import { setAllRestaurant, setLocation } from "../Slices/restaurantSlice";
import axios from "axios";
import { FaLocationCrosshairs } from "react-icons/fa6";

function GetLocation() {
  const dispatch = useDispatch();
  const { userLongitude, userLatitude } = useSelector(
    (state) => state.restaurant
  );
  const data = useLoaderData();
  const [city, setCity] = useState(null);

  useEffect(() => {
    handleGetLocation();
  }, []);

  useEffect(() => {
    if (userLatitude && userLongitude) {
      dispatch(setAllRestaurant(data));
      fetchCityName(userLatitude, userLongitude);
    }
  }, [userLatitude, userLongitude, data, dispatch]);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          dispatch(setLocation({ latitude, longitude }));
        },
        (err) => {
          console.error(err.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const fetchCityName = async (latitude, longitude) => {
    const apiKey = import.meta.env.VITE_OPENCAGE_API;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const results = response.data.results;

      if (results.length > 0) {
        const city =
          results[0].components.city ||
          results[0].components.town ||
          results[0].components.village;
        setCity(city);
      } else {
        console.error("No results found for reverse geocoding.");
      }
    } catch (error) {
      console.error("Error fetching city name:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {city ? (
        <div className="flex items-center text-xl font-bold mb-2">
          <FaLocationCrosshairs className="mr-2" />
          <span>{city}!</span>
        </div>
      ) : (
        <p className="text-xl animate-pulse">Fetching your city name...</p>
      )}
    </div>
  );
}

export default GetLocation;
