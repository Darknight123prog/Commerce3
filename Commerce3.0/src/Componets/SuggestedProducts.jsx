import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Rating from "../Componets/Rating"; // your rating component
import { useNavigate } from "react-router-dom";

function SuggestedProducts({ products,title }) {
  const navigate = useNavigate();

  return (
    <div className="w-full py-8 px-4 bg-white rounded-2xl">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
       {title}
      </h2>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 2000, disableOnInteraction: true }}
        spaceBetween={20}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            <div
              onClick={() => navigate(`/ProductDetails/${product._id}`)}
              className="cursor-pointer bg-white h-[20rem] rounded-2xl shadow-md p-4 flex flex-col items-center hover:shadow-xl transition"
            >
              
              <img
                src={product.image?.[0]?.public_url}
                alt={product.name}
                className="w-full h-36 object-contain rounded-lg mb-3"
              />
              <p className="font-medium text-gray-700 text-center text-sm md:text-base">
                {product.name}
              </p>
              <p className="text-green-600 font-semibold mt-1 text-sm md:text-base">
                ₹{product.price}
              </p>
              <div className="mt-2">
                <Rating rating={product.rating} />
              </div>
             
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SuggestedProducts;
