import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import axios from "axios";
import Product from '../../Componets/Product';
import {HashLoader} from "react-spinners"

function Home() {
  const [url,setUrl] = useState([]);
  const [product,setProduct]=useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8568/api/v1/getBannerUrl");
        setUrl(res.data.url);
      } catch (error) {
        console.error(error);
      }finally{
        setLoading(false);
      }
    }

    //fetch call for the product data as public no sign upp required
    const fetchProduct=async()=>{
      try{        
    const product_data=await axios.get("http://localhost:8568/api/v1/products");
    setProduct(product_data.data.details); 
    //  console.log(product_data.data.details);

      }catch(err){
console.error(err);
      }
    }
   
fetchProduct();
    fetchData();
  },[]);

  if(loading){
    <div >
      <HashLoader color="#77e56e" />
      </div>
  }

  return (
    <>
      {/* Heading */}
     
<div>
      {/* Slider */}
     {url.length>0 ?(<Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="w-full h-[35vh] sm:h-[45vh] md:h-[55vh] lg:h-[65vh]"
      >
        { url.map((m, index) => (
          <SwiperSlide
            key={index}
            className="flex justify-center items-center w-full h-full"
          >
            <img
              src={m.url}
              alt={`banner-${index}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>):(
        <div className='flex items-center justify-center h-[300px]'>
        <HashLoader color="#77e56e" />
        </div>)}
      </div>
<div className='p-2 pl-5 pr-5'>
       <div className='h-10 bg-[#D1D0CE] w-full flex items-center justify-center'>
        <h2 className='font-serif font-medium text-sm sm:text-base md:text-lg'>
          Trending Now
        </h2>
      </div>

      <div className='bg-amber-800 mt-2.5 sm:grid-4 md:grid-cols-3 ' >
      <div className='grid grid-cols-1  bg-amber-50 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4'>
      {product.length>0&& product.map((prod)=>(
        <Product product={prod}  />
      ))}
      </div>
      </div>
</div>
    </>
  )
}

export default Home;
