import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import axios from "axios";
import { HashLoader } from "react-spinners";
import Rating from "../../Componets/Rating";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Cart from "../../Componets/Cart";
import { useAuth } from "@/Context/AuthContext";
import { showWarning } from "@/Utils/Toast";

function SingleProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();
  const {user}=useAuth();
  const handleBuy=()=>{
      if(!user){
        showWarning('Need to log In first')
  navigate('/login');
      }
      else{
       
        const prod={
          imgUrl:product.image[0].public_url,
          _id:product._id,
          name:product.name,
          price:product.price,
          quanitity:product.quanitity||1
        }
        sessionStorage.setItem('product_id',JSON.stringify(prod));
        navigate('/cart/buyNow');
        
      }
    }
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8568/api/v1/products/${id}`
        );
        setProduct(res.data.Details);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <HashLoader color="#77e56e" />
      </div>
    );
  }

  return (
    
   
    
    <div className="w-full min-h-screen bg-amber-100">

      {/* PRODUCT SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-lg p-5 grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* IMAGE SWIPER */}
          <div>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{ clickable: true }}
              loop
              className="rounded-xl"
            >
              {product?.image?.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={img.public_url}
                    alt={product.name}
                    className="w-full h-[260px] sm:h-[320px] md:h-[380px] object-contain rounded-xl"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* ACTION BUTTONS */}
            <div className="flex w-auto flex-col sm:flex-row gap-4 mt-5">
              <Cart  Product={id} />

              <button  onClick={handleBuy} className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
                Buy Now
              </button>
            </div>
          </div>

          {/* PRODUCT DETAILS */}
          <div className="flex flex-col justify-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              {product.name}
            </h2>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {product.description}
            </p>

            <p className="text-2xl font-semibold text-green-700">
              ₹{product.price}
            </p>

            <Rating rating={product.rating} />

            <p
              className={`font-medium ${
                product.stock > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              Status: {product.stock > 0 ? "Available" : "Out of Stock"}
            </p>
          </div>
        </div>
      </div>

      {/* REVIEWS SECTION */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        <h3 className="text-xl font-semibold mb-4">Product Reviews</h3>

        {product.reviews?.length > 0 ? (
          <div className="space-y-4">
            {product.reviews.map((rev, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-md p-4"
              >
                <Rating rating={rev.rating} />

                <p className="text-gray-700 mt-2">
                  {rev.review}
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  ✔ Verified Buyer: {rev.user_name}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <h4 className="text-gray-600">
              Be the first to review this product ⭐
            </h4>
          </div>
        )}
      </div>
    </div>
);


}

export default SingleProductDetails;
