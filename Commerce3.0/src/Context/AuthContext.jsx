import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/v1/me`, {
        withCredentials: true,

        
      });
      console.log("here is the information ");
      console.log(res.data.user);

      if (res.data?.user) {
        setUser(res.data.user);
        setCart(res.data.user.cart || []);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token"); // drop an expired token
      }
      setUser(null);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  fetchUser();
}, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        cart,
        loading,
        setLoading,
        setUser,
        setCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
