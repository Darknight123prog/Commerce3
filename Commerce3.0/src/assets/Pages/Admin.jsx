import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';
import GoogleLogin from './GoogleLogin';
import GitHub from './GitHub';
import { showSuccess, showWarning } from '../../Utils/Toast';
import MainAdminPannel from './MainAdminPannel';
import { useEffect } from 'react';

function Admin() {
  const navigate = useNavigate();
  const { setLoading, user, setUser } = useAuth();

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission

useEffect(()=>{
  if(!user || user.role==='user'){
    showWarning('Only admin can access this resource')
  }
},[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8568/api/v1/signin', form);
      const userData = response.data.details;

      setUser(userData);

      if (userData.role === 'admin') {
        
       showSuccess('Redirecting to admin dashboard...')
    return <div className="text-center  text-gray-700">{<MainAdminPannel/>}</div>;
      } else {
        showWarning('You are not an admin. Only Admin can access this panel.');
      }
      if(userData.role === 'user'){
        showWarning('user cannot access these controls');
      }
    } catch (err) {
      console.error(err);
      showWarning('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

 
  if (user && user.role === 'admin') {
   
    showSuccess('Redirecting to admin dashboard...')
    return <div className="text-center  text-gray-700">{<MainAdminPannel/>}</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('https://res.cloudinary.com/djgboajkm/image/upload/f_auto/Tiny_people_carrying_key_to_open_padlock_grnd9p')] bg-cover bg-center px-4 sm:px-6">
      <div className="w-full max-w-sm sm:max-w-md bg-[#98d5f3]/40 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <img
            className="h-16 w-16 sm:h-20 sm:w-20  border-b-cyan-300 shadow-2xl border-2 rounded-full mb-3"
            src="https://res.cloudinary.com/djgboajkm/image/upload/f_auto/GE_logo_rfdojk.svg"
            alt="Logo"
          />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Admin Pannel LogIn</h2>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">to get started</p>
        </div>

        {/* Google Signup */}
        <div className="mb-5 bg-white rounded-xl">
          <GoogleLogin />
        </div>

        {/* Optional GitHub Login */}
        {/* <div className="mb-5 bg-white rounded-xl">
          <GitHub />
        </div> */}

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
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email address"
            className="w-full px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
          />
          <button
            type="submit"
            className="w-full py-2.5 sm:py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition text-sm sm:text-base"
          >
            Log In
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs sm:text-sm text-gray-600 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-600 font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Admin;
