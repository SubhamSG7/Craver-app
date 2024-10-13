import { useDispatch, useSelector } from "react-redux";
import {
  checkValidation,
  loginUser,
  updateUserField,
} from "../Slices/usersSlice";
import ButtonLoader from "../Loaders/ButtonLoader";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function UserLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData, validationErr, loginStatus, loginError } = useSelector(
    (state) => state.users
  );
  function handleLogin(e) {
    e.preventDefault();
    const data = { email: userData.email, password: userData.password };
    const isValidForm = !Object.values(validationErr).some((err) => err !== "");
    if (isValidForm) {
      dispatch(loginUser(data));
    }
  }
  function handleValidation(e) {
    dispatch(checkValidation(e.target.name));
  }
  useEffect(() => {
    if (loginStatus === "succeeded") {
      navigate("/");
    }
  }, [navigate, loginStatus]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Login to Your Account
        </h2>
        {loginStatus === "failed" && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {loginError.msg}.</span>
          </div>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              onChange={(e) =>
                dispatch(
                  updateUserField({
                    field: e.target.name,
                    value: e.target.value,
                  })
                )
              }
              onBlur={(e) => handleValidation(e)}
            />
            {validationErr.email && (
              <p className="text-red-500 text-sm">{validationErr.email}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              onChange={(e) =>
                dispatch(
                  updateUserField({
                    field: e.target.name,
                    value: e.target.value,
                  })
                )
              }
              onBlur={(e) => handleValidation(e)}
            />
            {validationErr.password && (
              <p className="text-red-500 text-sm">{validationErr.password}</p>
            )}
          </div>

          <div className="mb-6 flex items-center justify-between">
            <div>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-gray-600">Remember me</span>
              </label>
            </div>
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loginStatus === "loading" ? <ButtonLoader /> : "Signin"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?
          <a href="#" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default UserLogin;
