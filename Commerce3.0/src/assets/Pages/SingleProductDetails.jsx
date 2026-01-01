import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import axios from "axios";
import { HashLoader } from "react-spinners";
import Rating from "../../Componets/Rating";
import { Rate } from "antd";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Cart from "../../Componets/Cart";
import { useAuth } from "@/Context/AuthContext";
import { showError, showInfo, showSuccess, showWarning } from "@/Utils/Toast";
import SuggestedProducts from "@/Componets/SuggestedProducts";

function SingleProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const[prodArray,setProdArray]=useState([]);
  const [review,setReview]=useState('');
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [showReview,setShowReview]=useState(true);
  const handleSubmit=async(e)=>{

  if(!user){
    showInfo('need to log in first to add the review');
    navigate('/login');

return
  }
  try{
  e.preventDefault();
 const prod= await axios.post(`http://localhost:8568/api/v1/add/Reviews?Product_id=${id}`,{
    review,
    rating
  },{withCredentials:true});
  console.log(prod.data);
  setProduct(prod.data.product_details);
 
  showSuccess('Review Added Successfully');
}catch(err){
  showError(`cannot ad your review ${err}`);
}

}

  const ratingChanged = (newRating) => {
    setRating(newRating); 
  };
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

        const arr=await axios.get('http://localhost:8568/api/v1/products',{
          withCredentials:true
        })
        setProdArray(arr.data.details)
        console.log(arr.data.details)
       
        if(user){
       const check= res.data.Details.reviews.some((rev)=>rev.user===user._id);
       if(check){
        setShowReview(false);
       }
        }
       
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id,review]);
  console.log(product)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <HashLoader color="#77e56e" />
      </div>
    );
  }
  const handleDelte=async()=>{
   const dt= await axios.delete(`http://localhost:8568/api/v1/deleteReview?id=${id}`,{withCredentials:true});
   showSuccess('review is deleted successfully');
   setProduct(dt.data.updatedreviws);
  }

  return (
    
   
    
    <div className="w-full min-h-screen bg-amber-100">

      {/* PRODUCT SECTION */}
      <div className="max-w-7xl max mx-auto px-4 py-6">
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
<div className="w-full flex flex-col lg:flex-row items-center justify-center py-6 px-4 lg:px-12 gap-6 ">
  {/* Left: Reviews */}
  <div className="flex-1 w-full max-w-lg lg:max-w-2xl bg-white rounded-2xl shadow-md p-6">
    <h3 className="text-2xl font-semibold mb-6 text-gray-800">Product Reviews</h3>

    {/* Add / Update Review Form */}
    <div className="bg-gray-50 p-5 rounded-2xl mb-6 shadow-sm">
      {!user ? (
        <p className="text-gray-500">
          Please <span className="font-semibold">login</span> or <span className="font-semibold">sign up</span> to add a review.
        </p>
      ) : showReview ? (
        <div className="space-y-4">
          <p className="font-medium text-gray-700">Add Your Review</p>
          <Rate value={rating} onChange={ratingChanged} className="text-yellow-500" />
          <form onSubmit={handleSubmit} className="space-y-3">
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full h-24 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
              placeholder="Write your review here..."
              draggable={false}
            />
            <button
              type="submit"
              className="bg-yellow-500 text-white px-5 py-2 rounded-xl hover:bg-yellow-600 transition"
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="font-medium text-gray-700">Update Your Review</p>
          <Rate value={rating} onChange={ratingChanged} className="text-yellow-500" />
          <form onSubmit={handleSubmit} className="space-y-3">
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full h-24 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
              placeholder="Update your review here..."
              draggable={false}
            />
            <button
              type="submit"
              className="bg-yellow-500 text-white px-5 py-2 rounded-xl hover:bg-yellow-600 transition"
            >
              Update
            </button>
          </form>
        </div>
      )}
    </div>

    {/* Reviews List */}
    {product.reviews?.length > 0 ? (
      <div className="space-y-4">
        {product.reviews.map((rev, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow p-5 border border-gray-100">
            <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
              <Rating rating={rev.rating} />
              <span className="text-sm text-gray-400">✔ Verified Buyer</span>
            </div>
            <p className="text-gray-700">{rev.review}</p>
            <p className="text-sm text-gray-500 mt-2 font-medium">{rev.user_name}</p>
            {user && user._id === rev.user && (
              <div className="mt-3">
                <button
                  onClick={handleDelte}
                  className="border border-black p-1 text-white rounded-md bg-black hover:bg-red-500 hover:shadow-lg transition h-8"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    ) : (
      <div className="bg-white rounded-2xl shadow p-6 text-center border border-gray-100">
        <h4 className="text-gray-500">
          Be the first to review this product ⭐
        </h4>
      </div>
    )}
  </div>

  {/* Right: Product Preview */}
  <div className="flex-1 flex flex-col items-center justify-start w-full max-w-sm lg:max-w-md bg-white rounded-2xl shadow-md p-5">
    <h3 className="text-lg font-semibold mb-2">Product Preview</h3>
    {product?.image?.[0] && (
      <img
        src={product.image[1].public_url}
        alt={product.name}
        className="w-full h-64 object-contain rounded-lg shadow mb-4"
      />
    )}
    <p className="font-medium text-gray-700 text-center">{product.name}</p>
  </div>
</div>

{/* extra segment */}
<div>
  
  {prodArray.length>0?(<SuggestedProducts products={prodArray} />):( <div className="min-h-screen flex items-center justify-center">
        <HashLoader color="#77e56e" />
      </div>)}
  
</div>

    </div>
);


}

export default SingleProductDetails;
