import React, { useEffect } from "react";
import {
  checkValidation,
  loginUser,
  setRole,
  updateUserField,
} from "../Slices/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ButtonLoader from "../Loaders/ButtonLoader";

function LoginStaff() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { validationErr, userData, loginStatus, loginError, role } =
    useSelector((state) => state.users);
  function handleLogIn(e) {
    e.preventDefault();
    const data = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: role,
    };
    const isValidForm = !Object.values(validationErr).some((err) => err !== "");
    if (isValidForm) {
      dispatch(loginUser(data));
    }
  }
  useEffect(() => {
    if (loginStatus === "succeeded") {
      navigate(`/${role}Home`);
    }
  }, [loginStatus, navigate]);
  return (
    <div className="flex  flex-col justify-center items-center h-screen">
      {loginStatus === "failed" && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">
            {loginError ? loginError?.msg : ""}.
          </span>
        </div>
      )}
      <form
        className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full"
        onSubmit={handleLogIn}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Select Role
          </label>
          <select
            name="role"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            onChange={(e) => dispatch(setRole(e.target.value))}
          >
            <option value="">Select Role</option>
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            onChange={(e) =>
              dispatch(
                updateUserField({ field: e.target.name, value: e.target.value })
              )
            }
            onBlur={(e) => dispatch(checkValidation(e.target.name))}
          />
          {validationErr.email && (
            <p className="text-red-500 text-sm">{validationErr.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            onChange={(e) =>
              dispatch(
                updateUserField({ field: e.target.name, value: e.target.value })
              )
            }
            onBlur={(e) => dispatch(checkValidation(e.target.name))}
          />
          {validationErr.password && (
            <p className="text-red-500 text-sm">{validationErr.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
        >
          {loginStatus === "loading" ? <ButtonLoader /> : "Login"}
        </button>
      </form>
    </div>
  );
}

export default LoginStaff;
