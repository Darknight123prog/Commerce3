import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import TrueFocus from '../../components/TrueFocus';
import axios from "axios";
import Product from '../../Componets/Product';
import RotatingText from '../../components/RotatingText';
import { HashLoader } from "react-spinners";
import Catogory from '@/Componets/Catogory';

function Home() {
  const [url, setUrl] = useState([]);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8568/api/v1/getBannerUrl");
        setUrl(res.data.url);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchProduct = async () => {
      try {
        const product_data = await axios.get("http://localhost:8568/api/v1/products");
        setProduct(product_data.data.details);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <HashLoader color="#77e56e" />
      </div>
    );
  }

  return (
    <div className='overflow-x-hidden'>
      {/* Hero Section */}
      <div className="flex flex-col sm:flex-row flex-wrap items-start gap-2 px-3 py-4 bg-black">
        <span className="
          text-2xl
          sm:text-3xl
          md:text-4xl
          lg:text-5xl
          xl:text-5xl
          font-medium
          text-white
        ">
          Commerce3.0
        </span>

        <RotatingText
          texts={["Click,", " Cart,", " Celebrate!"]}
          mainClassName="
            text-lg
            sm:text-xl
            md:text-2xl
            lg:text-3xl
            font-extrabold
            bg-[#2E2EFF]
            text-white
            px-2 sm:px-3 md:px-4
            py-1 sm:py-2
            rounded-xl
            overflow-hidden
          "
          rotationInterval={1500}
        />
       <Catogory/>
      </div>

      {/* Slider */}
      {url.length > 0 ? (
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          loop
          className="
            w-full
            overflow-x-hidden
            h-[30vh]
            sm:h-[40vh]
            md:h-[50vh]
            lg:h-[60vh]
            xl:h-[70vh]
            bg-black
          "
        >
          {url.map((m, index) => (
            <SwiperSlide key={index} className="w-full h-full">
              <img
                src={m.url}
                alt={`banner-${index}`}
                className="w-full h-full object-cover rounded-md"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="flex items-center justify-center h-[200px] sm:h-[300px]">
          <HashLoader color="#77e56e" />
        </div>
      )}

      {/* Products Section */}
      <div className="px-3 sm:px-5 py-4">
        <div className="h-16 mt-12  sm:h-14 md:h-16 bg-white w-full max-w-3xl flex items-center justify-center rounded-md mb-8 mx-auto">
  <TrueFocus
    sentence="Trending Products"
    manualMode={false}
    blurAmount={5}
    borderColor="red"
    animationDuration={1.5}
    pauseBetweenAnimations={1}
  />
</div>

        {/* Product Grid */}
        <div className="
          grid
    w-full
    grid-cols-2       
    sm:grid-cols-1
    md:grid-cols-1
    lg:grid-cols-1
    xl:grid-cols-5
    gap-3 sm:gap-4 md:gap-5
    bg-amber-50
    p-2 sm:p-4
    overflow-x-hidden
          
        ">
          {product.map((prod) => (
            <Product key={prod._id} className="w-full min-w-0" product={prod} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
