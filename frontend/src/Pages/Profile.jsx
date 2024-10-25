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
    <div className="flex items-center justify-center h-[70vh]">
      <div className="bg-gradient-to-b from-white to-gray-100 p-8 rounded-xl shadow-2xl shadow-black max-w-md w-full text-center transform transition-transform hover:scale-105">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">
          Welcome {loggedUser?.scope.toUpperCase()}
        </h2>
        <img
          src="https://png.pngtree.com/thumb_back/fh260/background/20230613/pngtree-cartoon-image-of-a-person-wearing-sunglasses-image_2875331.jpg"
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mb-6 object-cover shadow-lg border-4 border-gray-300"
        />
        <p className="text-2xl font-semibold text-gray-700 mb-1">
          {loggedUser?.name.toUpperCase()}
        </p>
        <p className="text-gray-500 mb-6 text-xl">{loggedUser?.email}</p>
        <button
          className="flex items-center justify-center gap-2 w-full bg-transparent border-b-2 border-red-900 text-gray-900 py-2 px-0 rounded-none text-lg font-medium hover:bg-red-200 transition-all duration-300"
          onClick={handleLogout}
        >
          <FiLogOut className="text-4xl" /> Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
