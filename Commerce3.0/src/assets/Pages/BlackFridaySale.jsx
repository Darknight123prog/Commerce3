import React, { lazy, Suspense, useEffect, useState } from 'react'
const SuggestedProducts=lazy(()=>import('@/Componets/SuggestedProducts'))
import Spiner from '@/Componets/Spiner';
import { showError } from '@/Utils/Toast';
import axios from 'axios';


import { Link } from 'react-router-dom';
import { Autoplay, Navigation,Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

function BlackFridaySale() {
  const[women,setWomen]=useState([]);
  const[men,setMen]=useState([]);
  const[loading,setLoading]=useState(true);

    const backendUrl=import.meta.env.VITE_BACKEND_URL;


  useEffect(()=>{
    const FetchData=async()=>{
      try{

      
    const prod1=await axios.get(`${backendUrl}/products/api/v1/products?catogary=westernWomen`,{withCredentials:true
    })
    const prod2=await axios.get(`${backendUrl}/products/api/v1/products?catogary=westernMen`,{withCredentials:true});
     setWomen(prod1.data.details);
     setMen(prod2.data.details);
     setLoading(false);
  }
  catch(err){
    showError('somethingg went wrong');
  }
  }
  
     FetchData();
  
  },[])

//   if (new Date().getDay() !== 5) {
//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="text-center p-6 bg-white rounded-lg shadow-md">
//         <h2 className="text-2xl font-semibold mb-2 text-gray-800">
//           🕒 Sale will be Live on Friday!
//         </h2>
//         <p className="text-gray-600">
//           Check back on Friday to grab the hottest deals.
//         </p>
//       </div>
//     </div>
//   );
// }


 
  return (
    <Suspense fallback={<Spiner/>} >
  <div className="px-4 py-6">
    <div className="flex flex-col lg:flex-row gap-6 mb-8">
      {/* Left: Swiper */}
      <div className="lg:w-2/3 w-full h-64 sm:h-80 md:h-96 lg:h-[400px] rounded-md overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          loop
          className="w-full h-full"
        >
          {women.map((m, index) => (
            <SwiperSlide key={index} className="w-full h-full">
              <Link to={`/ProductDetails/${m._id}`} >
              <img
                src={m.image[2]?.public_url || '/'}
                alt={`banner-${index}`}
                loading="lazy"  
                className="w-full h-full object-contain rounded-md"
              />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* placeholder */}
      <div className="lg:w-1/3 w-full flex flex-col justify-center text-center lg:text-left">
       <h2 className="text-2xl font-bold mb-4">Commerce3.0</h2>
        <h2 className="text-2xl font-bold mb-4">Welcome to Blackfriday Sale</h2>
        <img loading='lazy' className='' src='https://res.cloudinary.com/djgboajkm/image/upload/f_auto/18196971_rc6ekf' ></img>
        <p className="text-gray-700 mb-4">Get Upto 25% off</p>
         <p className="text-gray-700 mb-4">Premium Fashion</p>
         <p  className="text-gray-700 mb-4">Shop here</p>
      </div>
    </div>

    {/* Bottom Swipers (unchanged) */}
     <p className="text-gray-700 mb-4">Men 's Fashion league </p>
    <SuggestedProducts products={men} />
    <div>
      
 <p className="text-gray-700 mb-4">Z- Trendy look </p>
    <SuggestedProducts products={women} />
    </div>
  </div>
  </Suspense>
);

}

export default BlackFridaySale
