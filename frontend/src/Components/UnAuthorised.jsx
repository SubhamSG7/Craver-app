import React from 'react';
import { Link } from 'react-router-dom';

function UnAuthorised() {
  return (
    <div className="flex items-center justify-center h-[70vh] bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Unauthorized Access</h1>
        <p className="text-gray-700 mb-6 font-sans font-bold">
          We’re sorry, but it seems you do not have permission to access this page. 
          If you believe this is an error, please consider.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/signin">
            <button className="px-5 py-3 border-b-2 border-blue-500 text-blue-500 bg-transparent rounded-none transition duration-200 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
              Sign Up
            </button>
          </Link>
          <Link to="/login">
            <button className="px-5 py-3 border-b-2 border-green-500 text-green-500 bg-transparent rounded-none transition duration-200 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UnAuthorised;
