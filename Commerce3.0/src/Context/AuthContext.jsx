import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const fetchuser=async()=>{
      const res=await axios
      .get("http://localhost:8568/api/v1/me", {
        withCredentials: true
      })
      console.log("after the ",res.data.user);
      console.log()
        setUser(res.data.user);
        setLoading(false)
    }
    fetchuser();
  
  }
  , []);
 

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
