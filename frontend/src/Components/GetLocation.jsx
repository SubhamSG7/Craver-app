import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { setAllRestaurant, setLocation } from '../Slices/restaurantSlice';

function GetLocation() {
  const dispatch = useDispatch();
  const { userLongitude, userLatitude } = useSelector(state => state.restaurant);
  const data = useLoaderData();

  useEffect(() => {
    handleGetLocation();
  }, []);

  useEffect(() => {
    if (userLatitude && userLongitude) {
      dispatch(setAllRestaurant(data));
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

  return (
    <>
      {/* You can add any UI elements here if needed */}
    </>
  );
}

export default GetLocation;
