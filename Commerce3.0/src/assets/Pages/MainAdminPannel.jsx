import Button from '@/Componets/Button';
import { useAuth } from '@/Context/AuthContext'
import React from 'react'
import {  useNavigate } from 'react-router-dom';
import UpdateProductAdmin from './UpdateProductAdmin';
import AllUserData from './AllUserData';

function MainAdminPannel() {
  const { user } = useAuth();
  const navigate=useNavigate();
  
  const handleUpdateProduct=()=>{
    navigate('/auth/admin/MainAdmin/updateProduct');
  }
  const handleNewProuct=()=>{
    navigate('/auth/admin/MainAdmin/AddNewProduct');

  }
  const handleUsers=()=>{
    navigate('/auth/admin/MainAdmin/GetAllUserInfo');
  }


  return (
    <div className="min-h-screen w-full bg-[#808080] flex flex-col lg:flex-row gap-5 ">
     
      
      {/* Sidebar */}
      <div className="w-full  lg:w-[20rem] bg-stone-950 flex flex-col  items-center py-6 ">
        <div className="h-40 p-0   w-40 bg-amber-950 rounded-full mb-4">
          <img  loading="lazy"   className='h-40 m-0   w-40 rounded-full' src={user.avator.url?(user.avator.url):('https://res.cloudinary.com/djgboajkm/image/upload/6425483_fnvhfh')}></img>
        </div>

        <h1 className="text-white text-lg font-semibold">Admin Info</h1>
        <h2 className="text-gray-300">{user?.name}</h2>
         <h2 className="text-gray-300">Welcome to admin Panel</h2>
      </div>

      {/* Main Content */}
      <div className="flex mt-4 flex-col xl:flex-row gap-4 flex-1">

        {/* Product Controller */}
        <div className="bg-[rgb(36,36,36)] h-[35rem] rounded-2xl p-4 flex-1">
          <h1 className="text-white text-lg mb-4">Control the flow</h1>

          <div className="flex flex-col items-center-safe gap-2">
            <div  className='flex flex-col items-center'  onClick={handleNewProuct}><Button className='w-2xs md:w-3xs lg:w-2xl flex flex-col items-center-safe '  text="Add new Product"/></div>
            <div onClick={handleUpdateProduct} className="w-2xs md:w-3xs lg:w-2xl flex flex-col items-center-safe"><Button className='w-2xs md:w-3xs lg:w-2xl flex flex-col items-center-safe ' text="Update Product"/></div>
          <div onClick={()=>navigate('/auth/admin/MainAdmin/DeleteAnyProduct')} className="w-2xs md:w-3xs lg:w-2xl flex flex-col items-center-safe"><Button className='w-2xs md:w-3xs lg:w-2xl flex flex-col items-center-safe ' text="Delete  Products"/></div>
            <div className="w-2xs md:w-3xs lg:w-2xl flex flex-col items-center-safe"><Button className='w-2xs md:w-3xs lg:w-2xl flex flex-col items-center-safe ' text="Get All Product"/></div>
            <div  className="w-2xs md:w-3xs lg:w-2xl flex flex-col items-center-safe"><Button className='w-2xs md:w-3xs lg:w-2xl flex flex-col items-center-safe ' text="Add new Banner"/></div>
            <div  className="w-2xs md:w-3xs lg:w-2xl flex flex-col items-center-safe"><Button className='w-2xs md:w-3xs lg:w-2xl flex flex-col items-center-safe ' text="Delete Banner"/></div>
          </div>
        </div>

        {/* User Controller */}
        <div className="bg-stone-600 rounded-2xl flex flex-col items-center-safe h-[19rem] p-4 w-full xl:w-[20rem]">
          <h1 className="text-amber-300 text-lg mb-4">User Controller</h1>

          <div className="flex flex-col gap-2">
            
            <div  onClick={handleUsers} className="btn"><Button className='w-2xs flex flex-col items-center-safe ' text="Get All users info from DataBase"/></div>
            <div onClick={()=>navigate('/auth/admin/MainAdmin/GetAllAdminInfo')} ><Button className='w-2xs flex flex-col items-center-safe ' text="Get All Admin info from Database"/></div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default MainAdminPannel
