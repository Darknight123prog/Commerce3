import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart,setCart]=useState([]);
 const backendUrl=import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    
    const fetchuser=async()=>{
      const res=await axios
      .get(`${backendUrl}/api/v1/me`, {
        withCredentials: true
      })

  
        setUser(res.data.user);
        setCart(res.data.user.cart);
        setLoading(false)
    }
    fetchuser();
  
  }
  , []);
 

  return (
    <AuthContext.Provider value={{ user, setUser, loading ,setLoading,setCart,cart}}>
      {children}
    </AuthContext.Provider>
  );
};

export const  useAuth = () => useContext(AuthContext);
