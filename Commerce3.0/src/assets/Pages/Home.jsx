import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function Home() {
 
  
  return (
   <>
    <div className='h-9 bg-[#D1D0CE] w-full'>
     <h2 className='flex font-serif  font-medium justify-center'>Trending Now</h2>

    </div>
     <div>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop={true}
        className="w-full h-[200px] sm:h-[300px] md:h-[400px]"
      >
        <SwiperSlide>
          <img
            src="Banner1.jpg"
            alt="Banner 1"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="Banner2.jpg"
            alt="Banner 2"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="Banner3.jpg"
            alt="Banner 3"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="Banner4.jpg"
            alt="Banner 4"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="Banner5.jpg"
            alt="Banner 5"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="Banner6.jpg"
            alt="Banner 6"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="Banner7.jpg"
            alt="Banner 7"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="Banner8.jpg"
            alt="Banner 8"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="Banner9.jpg"
            alt="Banner 9"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="Banner10.jpg"
            alt="Banner 10"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="Banner11.jpg"
            alt="Banner 11"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="Banner12.jpg"
            alt="Banner 12"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="Banner13.jpg"
            alt="Banner 13"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        
        <SwiperSlide>
          <img
            src="Banner15.jpg"
            alt="Banner 15"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="Banner16.jpg"
            alt="Banner 16"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
      </Swiper>
    </div>
    </>
  )
}

export default Home
