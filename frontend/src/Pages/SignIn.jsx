import { useDispatch, useSelector } from "react-redux";
import {
  checkValidation,
  signInUser,
  updateUserField,
} from "../Slices/usersSlice";
import ButtonLoader from "../Loaders/ButtonLoader";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function SignIn() {
  const navigate = useNavigate();
  const { userData, validationErr, signInStatus, signInError } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();

  function handleValidation(e) {
    dispatch(checkValidation(e.target.name));
  }

  function handleSignin(e) {
    e.preventDefault();
    const isValidForm = !Object.values(validationErr).some((err) => err !== "");
    if (isValidForm) {
      dispatch(signInUser(userData));
    }
  }

  useEffect(() => {
    if (signInStatus === "succeeded") {
      navigate("/login");
    }
  }, [signInStatus, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md m-2">
        <h2 className="text-2xl font-bold text-center mb-4">Welcome, Craver</h2>
        {signInStatus === "failed" && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {signInError.message}.</span>
          </div>
        )}
        <form className="space-y-4" onSubmit={handleSignin}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              name="name"
              type="text"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500"
              placeholder="Enter your name"
              onChange={(e) =>
                dispatch(
                  updateUserField({ field: "name", value: e.target.value })
                )
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500"
              placeholder="Enter your email"
              onChange={(e) =>
                dispatch(
                  updateUserField({ field: "email", value: e.target.value })
                )
              }
              onBlur={(e) => handleValidation(e)}
            />
            {validationErr.email && (
              <p className="text-red-500 text-sm">{validationErr.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500"
              placeholder="Enter your password"
              onChange={(e) =>
                dispatch(
                  updateUserField({ field: "password", value: e.target.value })
                )
              }
              onBlur={(e) => handleValidation(e)}
            />
            {validationErr.password && (
              <p className="text-red-500 text-sm">{validationErr.password}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <input
              type="tel"
              name="phone"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500"
              placeholder="Enter your mobile number"
              onChange={(e) =>
                dispatch(
                  updateUserField({ field: "phone", value: e.target.value })
                )
              }
              onBlur={(e) => handleValidation(e)}
            />
            {validationErr.phone && (
              <p className="text-red-500 text-sm">{validationErr.phone}</p>
            )}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              {signInStatus === "loading" ? <ButtonLoader /> : "Signup"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
