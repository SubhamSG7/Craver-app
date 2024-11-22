import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedUser } from "../Slices/usersSlice";
import PageLoaders from "../Loaders/PageLoaders";
import UnAuthorised from "./UnAuthorised";
import { useLocation } from "react-router-dom";

function PrivateRoute({ children }) {
  const location = useLocation();
  const accessPath = location.pathname;

  const { loggedUser } = useSelector((state) => state.users);
  const role = localStorage.getItem("role");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  async function checkAuth() {
    const url = import.meta.env.VITE_BACKEND_API;
    try {
      const res = await axios.get(`${url}/api/scope/${role}`, {
        params: { accessPath },
        withCredentials: true,
      });
      const { authorised } = res?.data;
      const { id, scope, name, email } = res.data?.user;
      dispatch(setLoggedUser({ authorised, id, scope, name, email }));
    } catch (error) {
      console.log("Not authenticated");
      dispatch(setLoggedUser({ authorised: false, userid: null }));
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return <PageLoaders />;
  }

  if (!loggedUser.authorised) {
    return <UnAuthorised />;
  }

  return <>{children}</>;
}

export default PrivateRoute;
