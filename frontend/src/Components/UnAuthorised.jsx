import React from 'react';
import { Link } from 'react-router-dom';

function UnAuthorised() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Unauthorized Access</h1>
        <p className="text-gray-700 mb-6">
          You do not have permission to view this page. Please sign in or log in to continue.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/signin">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Sign In
            </button>
          </Link>
          <Link to="/login">
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UnAuthorised;
