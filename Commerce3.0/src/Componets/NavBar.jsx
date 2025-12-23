import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { useAuth } from "../Context/AuthContext";
import { IoIosLogOut } from "react-icons/io";
import { CiLogin } from "react-icons/ci";

import { showSuccess, showError } from "../Utils/Toast";
import axios from "axios";
 
function NavBar() {
 
  const [menu, setMenu] = useState(false);
  const [search,setSearch]=useState('');
  
  const navigate=useNavigate();

   const { user,setUser }=useAuth()
  

   
    const HanndleLogOut=async()=>{
      try{
      await axios.post('http://localhost:8568/api/v1/signout',{},{withCredentials:true})
      setUser(null);
      showSuccess("Log Out sucessfully");
      navigate('/');
      }
      catch(err){
        showError(err.message);
      }
    }

    const HanndleLogIn=()=>{
      showSuccess('redirecting to SignUp/logIn page');
      navigate('/register');
    }
  

   

  const   SubmitHandeller=(e)=>{
   e.preventDefault();
  {search.trim()?(navigate(`/product?keyword=${encodeURIComponent(search)}`)):(navigate('/product'))}
  
  }




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

         {/* //adding the search bar here */}
         <form name="keyword" onSubmit={SubmitHandeller}  className="flex gap-1" >
         <input onChange={(e)=>(setSearch(e.target.value))} className="border-2 rounded-md hover:border-cyan-600 hover:border-2 p-1" placeholder="Search...." type="text" name="keyword" />
        <button type="submit"  ><IoMdSearch className="mt-1 ml-3" size={22} /></button>

         </form>
          <nav className="hidden md:flex space-x-4 text-sm font-medium">
            <Link to="/" className="text-gray-700 hover:text-purple-700">Home</Link>
            <Link to="/product" className="text-gray-700 hover:text-purple-700">Product</Link>
            <Link to="/about" className="text-gray-700 hover:text-purple-700">About</Link>
            
            <Link to="/devloperInfo" className="text-gray-700 hover:text-purple-700">
              Developer Info
            </Link>
            {<Link to='/Userauth/profile'>{user?(<img className="rounded-full h-10"  src={user.avator.url}></img>):('')}</Link>}
          </nav>
          <div className="hidden md:flex space-x-4 text-sm font-medium" >{user?(<button type="submit"  onClick={HanndleLogOut} >LogOut</button>):(<button type="submit" onClick={HanndleLogIn} >LogIn/SignUp</button>)}</div>

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

      
      <div
        className={`
          md:hidden absolute top-full left-0 w-full bg-white shadow-md z-50
          overflow-hidden transition-all duration-300 ease-in-out
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
            <div>{user?(<button type="submit"   onClick={HanndleLogOut} >LogOut</button>):(<button type="submit" onClick={HanndleLogIn} >LogIn/SignUp</button>)}</div>
          </li>
          
          <li>
            <Link to="/about" onClick={() => setMenu(false)}>About</Link>
          </li>
          <li>
            <Link to="/devloperInfo" onClick={() => setMenu(false)}>
              Developer Info
            </Link>
          </li>
        </ul>
      </div>

    </header>
  );
}

export default NavBar;
