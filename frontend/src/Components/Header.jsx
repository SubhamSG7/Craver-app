import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { useSelector } from "react-redux";

function Header() {
  const location = useLocation();
  const role=localStorage.getItem("role");

  const roleBased = {
    admin: ['home', 'addrestaurant', 'assignrole', 'profile'],
    user: ['home', 'orders', 'cart', 'profile'],
    staff: ['home', 'addcuisine', 'editcuisine', 'trackorders', 'profile'],
  };

  const getButtonStyle = (locate) => {
    return location.pathname === locate
      ? "bg-[#f77f00]" 
      : "bg-[#d6bcbd]";
  };

  return (
    <header className="bg-[#AB886D] rounded text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <img className="w-20 h-14 rounded" src={logo} alt="Logo" />
        <nav>
          {role ? (
            <ul className="flex space-x-4">
              {roleBased[role]?.map((val) => (
                <li key={val}>
                  <Link to={`/${val==="home"?'':val}`}>
                    <button className={`py-2 px-4 rounded text-white hover:bg-[#c7a4a4] transition-colors duration-300 ${getButtonStyle(`/${val==="home"?'':val}`)}`}>
                      {val.charAt(0).toUpperCase() + val.slice(1)} 
                    </button>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="flex space-x-4">
              <li>
                <Link to="/">
                  <button className={`py-2 px-4 rounded text-white hover:bg-[#c7a4a4] transition-colors duration-300 ${getButtonStyle("/")}`}>
                    Home
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/orders">
                  <button className={`py-2 px-4 rounded text-white hover:bg-[#aec4e4] transition-colors duration-300 ${getButtonStyle("/orders")}`}>
                    Orders
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/cart">
                  <button className={`py-2 px-4 rounded text-white hover:bg-[#b6dd3b] transition-colors duration-300 ${getButtonStyle("/cart")}`}>
                    Cart
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/login">
                  <button className={`py-2 px-4 rounded text-[#2c3e50] hover:bg-[#dbe4f5] transition-colors duration-300 ${getButtonStyle("/login")}`}>
                    Login
                  </button>
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
