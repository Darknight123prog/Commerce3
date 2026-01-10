import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';
import { showSuccess, showWarning } from '../../Utils/Toast';

const GoogleLogin = lazy(() => import('./GoogleLogin'));
const MainAdminPannel = lazy(() => import('./MainAdminPannel'));
const Spiner = lazy(() => import('@/Componets/Spiner'));

function Admin() {
  const { setLoading, user, setUser } = useAuth();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [showAdminPanel, setShowAdminPanel] = useState(false);

  
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const backendUrl=import.meta.env.VITE_BACKEND_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/v1/user/signin`,
        form
      );

      const userData = data.details;
      setUser(userData);

      if (userData.role === 'admin') {
        showSuccess('Redirecting to admin dashboard...');
        setShowAdminPanel(true);
      } else {
        showWarning('Only admin can access this panel');
      }
    } catch (error) {
      console.error(error);
      showWarning('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

 
  useEffect(() => {
    if (user?.role === 'admin') {
      setShowAdminPanel(true);
    }
  }, [user]);

  /* admin view ------------------ */
  if (showAdminPanel) {
    return (
      <Suspense fallback={<Spiner />}>
        <MainAdminPannel />
      </Suspense>
    );
  }


  return (
    <Suspense fallback={<Spiner />}>
      <div className="min-h-screen flex items-center justify-center bg-[url('https://res.cloudinary.com/djgboajkm/image/upload/f_auto/Tiny_people_carrying_key_to_open_padlock_grnd9p')] bg-cover bg-center px-4 sm:px-6">
        <div className="w-full max-w-sm sm:max-w-md bg-[#98d5f3]/40 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8">
          {/* Header */}
          <div className="flex flex-col items-center mb-6">
            <img
              loading="lazy"
              className="h-16 w-16 sm:h-20 sm:w-20 border-2 rounded-full mb-3 shadow-2xl"
              src="https://res.cloudinary.com/djgboajkm/image/upload/q_auto,f_auto/v1767896712/Achora_vgxybh.png"
              alt="Logo"
            />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Admin Panel Login
            </h2>
            <p className="text-gray-500 mt-1 text-sm sm:text-base">
              to get started
            </p>
          </div>

          {/* Google Login */}
          <div className="mb-5 bg-white rounded-xl">
            <GoogleLogin />
          </div>

          {/* Divider */}
          <div className="flex items-center my-5">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="px-3 text-gray-400 text-xs sm:text-sm">
              OR
            </span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email address"
              className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Log In
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-indigo-600 font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </Suspense>
  );
}

export default Admin;
