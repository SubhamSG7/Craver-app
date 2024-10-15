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
import PrivateRoute from "../Components/PrivateRoute";
import AddRestaurant from "../Components/AddRestaurant";
import { fetchRestaurants} from "./LoaderApi";
import Orders from "../Pages/Orders";
import Cart from "../Pages/Cart";
import Profile from "../Pages/Profile";
import Logged from "../Components/Logged";
import AssignRole from "../Components/AssignRole";
import Editcuisine from "../Components/Editcuisine";
import TrackOrders from "../Components/TrackOrders";
import AddCategory from "../Components/AddCategory";
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
        path: "logged",
        element: (
          <PrivateRoute>
            <Logged />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "assignrole",
        element: (
          <PrivateRoute>
            <AssignRole />
          </PrivateRoute>
        ),
      },
      {
        path: "addcategory",
        element: (
          <PrivateRoute>
            <AddCategory />
          </PrivateRoute>
        ),
      },
      {
        path: "editcuisine",
        element: (
          <PrivateRoute>
            <Editcuisine />
          </PrivateRoute>
        ),
      },
      {
        path: "trackorders",
        element: (
          <TrackOrders>
            <Editcuisine />
          </TrackOrders>
        ),
      },
      {
        path: "addrestaurant",
        element: <PrivateRoute>
          <AddRestaurant />
        </PrivateRoute>,
      },
    ],
  },
  { path: "*", element: <h1>Sorry, Page Not Found</h1> },
]);

export const AllRoutes = () => {
  return <RouterProvider router={routes} />;
};
