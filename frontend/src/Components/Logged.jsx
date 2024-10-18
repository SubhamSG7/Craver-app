import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OrderLoader from "../Loaders/OrderLoader";

function Logged() {
  const { loggedUser } = useSelector((state) => state.users);
  const { name } = loggedUser;
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(3);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (seconds > 0) {
        setSeconds((prev) => prev - 1);
      } else {
        navigate("/");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-blue-400">
      <div className="flex flex-col items-center justify-center h-auto w-full max-w-md bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Hello, {name}!</h1>
        <p className="text-lg mb-4 text-gray-600">Welcome to Craver</p>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-24 h-24 border-8 border-blue-500 rounded-full bg-blue-50 shadow-inner">
            <span className="text-4xl font-extrabold text-blue-500">{seconds}</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">seconds remaining</p>
        </div>
        <div className="h-28 mt-10">
          <OrderLoader />
        </div>
      </div>
    </div>
  );
}

export default Logged;
