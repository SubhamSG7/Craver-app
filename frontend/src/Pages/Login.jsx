import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const handleSelectChange = (e) => {
    const role = e.target.value;
    navigate(`/${role}login`);
  };

  return (
    <div className="pb-10  bg-gray-100 flex flex-col">
      <div className="flex flex-col items-center mt-2 flex-1 py-4 px-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">
          Select the type of login
        </h2>
        <div className="flex flex-col w-full max-w-xs">
          <select
            onChange={handleSelectChange}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Role</option>
            <option value="staff">Staff</option>
            <option value="user">User</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Login;
