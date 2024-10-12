import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Wrapper from "../Components/Wrapper";
import Home from "../Pages/Home";
import SignIn from "../Pages/SignIn";
import Login from "../Pages/Login";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "*",
    element: <h1>Sorry Page Not found</h1>,
  },
]);

export const AllRoutes = ({ children }) => {
  return <RouterProvider router={route}>{children}</RouterProvider>;
};
