import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkValidation,
  setSigninStatus,
  signInUser,
  updateUserField,
} from "../Slices/usersSlice";
import { FiUserPlus } from "react-icons/fi";
import ButtonLoader from "../Loaders/ButtonLoader";
import { useNavigate } from "react-router-dom";

function SignUpStaff() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData, validationErr, signInStatus, signInError } = useSelector(
    (state) => state.users
  );

  function handleSignIn(e) {
    e.preventDefault();
    const data = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: "staff",
    };
    const isValidForm = !Object.values(validationErr).some((err) => err !== "");
    if (isValidForm) {
      dispatch(signInUser(data));
    }
  }

  useEffect(() => {
    if (signInStatus === "succeeded") {
      localStorage.setItem("role", "staff");
      dispatch(setSigninStatus(null));
      navigate(`/stafflogin`);
    }
  }, [signInStatus, navigate]);

  return (
    <div className="flex justify-center items-center h-full">
      <form
        className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full"
        onSubmit={handleSignIn}
      >
        {signInStatus === "failed" && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {signInError.message}.</span>
          </div>
        )}
        <h2 className="text-2xl font-bold mb-6 text-center">Staff Sign Up</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Name</label>
          <input
            type="text"
            name="name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            onChange={(e) =>
              dispatch(
                updateUserField({ field: e.target.name, value: e.target.value })
              )
            }
            onBlur={(e) => dispatch(checkValidation(e.target.name))}
          />
          {validationErr.name && (
            <p className="text-red-500 text-sm">{validationErr.name}</p>
          )}
        </div>
        <div className="mb-4">
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
          className="w-full py-2 border-b-2 border-blue-500 text-blue-500 font-semibold flex items-center justify-center gap-2 hover:bg-blue-50 transition duration-300"
        >
          {signInStatus === "loading" ? (
            <ButtonLoader />
          ) : (
            <>
              <FiUserPlus /> Sign up
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default SignUpStaff;
