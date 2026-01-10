import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { useAuth } from "../Context/AuthContext";
import { showSuccess, showError } from "../Utils/Toast";
import axios from "axios";
import { MdOutlineShoppingCart } from "react-icons/md";

function NavBar() {
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const { user, setUser, cart } = useAuth();
 const backendUrl=import.meta.env.VITE_BACKEND_URL;

  const handleLogout = async () => {
    try {
      await axios.post(
        `${backendUrl}/api/v1/user/signout`,
        {},
        { withCredentials: true }
      );
      setUser(null);
      setMenu(false);
      showSuccess("Logged out successfully");
      navigate("/");
    } catch (err) {
      showError(err.response?.data?.message || "Logout failed");
    }
  };

  const handleLogin = () => {
    showSuccess("Redirecting to SignUp / Login");
    setMenu(false);
    navigate("/register");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (search.trim()) {
      
      navigate(`/product?keyword=${encodeURIComponent(search)}`);
      return;
    } else {
      navigate("/product");
      return;
    }
  };

  return (
    <header className="bg-white shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2">

          {/* Logo */}
          <Link to="/">
            <img
            loading="lazy"  
              src="https://res.cloudinary.com/djgboajkm/image/upload/q_auto,f_auto/v1767896712/Achora_vgxybh.png"
              alt="GE Logo"
              className="w-20 sm:w-24 h-auto"
            />
          </Link>

          {/* Search */}
          <form onSubmit={submitHandler} className="flex gap-1 flex-1 max-w-xs md:max-w-md lg:max-w-lg mx-4">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-2 w-full rounded-md p-1 hover:border-cyan-600 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              placeholder="Search..."
              type="text"
            />
            <button type="submit">
              <IoMdSearch className="mt-1 ml-1" size={20} />
            </button>
          </form>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-4 text-sm font-medium items-center">
            <Link to="/" className="text-gray-700 hover:text-purple-700">Home</Link>
            <Link to="/product" className="text-gray-700 hover:text-purple-700">Product</Link>
            <Link to="/about" className="text-gray-700 hover:text-purple-700">About</Link>
            <Link to="/auth/admin" className="text-gray-700 hover:text-purple-700">Admin Panel</Link>
            <Link to="/devloperInfo" className="text-gray-700 hover:text-purple-700">Developer Info</Link>

            {user ? (
              <button type="button" onClick={handleLogout} className="px-3 py-1 bg-black text-white rounded hover:bg-red-600">LogOut</button>
            ) : (
              <button type="button" onClick={handleLogin} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">LogIn / SignUp</button>
            )}
          </nav>

          {/* Profile & Cart */}
          {user && (
            <div className=" flex items-center  ml-3 gap-3">
              <Link to="/Userauth/profile">
                <img
                loading="lazy"  
                  className="rounded-full h-8 w-8 object-cover"
                  src={user?.avator?.url || "https://res.cloudinary.com/djgboajkm/image/upload/f_auto/7ae28c97-cb1f-4d1d-b74c-4db76b2081ad_w1kalp"}
                  alt="profile"
                />
              </Link>
              <Link to="/Cart/details" className=" mr-1 relative">
                <MdOutlineShoppingCart size={24} />
                <span className="absolute -top-2 -right-2 h-4 w-4 border-2 border-black bg-white rounded-full flex items-center justify-center text-black text-xs font-bold">
                  {cart.length}
                </span>
              </Link>
            </div>
          )}

          {/* Mobile Icon */}
          <div className="md:hidden text-2xl">
            {menu ? (
              <IoClose onClick={() => setMenu(false)} />
            ) : (
              <GiHamburgerMenu onClick={() => setMenu(true)} />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white shadow-md z-50 overflow-hidden transition-all duration-300 ${menu ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <ul className="flex flex-col gap-3 py-4 px-6 text-sm font-medium">
          <li><Link to="/" onClick={() => setMenu(false)}>Home</Link></li>
          <li><Link to="/product" onClick={() => setMenu(false)}>Product</Link></li>
          <li><Link to="/about" onClick={() => setMenu(false)}>About</Link></li>
          <li><Link to="/auth/admin" onClick={() => setMenu(false)}>Admin Panel</Link></li>
          <li><Link to="/devloperInfo" onClick={() => setMenu(false)}>Developer Info</Link></li>
          <li>
            {user ? (
              <button type="button" onClick={handleLogout} className="w-full py-1 bg-black text-white rounded">LogOut</button>
            ) : (
              <button type="button" onClick={handleLogin} className="w-full py-1 bg-blue-500 text-white rounded hover:bg-blue-600">LogIn / SignUp</button>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}

export default NavBar;
