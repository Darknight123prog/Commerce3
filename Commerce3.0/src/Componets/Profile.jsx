import React from 'react'
import { Card, CardContent, Avatar, Typography, Button } from "@mui/material";
import axios from 'axios';
import { showError, showSuccess } from '@/Utils/Toast';
function Profile({profile }) {
  

  const handleDelete=async()=>{
    try{
    await axios.delete(`http://localhost:8568/api/v1/admin/accesss_to_all_users_admins/${profile._id}`,{withCredentials:true})
    showSuccess('Deleted User Data');
    }
    catch(err){
      showError('Cannot Delete the user Data');
      return;
    }
  }
  return (
    <Card sx={{ width: 300, textAlign: "center", p: 2 }}>
      <Avatar
        src={profile.avator.url}
        sx={{ width: 96, height: 96, margin: "0 auto" }}
      />
      <CardContent>
        <Typography variant="h6">{profile.name}</Typography>
        <Typography color="text.secondary">role - {profile.role}</Typography>
        <Typography color="text.secondary">{profile.email}</Typography>
        <Typography color="text.secondary">Type of sign up: {profile.authType}</Typography>
         <Typography color="text.secondary"> profile Updated last at : {new Date(profile.updatedAt).toLocaleString()}</Typography>
       <button
  type="button"
  onClick={handleDelete}
  className="
    px-4 py-2
    bg-red-600
    text-white
    rounded-lg
    font-semibold
    transition
    transform
    duration-150
    ease-in-out
    hover:scale-105
    hover:bg-red-700
    active:scale-95
    active:bg-red-800
    focus:outline-none
    focus:ring-2
    focus:ring-red-500
    focus:ring-offset-2
  "
>
  Delete
</button>
         
        
      </CardContent>
    </Card>
  );
}

export default Profile
