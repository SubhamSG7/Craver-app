import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Wrapper from "../Components/Wrapper";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Signup from "../Pages/SignIn";
import UserLogin from "../Pages/UserLogin";
import UserSignIn from "../Pages/userSignIn";
import SignUpStaff from "../Components/SignUpStaff";
import LoginStaff from "../Components/LoginStaff";
import StaffHome from "../Components/StaffHome";
import AdminHome from "../Components/AdminHome";
import PrivateRoute from "../Components/PrivateRoute";
import AddRestaurant from "../Components/AddRestaurant";
import { fetchRestaurants } from "./LoaderApi";
import Orders from "../Pages/Orders";
import Cart from "../Pages/Cart";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper />,
    children: [
      { index: true, element: <Home />, loader: fetchRestaurants },
      { path: "signin", element: <Signup /> },
      { path: "login", element: <Login /> },
      { path: "userlogin", element: <UserLogin /> },
      { path: "usersignup", element: <UserSignIn /> },
      { path: "staffsignup", element: <SignUpStaff /> },
      { path: "stafflogin", element: <LoginStaff /> },
      { path: "staffHome", element: <StaffHome /> },
      { path: "orders", element: <Orders /> },
      { path: "cart", element: <Cart /> },
      {
        path: "adminHome",
        element: (
          <PrivateRoute>
            <AdminHome />
          </PrivateRoute>
        ),
      },
      {
        path: "addrestaurant",
        element: <AddRestaurant />,
      },
    ],
  },
  { path: "*", element: <h1>Sorry, Page Not Found</h1> },
]);

export const AllRoutes = () => {
  return <RouterProvider router={routes} />;
};
