import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import TrueFocus from '../../components/TrueFocus';
import axios from "axios";
import Product from '../../Componets/Product';
import RotatingText from '../../components/RotatingText'
import { HashLoader } from "react-spinners";

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
    <>
      {/* Hero Section */}
      <div>
        <div className="flex flex-wrap items-center gap-2 px-3 py-4 bg-black">
          <span className="
            text-3xl
            sm:text-4xl
            md:text-5xl
            lg:text-6xl
            font-medium
            text-white
          ">
            Commerce3.0
          </span>

          <RotatingText
            texts={["Click,", " Cart,", " Celebrate!"]}
            mainClassName="
              text-4xl
              sm:text-3xl
              md:text-4xl
              font-extrabold
              bg-[#2E2EFF]
              text-white
              px-3
              py-2
              rounded-xl
              overflow-hidden
            "
            rotationInterval={1500}
          />
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
              h-[33vh]
              sm:h-[45vh]
              md:h-[55vh]
              lg:h-[65vh]
              bg-black
            "
          >
            {url.map((m, index) => (
              <SwiperSlide key={index} className="w-full h-full">
                <img
                  src={m.url}
                  alt={`banner-${index}`}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="flex items-center justify-center h-[300px]">
            <HashLoader color="#77e56e" />
          </div>
        )}
      </div>

      {/* Products Section */}
      <div className="px-3 sm:px-5 py-4">
        <div className="h-24 sm:h-28 bg-white w-full flex items-center justify-center rounded-md mb-4">
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
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          gap-6
          bg-amber-50
          p-4
          rounded-lg
        ">
          {product.map((prod) => (
            <Product key={prod._id} product={prod} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
