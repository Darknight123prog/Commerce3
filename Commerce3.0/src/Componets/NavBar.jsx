import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { useAuth } from "../Context/AuthContext";

import { showSuccess, showError } from "../Utils/Toast";
import axios from "axios";

function NavBar() {
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8568/api/v1/signout",
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
    } else {
      navigate("/product");
    }
  };

  return (
    <header className="bg-white shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2">
          
          {/* Logo */}
          <Link to="/">
            <img
              src="https://res.cloudinary.com/djgboajkm/image/upload/f_auto/GE_logo_rfdojk.svg"
              alt="GE Logo"
              className="w-20 sm:w-24 h-auto"
            />
          </Link>

          {/* Search */}
          <form onSubmit={submitHandler} className="flex gap-1">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-2 rounded-md p-1 hover:border-cyan-600"
              placeholder="Search..."
              type="text"
            />
            <button type="submit">
              <IoMdSearch className="mt-1 ml-2" size={22} />
            </button>
          </form>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-4 text-sm font-medium items-center">
            <Link to="/" className="text-gray-700 hover:text-purple-700">
              Home
            </Link>
            <Link to="/product" className="text-gray-700 hover:text-purple-700">
              Product
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-purple-700">
              About
            </Link>
            <Link
              to="/auth/admin"
              className="text-gray-700 hover:text-purple-700"
            >
              Admin Pannel
            </Link>
            <Link
              to="/devloperInfo"
              className="text-gray-700 hover:text-purple-700"
            >
              Developer Info
            </Link>

            

            {user ? (
              <button type="button" onClick={handleLogout}>
                LogOut
              </button>
            ) : (
              <button type="button" onClick={handleLogin}>
                LogIn / SignUp
              </button>
            )}
          </nav>
          <div  >
          {user && (
              <Link to="/Userauth/profile">
                <img
                  className="rounded-full h-10 w-10 object-cover"
                  src={
                    user?.avator?.url ||
                    "https://res.cloudinary.com/djgboajkm/image/upload/f_auto/7ae28c97-cb1f-4d1d-b74c-4db76b2081ad_w1kalp"
                  }
                  alt="profile"
                />
              </Link>
            )}
            </div>

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
        className={`
          md:hidden absolute top-full left-0 w-full bg-white shadow-md z-50
          overflow-hidden transition-all duration-300
          ${menu ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <ul className="flex flex-col gap-3 py-4 px-6 text-sm font-medium">
          <li>
            <Link to="/" onClick={() => setMenu(false)}>Home</Link>
          </li>
          <li>
            <Link to="/product" onClick={() => setMenu(false)}>Product</Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setMenu(false)}>About</Link>
          </li>
          <li>
            <Link to="/auth/admin" onClick={() => setMenu(false)}>
             Admin Pannel
            </Link>
          </li>
          <li>
            <Link to="/devloperInfo" onClick={() => setMenu(false)}>
              Developer Info
            </Link>
          </li>
          <li>
            {user ? (
              <button type="button" onClick={handleLogout}>
                LogOut
              </button>
            ) : (
              <button type="button" onClick={handleLogin}>
                LogIn / SignUp
              </button>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}

export default NavBar;
