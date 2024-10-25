import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

function Wrapper() {
  return (
    <div className="w-[100%]">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Wrapper;
