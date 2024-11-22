import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleStaffStatusChange,
  setRestaurantData,
  setStaffData,
  setStatus,
} from "../Slices/apiStatusSlice";
import PageLoaders from "../Loaders/PageLoaders";
import { checkDefault } from "../Handlers/CheckDefault";
import { updateStaff } from "../Api/AdminApi";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";

function AssignRole() {
  const { status, staffData, restaurantData } = useSelector(
    (state) => state.loader
  );
  const dispatch = useDispatch();
  const url = import.meta.env.VITE_BACKEND_API;
  async function fetchRoleToAssign() {
    try {
      const resp = await axios.get(`${url}/api/admin/assignstaff`, {
        withCredentials: true,
      });
      console.log(resp.data);
      if (resp) {
        dispatch(setStaffData(resp?.data?.staffData));
        dispatch(setRestaurantData(resp?.data?.restaurantlist));
      }
    } catch (error) {
      console.error(error);
      console.log(error.message);
      dispatch(setStatus(error?.message || "An error occurred"));
    }
  }

  function handleChange(e, type, staff_id) {
    dispatch(
      handleStaffStatusChange({
        _id: staff_id,
        type,
        restaurant_id: e.target.value,
      })
    );
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
      <div className="h-[70vh] flex justify-center items-center">
        <PageLoaders />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="text-red-500 text-center">
        Error loading data. Please try again later.
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen font-sans">
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Assign Roles to Staff
      </h2>
      <div className="flex flex-wrap gap-8 justify-evenly">
        {staffData && staffData.length > 0 ? (
          staffData.map((staff) => (
            <div
              key={staff._id}
              className="bg-white rounded-lg p-6 shadow-md w-[300px] h-[320px] flex flex-col justify-between hover:shadow-lg transition duration-300"
            >
              <div className="mb-4">
                <p className="text-lg text-gray-700 font-semibold mb-1">
                  Name: <span className="font-normal">{staff.name}</span>
                </p>
                <p className="text-lg text-gray-700 font-semibold mb-1">
                  Email: <span className="font-normal">{staff.email}</span>
                </p>
                <p className="text-lg text-gray-700 font-semibold mb-4">
                  Restaurant:{" "}
                  <span className="font-normal">
                    {staff.restaurant || "N/A"}
                  </span>
                </p>
                <h5 className="text-lg font-medium text-gray-600 mb-2 flex items-center gap-2">
                  <MdRestaurantMenu className="text-gray-600" /> Assign A
                  Restaurant:
                </h5>
                <select
                  defaultValue={checkDefault(
                    staff.restaurant,
                    restaurantData,
                    "_id"
                  )}
                  onChange={(e) => handleChange(e, "restaurant", staff._id)}
                  className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
                >
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
              </div>
              <button
                className={`w-full border-b-2 text-lg font-medium ${
                  staff.approved
                    ? "text-green-600 border-green-600"
                    : "text-red-600 border-red-600"
                } flex items-center justify-center gap-2 py-2 transition duration-300 hover:border-blue-500 hover:text-blue-600`}
                onClick={() => handleApproval(staff._id, "approval")}
              >
                {staff.approved ? <FaCheckCircle /> : <FaExclamationCircle />}
                {staff.approved ? "Approved" : "Not Approved"}
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No staff data available.</p>
        )}
      </div>
      <div className="flex justify-center mt-10">
        <button
          onClick={handleApplyChanges}
          className="text-lg border-b-2 border-gray-400 pb-1 text-gray-700 font-semibold hover:border-blue-500 hover:text-blue-600 transition duration-300 ease-in-out"
        >
          Apply Changes
        </button>
      </div>
    </div>
  );
}

export default AssignRole;
