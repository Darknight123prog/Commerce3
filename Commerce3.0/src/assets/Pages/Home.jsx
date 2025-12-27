import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import axios from "axios";
import Product from '../../Componets/Product';
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

    // fetch call for the product data (public)
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

  /* 🔴 UI fix: return loading JSX */
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <HashLoader color="#77e56e" />
      </div>
    );
  }

  return (
    <>
      {/* Slider */}
      <div>
        {url.length > 0 ? (
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation
            loop
            className="w-full h-[30vh] sm:h-[45vh] md:h-[55vh] lg:h-[65vh]"
          >
            {url.map((m, index) => (
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
          </Swiper>
        ) : (
          <div className="flex items-center justify-center h-[300px]">
            <HashLoader color="#77e56e" />
          </div>
        )}
      </div>

      {/* Products Section */}
      <div className="px-3 sm:px-5 py-4">
        {/* Heading */}
        <div className="h-10 bg-[#D1D0CE] w-full flex items-center justify-center rounded-md mb-4">
          <h2 className="font-serif font-medium text-sm sm:text-base md:text-lg">
            Trending Now
          </h2>
        </div>

        {/* Responsive Products Grid */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            gap-9
            bg-amber-50
            p-4
            rounded-lg m-2
          "
        >
          {product.length > 0 &&
            product.map((prod) => (
              <Product  key={prod._id} product={prod} />
            ))}
        </div>
      </div>
    </>
  );
}

export default Home;
