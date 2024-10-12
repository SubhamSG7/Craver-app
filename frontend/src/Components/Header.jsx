import logo from "../assets/logo.png";

function Header() {
  return (
    <header className="bg-[#7A1CAC] text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <img className="w-20 h-14 rounded" src={logo} alt="Logo" />
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:underline text-[#d6bcbd]">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline text-[#c7daf3]">
                Orders
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline text-[#c8f649]">
                Menu
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline text-[#edf4ff]">
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
