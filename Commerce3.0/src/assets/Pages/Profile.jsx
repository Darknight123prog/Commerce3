import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { showSuccess, showError } from "../../Utils/Toast";
import axios from "axios";

const Profile = () => {
  const { user, loading, setUser } = useAuth();
  const navigate = useNavigate();
 const backendUrl=import.meta.env.VITE_BACKEND_URL;


  const handleLogout = async () => {
    try {
      await axios.post(
        `${backendUrl}/api/v1/user/signout`,
        {},
        { withCredentials: true }
      );

      setUser(null);
      showSuccess("Logged out successfully");
      navigate("/");
    } catch (err) {
      showError(err.response?.data?.message || "Logout failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-indigo-300">
        <p className="text-lg font-medium animate-pulse">
          Loading profile...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-indigo-300">
        <h2 className="text-xl font-semibold">Please login</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#7393B3] to-[#4f6d9c] px-4">
      
      <h2 className="text-3xl font-bold text-white mb-6 tracking-wide">
        User Profile
      </h2>

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 text-center transition-transform duration-300 hover:scale-105">
        
        <img loading="lazy"  
          src={
            user.avator?.url ||
            "https://res.cloudinary.com/djgboajkm/image/upload/f_auto/7ae28c97-cb1f-4d1d-b74c-4db76b2081ad_w1kalp"
          }
          alt="avatar"
          className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-indigo-500 object-cover shadow-md"
        />

        <h2 className="text-2xl font-bold text-gray-800 mt-2">
          {user.name}
        </h2>

        <p className="text-sm text-gray-500 mt-1 break-words">
          {user.email}
        </p>

        <span className="inline-block mt-4 px-6 py-1 text-sm font-medium rounded-full bg-indigo-100 text-indigo-700">
          {user.role}
        </span>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-6 w-full py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition duration-200"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
