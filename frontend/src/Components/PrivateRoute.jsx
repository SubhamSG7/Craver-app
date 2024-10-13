import axios from "axios";
import React, { useEffect } from "react";

function PrivateRoute({ children }) {
  async function checkAuth() {
    try {
      const res = await axios.get("http://localhost:3000/api/scope/admin", {
        withCredentials: true,
      });
      console.log(res.data);
    } catch (error) {
      console.log("Not authenticated");
    } finally {
    }
  }
  useEffect(() => {
    checkAuth();
  }, []);
  return <>{children}</>;
}

export default PrivateRoute;
