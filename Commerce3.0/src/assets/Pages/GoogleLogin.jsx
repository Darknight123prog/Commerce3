import { FaGoogle } from "react-icons/fa";

const GoogleLogin = () => {
    const backendUrl=import.meta.env.VITE_BACKEND_URL;

  const loginWithGoogle = () => {
    window.open(
      `${backendUrl}/api/v1/auth/google`,
      "_self"
    );
  };

  return (
    <button
      onClick={loginWithGoogle}
      className="w-full flex items-center justify-center gap-3 py-3 px-4 
                 border border-gray-300 rounded-lg 
                 text-gray-700 font-semibold
                 hover:bg-gray-100 transition
                 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      <img loading="lazy"   src="https://res.cloudinary.com/djgboajkm/image/upload/f_auto/google_zbcycw" className=" text-xl h-8"  ></img>
      <span>Continue with Google</span>
    </button>
  );
};

export default GoogleLogin;
