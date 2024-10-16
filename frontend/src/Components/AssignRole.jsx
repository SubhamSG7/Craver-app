import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleStaffStatusChange, setRestaurantData, setStaffData, setStatus } from '../Slices/apiStatusSlice';
import PageLoaders from '../Loaders/PageLoaders';
import { checkDefault } from '../Handlers/CheckDefault';
import { updateStaff } from '../Api/AdminApi';

function AssignRole() {
  const { status, staffData, restaurantData } = useSelector(state => state.loader);
  const dispatch = useDispatch();
  async function fetchRoleToAssign() {
    try {
      const resp = await axios.get("http://localhost:3000/api/admin/assignstaff", { withCredentials: true });
      if (resp) {
        dispatch(setStaffData(resp?.data?.staffData));
        dispatch(setRestaurantData(resp?.data?.restaurantlist));
      }
    } catch (error) {
      console.error(error);
      dispatch(setStatus(error?.message || 'An error occurred'));
    }
  }

  function handleChange(e, type, staff_id) {
    dispatch(handleStaffStatusChange({ _id: staff_id, type, restaurant_id: e.target.value }));
  }

  function handleApproval(_id, type) {
    dispatch(handleStaffStatusChange({ _id, type }));
  }

  function handleApplyChanges() {
    const staffsToUpdate = staffData.map((val) => ({
      restaurant: val.restaurant,
      _id: val._id,
      approved: val.approved,
    }));
    dispatch(updateStaff(staffsToUpdate));
  }

  useEffect(() => {
    fetchRoleToAssign();
  }, []);

  if (status === "loading") {
    return (
      <div className='h-[70vh] flex justify-center items-center'>
        <PageLoaders />
      </div>
    );
  }

  if (status === "error") {
    return <div className="text-red-500 text-center">Error loading data. Please try again later.</div>;
  }

  return (
    <div className="p-6 bg-[#F7FAFC] min-h-screen">
      <h2 className="text-3xl font-bold bg-[#AB886D] text-[#040303] p-4 rounded-md mb-6 text-center font-serif">Assign Roles to Staff</h2>
      <div className="flex flex-wrap  w-[100%] justify-evenly items-start">
        {staffData && staffData.length > 0 ? (
          staffData.map((staff) => (
            <div key={staff._id} className="bg-[#E2E8F0] shadow-lg rounded-lg p-4 w-[300px] h-[250px] transition duration-300 ease-in-out hover:bg-[#2765a8] hover:text-white">
              <p className="font-semibold">Name: <span className="font-normal">{staff.name}</span></p>
              <p className="font-semibold">Email: <span className="font-normal">{staff.email}</span></p>
              <p className="font-semibold">Restaurant: <span className="font-normal">{staff.restaurant}</span></p>
              <h5 className="font-semibold ">Assign A Restaurant:</h5>
              <select defaultValue={checkDefault(staff.restaurant, restaurantData, '_id')}
                onChange={(e) => handleChange(e, 'restaurant', staff._id)}
                className="border border-gray-300 rounded-md p-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-[#2B6CB0] text-black">
                {restaurantData && restaurantData.length > 0 ? (
                  restaurantData.map((restaurant) => (
                    <option key={restaurant._id} value={restaurant._id}>
                      {restaurant.name}
                    </option>
                  ))
                ) : (
                  <option disabled>No options available</option>
                )}
              </select>
              <button
                className={`font-semibold cursor-pointer ${staff.approved ? 'bg-green-500 text-white' : 'bg-red-500 text-white'} rounded-md p-2 transition duration-300 ease-in-out hover:opacity-80 `}
                onClick={() => handleApproval(staff._id, 'approval')}
              >
                {staff.approved ? 'Approved' : 'Not Approved'}
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No staff data available.</p>
        )}
      </div>
      <div className="text-center m-6">
        <button
          onClick={handleApplyChanges}
          className="bg-[#bd800f] text-[#FFFFFF] rounded-md p-3 hover:bg-[#F59E0B] transition duration-300 ease-in-out shadow-lg"
        >
          Apply Changes
        </button>
      </div>
    </div>
  );
}

export default AssignRole;
