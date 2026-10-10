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
import { useAuth } from '@/Context/AuthContext';
import SuggestedProducts from '@/Componets/SuggestedProducts';
import { Link } from 'react-router-dom';

function Home() {
  const [url, setUrl] = useState([]);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchedArray, setSearchedArray] = useState([]);
  const [trendyWear, setTrendyWear] = useState([]);
  const [gadgets, setGadgets] = useState([]);

  const auth = useAuth();
  const user = auth?.user;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Page data (independent requests, one failure doesn't block the rest)
  useEffect(() => {
    const load = async () => {
      const [banner, trend, gadget, all] = await Promise.allSettled([
        axios.get(`${backendUrl}/api/v1/getBannerUrl`),
        axios.get(`${backendUrl}/api/v1/products/products?catogary=menSherwani`),
        axios.get(`${backendUrl}/api/v1/products/products?catogary=electronics`),
        axios.get(`${backendUrl}/api/v1/products/products`),
      ]);

      if (banner.status === 'fulfilled') setUrl(banner.value.data?.url || []);
      if (trend.status === 'fulfilled') setTrendyWear(trend.value.data?.details || []);
      if (gadget.status === 'fulfilled') setGadgets(gadget.value.data?.details || []);
      if (all.status === 'fulfilled') setProduct(all.value.data?.details || []);

      [banner, trend, gadget, all].forEach((r) => {
        if (r.status === 'rejected') console.error(r.reason);
      });
      setLoading(false);
    };
    load();
  }, [backendUrl]);

  // Recent searches (re-runs when the user logs in)
  useEffect(() => {
    if (!user) {
      setSearchedArray([]);
      return;
    }
    axios
      .get(`${backendUrl}/api/v1/user/add/keywords/searched`, { withCredentials: true })
      .then((res) => setSearchedArray(res.data?.details || []))
      .catch((err) => console.error(err));
  }, [user, backendUrl]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <HashLoader color="#77e56e" />
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <div className="flex flex-col sm:flex-row flex-wrap items-start gap-2 px-3 py-4 bg-black">
        <span className="text-5xl tracking-[0.08em] text-white uppercase font-['Bodoni_Moda',serif]">
          Achora
        </span>
        <RotatingText
          texts={["Click,", " Cart,", " Celebrate!"]}
          mainClassName="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold bg-[#2E2EFF] text-white px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-xl overflow-hidden"
          rotationInterval={1500}
        />
        <Catogory />
      </div>

      {/* Slider */}
      {url.length > 0 && (
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          loop
          className="w-full overflow-x-hidden h-[30vh] sm:h-[40vh] md:h-[50vh] lg:h-[60vh] xl:h-[70vh] bg-black"
        >
          {url.map((m, index) => (
            <SwiperSlide key={index} className="w-full h-full">
              <Link to="/Blackfriday/sale">
                <img
                  loading="lazy"
                  src={m.url}
                  alt={`banner-${index}`}
                  className="w-full h-full object-cover rounded-md"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Products */}
      <div className="px-3 sm:px-5 py-4">
        <div className="h-16 mt-12 sm:h-14 md:h-16 bg-white w-full max-w-3xl flex items-center justify-center rounded-md mb-8 mx-auto">
          <TrueFocus
            sentence="Trending Products"
            manualMode={false}
            blurAmount={5}
            borderColor="red"
            animationDuration={1.5}
            pauseBetweenAnimations={1}
          />
        </div>

        {user && searchedArray.length > 0 && (
          <SuggestedProducts title="Based on recently searched" products={searchedArray} />
        )}
        {trendyWear.length > 0 && (
          <SuggestedProducts title="Trendy wedding wear" products={trendyWear} />
        )}
        {gadgets.length > 0 && (
          <SuggestedProducts title="Trendy gadgets" products={gadgets} />
        )}

        <div className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5 bg-white shadow-2xs p-2 sm:p-4 overflow-x-hidden">
          {product.map((prod) => (
            <Product key={prod._id} className="w-full min-w-0" product={prod} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;