import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const location = useLocation();
  const role = localStorage.getItem("role");
  const { cartList } = useSelector((state) => state.cart);
  const length = Object.keys(cartList).length;

  const roleBased = {
    admin: ["home", "addrestaurant", "assignrole", "profile"],
    user: ["home", "orders", "cart", "profile"],
    staff: ["home", "addcategory", "trackorders", "profile"],
  };

  const getButtonStyle = (locate) => {
    return location.pathname === locate
      ? "bg-[#3d9e43] text-white"
      : "bg-[#d6bcbd] text-gray-800";
  };

  return (
    <header className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-b-lg text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center h-full flex-wrap">
        <div className="flex items-center">
          <img
            className="w-20 h-14 rounded-md shadow-lg transition-transform transform hover:scale-105 mr-4"  // Added shadow-lg class here
            src="https://www.cravercorp.com/images/craver_logo_new.png"
            alt="Logo"
          />
        </div>
        <nav className="ml-auto">
          <ul className="flex flex-wrap space-x-4">
            {role ? (
              roleBased[role]?.map((val) => (
                <li key={val}>
                  <Link to={`/${val === "home" ? "" : val}`}>
                    <button
                      className={`py-2 px-4 rounded-lg text-lg font-semibold transition-colors duration-300 flex items-center justify-center ${getButtonStyle(
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
                <li>
                  <Link to="/">
                    <button
                      className={`py-2 px-4 rounded-lg text-lg font-semibold transition-colors duration-300 ${getButtonStyle(
                        "/"
                      )}`}
                    >
                      Home
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="/orders">
                    <button
                      className={`py-2 px-4 rounded-lg text-lg font-semibold transition-colors duration-300 ${getButtonStyle(
                        "/orders"
                      )}`}
                    >
                      Orders
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="/cart">
                    <button
                      className={`py-2 px-4 rounded-lg text-lg font-semibold transition-colors duration-300 ${getButtonStyle(
                        "/cart"
                      )}`}
                    >
                      🛒 Cart
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="/login">
                    <button
                      className={`py-2 px-4 rounded-lg text-lg font-semibold transition-colors duration-300 ${getButtonStyle(
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
      </div>
    </header>
  );
}

export default Header;
