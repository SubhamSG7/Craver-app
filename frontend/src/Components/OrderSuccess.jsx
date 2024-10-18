import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function OrderSuccess() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center transform transition-transform duration-500 hover:scale-105">
        <FaCheckCircle className="text-green-500 text-6xl mb-4 animate-bounce" />
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Thank You!</h1>
        <p className="text-gray-600 mb-4">
          Your order has been placed successfully. Chill and relax!
        </p>
        <blockquote className="italic text-gray-500 mb-6">
          "Good food is the foundation of genuine happiness." - Auguste Escoffier
        </blockquote>
        <div className="flex justify-center space-x-4">
          <Link
            to="/orders"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 transform hover:translate-y-1"
          >
            Check Orders
          </Link>
          <Link
            to="/"
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition duration-300 transform hover:translate-y-1"
          >
            Order Something More
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
