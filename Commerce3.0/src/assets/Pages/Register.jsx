import React, { useEffect, useState } from "react";
import GoogleLogin from "./GoogleLogin";
import { useAuth } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const { user ,setUser} = useAuth();
  const navigate = useNavigate();
  const[form,setForm]=useState({
    name:"",
    email:"",
    password:""
  })
const handleChange=(e)=>{
 setForm({...form,
  [e.target.name]:e.target.value
 })

}
const handleSubmit=(e)=>{
  e.preventDefault();
  const signup=async()=>{
    try{
   const Muser= await axios.post('http://localhost:8568/api/v1/register',form);
  
   setUser(Muser.data.details);
   navigate('/');
    }catch(err){
      console.error(err);
    }

  }
  signup();

}

  useEffect(()=>{

  },[]);

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('https://res.cloudinary.com/djgboajkm/image/upload/f_auto/log_c1i9j1')] bg-cover bg-center px-4 sm:px-6">
      
      <div className="w-full max-w-sm sm:max-w-md bg-[#98d5f3]/90 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <img
            className="h-16 w-16 sm:h-20 sm:w-20 rounded-full mb-3"
            src="https://res.cloudinary.com/djgboajkm/image/upload/f_auto/GE_logo_rfdojk.svg"
            alt="Logo"
          />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Create Account
          </h2>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Sign up to get started
          </p>
        </div>

        {/* Google Signup */}
        <div className="mb-5 bg-white rounded-xl">
          <GoogleLogin />
        </div>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-gray-400 text-xs sm:text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Email Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
          onChange={(e)=>handleChange(e)}
            type="text"
            placeholder="Full Name"
            name="name"
            className="w-full px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
          />

          <input
            type="email"
            onChange={(e)=>handleChange(e)}
            name="email"
            placeholder="Email address"
            className="w-full px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
          />

          <input
            type="password"
            onChange={(e)=>handleChange(e)}
            placeholder="Password"
            name="password"
            className="w-full px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
          />

          <button
            type="submit"
            className="w-full py-2.5 sm:py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition text-sm sm:text-base"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs sm:text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
           to="/login"
            className="text-indigo-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
