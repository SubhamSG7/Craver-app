import React from 'react';
import { useSelector } from 'react-redux';
import { LogOut } from '../Api/LogoutApi';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const navigate=useNavigate();
  const { loggedUser } = useSelector(state => state.users);
   async function handleLogout(){
    const resp=await LogOut();
   if(resp?.message==='Logout successful'){
        localStorage.removeItem('role');
        navigate("/")
   }
    }
  return (
    <div className="flex items-center justify-center bg-gray-100 h-[70vh]">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold mb-4">Welcome, {loggedUser?.scope}</h2>
        <img
          src="https://png.pngtree.com/thumb_back/fh260/background/20230613/pngtree-cartoon-image-of-a-person-wearing-sunglasses-image_2875331.jpg"
          alt="Profile"
          className="w-36 h-32 rounded-full mx-auto mb-4 object-cover"
        />
        <p className="text-lg font-medium">{loggedUser?.name.toUpperCase()}</p>
        <p className="text-gray-600">{loggedUser?.email}</p>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
