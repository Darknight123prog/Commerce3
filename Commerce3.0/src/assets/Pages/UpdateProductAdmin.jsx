import { useAuth } from '@/Context/AuthContext'
import { showError } from '@/Utils/Toast';
import React, { useEffect, useState } from 'react'
import { HashLoader } from 'react-spinners';

function UpdateProductAdmin() {
  const {user}=useAuth();
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    if(user){
      setLoading(false);
      
    }
    if(!user ||user.role!=='admin'){
      showError("Unauthorized Access")

    }
  },[user])
  if(loading){
    return (
      <div className="min-h-screen flex items-center justify-center">
        <HashLoader color="#77e56e" />
      </div>
    );
  }
  return (
    user.role!=='admin'?(
    <div>
      "Unauthorize access"
    </div>
    ):(<div>
      
    </div>)
  )
}

export default UpdateProductAdmin
