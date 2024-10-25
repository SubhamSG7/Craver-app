import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OrderLoader from "../Loaders/OrderLoader";

function Logged() {
  const { loggedUser } = useSelector((state) => state.users);
  const { name } = loggedUser;
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(3);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (seconds > 0) {
        setIsAnimating(true); 
        setTimeout(() => {
          setSeconds((prev) => prev - 1);
          setIsAnimating(false); 
        }, 300); 
      }else {
        navigate("/")
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds, navigate]);

  return (
    <div className="flex items-center justify-center min-h-[70vh] ">
      <div className="flex flex-col items-center justify-center h-auto w-full max-w-md  p-8 rounded-lg shadow-2xl shadow-blue-gray-800 text-center">
        <h1 className="text-3xl font-bold font-serif mb-6 text-white">
          Hello, {name.toUpperCase()}!
        </h1>
        <p className="mb-4 text-4xl text-black">Welcome to Craver</p>
        <div className="flex flex-col items-center">
          <span
            className={`text-9xl text-black font-extrabold transition-transform duration-300 ${
              isAnimating ? "transform scale-150 opacity-0" : "opacity-100"
            }`}
          >
            {seconds}
          </span>
          <p className="text-xl text-black mt-2">Seconds Remaining</p>
        </div>
        <div className="h-28 mt-10">
          <OrderLoader />
        </div>
      </div>
    </div>
  );
}

export default Logged;
