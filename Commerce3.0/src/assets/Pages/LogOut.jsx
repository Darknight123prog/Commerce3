import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

function LogOut() {
  
  const navigate=useNavigate();
  
   const {user}=useAuth();
   const [User,setUser]=useState(user);
  useEffect(()=>{
   
    const Logggout=async()=>{
      try{
     await axios.post('http://localhost:8568/api/v1/signout',{},{withCredentials:true});
     setUser(null);
    
     navigate('/');
      }
      catch(err){
        console.error(err);
      }
    }
    Logggout()
  },[navigate,User])
  return (
    <div>
      {user?("logging off"):(<div>
        <Link to='/'>Home</Link>
          <Link to='/register'>SignUp/logIn</Link>
      </div>)}
     
      
    </div>
  )
}

export default LogOut
