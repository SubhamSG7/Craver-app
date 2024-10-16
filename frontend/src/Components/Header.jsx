import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { useSelector } from "react-redux";

function Header() {
  const location = useLocation();
  const role = localStorage.getItem("role");
  const { cartList } = useSelector(state => state.cart);
  const length = Object.keys(cartList).length;
  
  const roleBased = {
    admin: ['home', 'addrestaurant', 'assignrole', 'profile'],
    user: ['home', 'orders', `cart(${length})`, 'profile'],
    staff: ['home', 'addcategory', 'editcuisine', 'trackorders', 'profile'],
  };

  const getButtonStyle = (locate) => {
    return location.pathname === locate ? "bg-[#40a62e]" : "bg-[#d6bcbd]";
  };

  return (
    <header className="bg-[#4045d3] rounded text-white p-4 shadow-md h-[15vh]">
      <div className="container mx-auto flex justify-between items-center h-full">
        <img className="w-20 h-14 rounded" src={logo} alt="Logo" />
        <nav className="ml-auto">
          <ul className="flex space-x-4">
            {role ? (
              roleBased[role]?.map((val) => (
                <li key={val}>
                  <Link to={`/${val === "home" ? '' : val}`}>
                    <button className={`py-2 px-4 rounded text-2xl text-white hover:bg-[#e68926] transition-colors duration-300 ${getButtonStyle(`/${val === "home" ? '' : val}`)}`}>
                      {val.charAt(0).toUpperCase() + val.slice(1)}
                    </button>
                  </Link>
                </li>
              ))
            ) : (
              <>
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
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
