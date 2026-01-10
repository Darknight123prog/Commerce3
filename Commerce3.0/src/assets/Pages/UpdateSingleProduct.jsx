import React, { useEffect, useState } from "react";
import axios from "axios";
import { HashLoader } from "react-spinners";

// Swiper imports (IMPORTANT)
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { showError, showSuccess } from "@/Utils/Toast";
import { useNavigate } from "react-router-dom";
 

function UpdateSingleProduct() {
 const backendUrl=import.meta.env.VITE_BACKEND_URL;

  const[hasSize,setHasSize]=useState(false);
  const [sizes,setSizes]=useState([]);
  const size_option=["S", "M", "L", "XL", "XXL"];
  const [name,setName]=useState('');
    const [price,setPrice]=useState(null);
      const [stock,setStock]=useState(null);
        const [catogary,setCatogary]=useState('');
        const[id,setId]=useState(null);
        const [discount,setDiscount]=useState(0);
  const navigate=useNavigate();
  
  const [description,setDescription]=useState('');
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [form,setForm]=useState({
    name:name,
    description:description
  })
  

  useEffect(() => {
    const id = JSON.parse(sessionStorage.getItem("update_id"));
    setId(id);

    if (!id) {
      console.error("No product ID found in sessionStorage");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${backendUrl}/products/api/v1/admin/products/${id}`,
          { withCredentials: true }
        );

        setProduct(res.data.Details);
        setName(res.data.Details.name);
         setPrice(res.data.Details.price);
         setCatogary(res.data.Details.catogary);
         setStock(res.data.Details.stock);
        setDescription(res.data.Details.description);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const handleSubmit=(e)=>{
    try{
   e.preventDefault();
   const prod={
    name:name,
    description:description
   }
    setForm(prod)
    
    const updateInfo=async()=>{

      const update=await axios.put(`${backendUrl}/products/api/v1/admin/products/${id}`,
        {
          name,
          description,
          stock,
          price,
          catogary,
          discount,
          isSize:hasSize,
          sizes
        }
        ,{withCredentials:true}
      )
    }
    updateInfo();
    showSuccess(`Product ${name} is updated successfully`);
  }
  catch(err){
    showError(`Cannot update ${err}`);
  }
}


  // Loader
  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center bg-white">
        <HashLoader color="#77e56e" />
      </div>
    );
  }

  return (
  <div className="w-full max-w-5xl mx-auto p-4">
    {/* Product Images Slider */}
    {product?.image?.length > 0 && (
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true }}
        loop
        className="rounded-xl mb-6"
      >
        {product.image.map((img, index) => (
          <SwiperSlide key={index}>
            <img
            loading="lazy"  
              src={img.public_url}
              alt={product.name}
              className="w-full h-[250px] sm:h-[300px] md:h-[400px] object-contain rounded-xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    )}

    {/* Product Form */}
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row gap-6">
      {/* Left: Form Inputs */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">
        <h2 className="text-xl font-semibold mb-2">Update Product</h2>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={catogary}
          onChange={(e) => setCatogary(e.target.value)}
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          type="number"
          name="discount"
          placeholder="discount"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
        />
       
  <label className="flex items-center gap-2">
  <input
    type="checkbox"
    checked={hasSize}
    onChange={(e) => {
      setHasSize(e.target.checked);
      if (!e.target.checked) setSizes([]); // reset sizes
    }}
  />
  Product has sizes
</label>

{hasSize && (
  <div className="flex gap-2 flex-wrap">
    {size_option.map((size) => (
      <button
        key={size}
        type="button"
        onClick={() => setSizes([...sizes,size])}
        className={`px-4 py-2 rounded border transition
          ${
            sizes.includes(size)
              ? "bg-black text-white"
              : "bg-white text-black"
          }`}
      >
        {size}
      </button>
    ))}
  </div>
)}


        <textarea
          name="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded px-3 py-2 w-full h-32 resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <div className="flex gap-4 mt-2">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded transition"
          >
            Update
          </button>
          <button
            type="button"
            onClick={() => navigate("/auth/admin/MainAdmin/updateProduct")}
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded transition"
          >
            Back
          </button>
        </div>
      </form>

      {/* Right: Product Preview */}
      <div className="flex-1 flex flex-col items-center justify-start">
        <h3 className="text-lg font-semibold mb-2">Product Preview</h3>
        {product?.image?.[0] && (
          <img
          loading="lazy"  
            src={product.image[0].public_url}
            alt={product.name}
            className="w-full max-w-xs h-64 object-contain rounded-lg shadow"
          />
        )}
        <p className="mt-4 font-medium">{name}</p>
        {discount==0?( <p className="text-black font-semibold">₹ {price}</p>):(
          <div>
           <p className="text-stone-700 line-through font-semibold">₹ {product.price}</p>
             <p className="text-amber-500  font-semibold">{discount}% off</p>
               <p className="text-black  font-semibold">₹ {price -price*0.01*discount}</p>

          </div>
        )}
       
      </div>
    </div>
  </div>
);

}

export default UpdateSingleProduct;
