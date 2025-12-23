import { useAuth } from "../../Context/AuthContext";

const Profile = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-medium">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h2 className="text-xl font-semibold">Please login</h2>
      </div>
    );
  }

  return (
    <>
     <h2>User Profile</h2>
    <div className="min-h-screen flex items-center justify-center bg-[#7393B3] px-4">
     
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-8 text-center">
        <img
          src={user.avator?.url || "/default-avatar.png"}
          alt="avatar"
          className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-purple-500 object-cover"
        />

        <h2 className="text-2xl font-bold text-gray-800">
          {user.name}
        </h2>

        <p className="text-sm text-gray-500 mt-1 break-words">
          {user.email}
        </p>

        <span className="inline-block mt-4 px-5 py-1 text-sm rounded-full bg-gray-100 text-gray-700">
          {user.role}
        </span>

        <a
          href="http://localhost:8568/api/v1/auth/logout"
          className="block mt-8 py-2 rounded-full bg-red-500 text-white font-medium hover:bg-red-600 transition"
        >
          Logout
        </a>
      </div>
    </div>
    </>
  );
};

export default Profile;
