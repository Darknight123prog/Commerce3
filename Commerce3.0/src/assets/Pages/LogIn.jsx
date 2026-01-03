import React, { useState } from 'react'
import GoogleLogin from './GoogleLogin'
import { Link ,useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../Context/AuthContext'
import GitHub from './GitHub'

function LogIn() {
  const navigate=useNavigate();
const {setUser,setLoading}=useAuth()
  const [form,setForm]=useState({
    email:"",
    password:""
  })
 const handleChange=(e)=>{
  setForm({...form,[e.target.name]:e.target.value});
 }
 const handleSubmit=async(e)=>{
  e.preventDefault();
  console.log("form datta",form);
  try{
const logedIn=await axios.post('http://localhost:8568/api/v1/signin',form);
setUser(logedIn.data.details)
setLoading(false);
navigate('/');
  }
  catch(err){
    console.error(err);
  }

 }
  return (
    <div className="min-h-screen flex items-center  justify-center bg-[url('https://res.cloudinary.com/djgboajkm/image/upload/f_auto/log_c1i9j1')] bg-cover bg-center px-4 sm:px-6">
      
      <div className="w-full max-w-sm sm:max-w-md bg-[white]/20  backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <img
          loading="lazy"  
            className="h-16 w-16 sm:h-20 sm:w-20 rounded-full  border-b-cyan-300 shadow-2xl border-2  mb-3"
            src="https://res.cloudinary.com/djgboajkm/image/upload/f_auto/GE_logo_rfdojk.svg"
            alt="Logo"
          />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            LogIn your Account
          </h2>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            to get started
          </p>
        </div>

        {/* Google Signup */}
        <div className="mb-5 bg-white rounded-xl">
          <GoogleLogin />
        </div>
        {/* <GitHub/> */}

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-gray-400 text-xs sm:text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Email Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <input
            type="email"
            onChange={(e)=>handleChange(e)}
            placeholder="Email address"
            name='email'
           
            className="w-full px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
          />

          <input
            type="password"
            onChange={(e)=>handleChange(e)}
            name='password'
            placeholder="Password"
            className="w-full px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
          />

          <button
            type="submit"
            className="w-full py-2.5 sm:py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition text-sm sm:text-base"
          >
            Log in
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs sm:text-sm text-gray-600 mt-6">
         Don't have an account?{" "}
          <Link
           to="/register"
            className="text-indigo-600 font-medium hover:underline"
          >
            SignUp
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LogIn
