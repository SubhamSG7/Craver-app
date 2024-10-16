import React from "react";
import { useSelector } from "react-redux";
import { LogOut } from "../Api/LogoutApi";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi"; // Import logout icon

function Profile() {
  const navigate = useNavigate();
  const { loggedUser } = useSelector((state) => state.users);

  async function handleLogout() {
    const resp = await LogOut();
    if (resp?.message === "Logout successful") {
      localStorage.removeItem("role");
      navigate("/");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500">
      <div className="bg-gradient-to-b from-white to-gray-100 p-8 rounded-xl shadow-2xl max-w-md w-full text-center transform transition-transform hover:scale-105">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">
          Welcome, {loggedUser?.scope}
        </h2>
        <img
          src="https://png.pngtree.com/thumb_back/fh260/background/20230613/pngtree-cartoon-image-of-a-person-wearing-sunglasses-image_2875331.jpg"
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mb-6 object-cover shadow-lg border-4 border-gray-300"
        />
        <p className="text-xl font-semibold text-gray-700 mb-1">
          {loggedUser?.name.toUpperCase()}
        </p>
        <p className="text-gray-500 mb-6">{loggedUser?.email}</p>
        <button
          className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 px-6 rounded-full text-lg font-medium hover:bg-gradient-to-l hover:from-indigo-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg"
          onClick={handleLogout}
        >
          <FiLogOut className="text-xl" /> Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
