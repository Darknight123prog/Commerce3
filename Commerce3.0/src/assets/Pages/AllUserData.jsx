
import Profile from '@/Componets/Profile';
import { useAuth } from '@/Context/AuthContext';
import { showError, showWarning } from '@/Utils/Toast';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';

function AllUserData() {
    const backendUrl=import.meta.env.VITE_BACKEND_URL;


  const [allUser,setAllUser]=useState([]);
  const [loading,setLoading]=useState(true);
  const navigate=useNavigate();
  const {user}=useAuth();




  
  useEffect(()=>{
    if(!user ||user.role!=='admin'){
    showWarning('Unauthorized Access');
    navigate('/auth/admin');
    return
  }
  
    const FetchUsers= async()=>{
      try{
      const users=await axios.get(`${backendUrl}/api/v1/products/admin/accesss_to_all_users_admins`,{withCredentials:true});
      setAllUser(users.data.details);
     
     
      }catch(err){
    showError('something went wrong ');


    }finally{
       setLoading(false);
    }
    
  }
  FetchUsers();
  
  },[user,navigate])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <HashLoader color="#77e56e" />
      </div>
    );
  }


  return (
  <div className="w-full min-h-screen bg-[#aaaaaa] px-3 sm:px-6 py-4">
    {/* Page Title */}
    <div className="mb-6 max-w-7xl mx-auto">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
        Registered Users
      </h1>
      <p className="text-xs sm:text-sm text-gray-500 mt-1">
        Information of all non-admin users registered on the site
      </p>
    </div>

    {/* Users Grid */}
    <div
      className="
        max-w-7xl mx-auto
        grid gap-4 sm:gap-6
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
      "
    >
      {allUser.length === 0 ? (
        <p className="text-amber-300 col-span-full text-center">
          No users found
        </p>
      ) : (
        allUser.map((user) => (
          <div
            key={user._id}
            className="
              w-full
             
              text-amber-950
              rounded-xl
              shadow-sm
              
              hover:shadow-md
              transition-transform
            "
          >
            <Profile profile={user}   />
          </div>
        ))
      )}
    </div>
  </div>
);


}

export default AllUserData
