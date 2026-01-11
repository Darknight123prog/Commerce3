import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchUser = async () => {
    try {
      const res = await axios.get(`/api/v1/me`, {
        withCredentials: true,
      });
      console.log("here is the data from the google auth",res.data);

      setUser(res.data.user);
      setCart(res.data.user.cart || []);
    } catch (err) {
      setUser(null);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetcher=async()=>{
await fetchUser();
    }
    fetcher();
    
  }, [setUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        cart,
        loading,
        setLoading,
        fetchUser, 
        setUser,
        setCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
