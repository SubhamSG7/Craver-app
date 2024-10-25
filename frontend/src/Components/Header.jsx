import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import logo from "../assets/logo.png"

function Header() {
  const location = useLocation();
  const role = localStorage.getItem("role");
  const { cartList } = useSelector((state) => state.cart);
  const length = Object.keys(cartList).length;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const roleBased = {
    admin: ["home", "addrestaurant", "assignrole", "profile"],
    user: ["home", "orders", "cart", "profile"],
    staff: ["home", "addcategory", "trackorders", "profile"],
  };

  const getButtonStyle = (locate) => {
    return location.pathname === locate
      ? "text-black"
      : "text-white";
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-blue-gray-900 px-6 custom-md:px-10 to-gray-600 h-auto custom-md:h-[12vh] text-white shadow-lg w-full flex flex-col custom-md:flex-row justify-between items-center py-4 custom-md:py-0">
      <div className="flex items-center justify-between w-full custom-md:w-auto">
        <img
          className="w-60 h-24 rounded-md shadow-lg transition-transform transform hover:scale-105 mr-4"
          src={logo}
          alt="Logo"
        />
        <button
          className="custom-md:hidden text-white text-3xl"
          onClick={toggleMenu}
        >
          ☰
        </button>
      </div>

      <nav className={`w-full custom-md:w-auto ${isMenuOpen ? "block" : "hidden"} custom-md:flex`}>
        <ul className="m-3 flex flex-col gap-3 custom-md:flex-row items-center justify-center custom-md:space-x-4 space-y-2 custom-md:space-y-0">
          {role ? (
            roleBased[role]?.map((val) => (
              <li key={val} className="w-full custom-md:w-auto text-center">
                <Link to={`/${val === "home" ? "" : val}`}>
                  <button
                    className={`w-full custom-md:w-auto  rounded-lg text-lg custom-md:text-xl font-extrabold font-sans transition-colors duration-300 ${getButtonStyle(
                      `/${val === "home" ? "" : val}`
                    )}`}
                  >
                    {val === "cart"
                      ? `🛒 Cart (${length})`
                      : val.charAt(0).toUpperCase() + val.slice(1)}
                  </button>
                </Link>
              </li>
            ))
          ) : (
            <>
              <li className="w-full custom-md:w-auto text-center">
                <Link to="/">
                  <button
                    className={`w-full custom-md:w-auto py-3 px-6 rounded-lg text-lg custom-md:text-xl font-extrabold font-sans transition-colors duration-300 ${getButtonStyle(
                      "/"
                    )}`}
                  >
                    Home
                  </button>
                </Link>
              </li>
              <li className="w-full custom-md:w-auto text-center">
                <Link to="/orders">
                  <button
                    className={`w-full custom-md:w-auto py-3 px-6 rounded-lg text-lg custom-md:text-xl font-extrabold font-sans transition-colors duration-300 ${getButtonStyle(
                      "/orders"
                    )}`}
                  >
                    Orders
                  </button>
                </Link>
              </li>
              <li className="w-full custom-md:w-auto text-center">
                <Link to="/cart">
                  <button
                    className={`w-full custom-md:w-auto py-3 px-6 rounded-lg text-lg custom-md:text-xl font-extrabold font-sans transition-colors duration-300 ${getButtonStyle(
                      "/cart"
                    )}`}
                  >
                    🛒 Cart
                  </button>
                </Link>
              </li>
              <li className="w-full custom-md:w-auto text-center">
                <Link to="/login">
                  <button
                    className={`w-full custom-md:w-auto py-3 px-6 rounded-lg text-lg custom-md:text-xl font-extrabold font-sans transition-colors duration-300 ${getButtonStyle(
                      "/login"
                    )}`}
                  >
                    Login
                  </button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
