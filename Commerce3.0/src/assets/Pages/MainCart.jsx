import { showError, showSuccess } from '@/Utils/Toast';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PacmanLoader from "react-spinners/PacmanLoader";
import { InputNumber } from "antd";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import Cart from '@/Componets/Cart';
import { useAuth } from '@/Context/AuthContext';

function MainCart() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [price,setprice]=useState(0);
  const [gst,setGst]=useState(0);
  const {cart,setCart}=useAuth();
  
  const handleClick=async(val)=>{
    try{
   if(product &&cart){
    console.log('cart ',cart);
    console.log('product ',product);
    const nCart = await axios.delete(
            "http://localhost:8568/api/v1/RemoveFromCart",
            {
              data: { Product_id: val },
              withCredentials: true,
              
            })
    setProduct(product.filter((p)=>p._id!==val));
console.log('inside the Main cart',nCart.data.details)
     setCart(nCart.data.details);
     showSuccess(`Item removed successfully`);
   }
  }catch(err){
    showError(`cannot remove the item : ${err.message}`)
  }
  }
  //  console.log("here is the cart",cart);

  // useEffect(()=>{
  //   setCart(pr)
  // },[product])
//  console.log(cart);
  const[totalPrice,setTotalPrice]=useState(0);
   const [save,setSave]=useState({
    price:0,
    gst:0,
    totalPrice:0,
    other_charges:0
   });
  const navigate=useNavigate()

  const handleCheckOut=()=>{
navigate('/cart/ProceedToCheckOut');
  }
  useEffect(() => {
    const getCartProduct = async () => {
      try {
        const res = await axios.get(
          'http://localhost:8568/api/v1/add/GetCartList',
          { withCredentials: true }
        );
        setProduct(res.data.details || []);
        // console.log("here is the product ",res.data.details);
      } catch (err) {
        showError(`Error occurred: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    getCartProduct();
  }, []);

 useEffect(()=>{
  let slow=0;
product.forEach((e)=>slow+=(e.price)*(e.quantity||1))
setprice(slow)

setGst(0.18*price);
if(price<500){
setTotalPrice(slow+12+gst+23)

}
else{
  setTotalPrice(slow+12+gst);
}
setSave({
  price:price,
  gst:gst,
  totalPrice:totalPrice,
  other_price:price>500?(12):(35)
})
sessionStorage.setItem('price',JSON.stringify(save));

console.log(JSON.parse(sessionStorage.getItem('price')));

 },[product,setGst,gst,price,totalPrice])



  if (loading) {
    return (
      <div className="flex h-[40rem] w-full items-center justify-center">
        <PacmanLoader color="#36454F" />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row p-4 bg-[#FFF0E5] gap-4">

      {/* Product Section */}
      <div className="bg-white rounded-2xl flex-1 p-4 min-h-[200px]">
        <h1 className="text-xl font-semibold mb-4">Products in Cart</h1>

        {product.length === 0 ? (
          <h2>No Product added to cart</h2>
        ) : (
          <div className="overflow-x-scroll ">
            <table className="w-full border border-gray-300 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border">Image</th>
                  <th className="p-3 border">Product</th>
                  <th className="p-3 border">Price</th>
                  <th className="p-3 border">Quantity</th>
                  <th className="p-3 border">Remove</th>
                </tr>
              </thead>

              <tbody>
                {product.map((e) => (
                  <tr key={e._id} className="hover:bg-gray-50 text-center">
                    <td className="p-3 border">
                      <img
                        src={e.image?.[0].public_url}
                        alt={e.name}
                        className="h-18 w-15 object-contain  mx-auto "
                      />
                    </td>
                    <td className="p-3 border">{e.name}</td>
                    <td className="p-3 border">₹{e.price}</td>
                    <td className="p-3 border"><InputNumber
          min={1}
          value={e.quantity || 1} 
          onChange={(val) => {
            setProduct((prev) =>
              prev.map((p) =>
                p._id === e._id ? { ...p, quantity: val } : p
              )
            );
          }}
        /></td>
        {/* <h1>{e._id}</h1> */}
         <td className="p-3 border"><button type='button' onClick={()=>handleClick(e._id)}  >Remove</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Billing Section */}
    {product.length > 0 && (
  <div className="bg-white rounded-2xl flex-none lg:w-1/3 p-6 min-h-[250px] shadow-lg border border-gray-200">
    {/* Header */}
    <div className=" text-black text-xl font-bold p-4 rounded-t-2xl mb-4 shadow-md text-center">
      Billing Summary
    </div>

    {/* Billing Details */}
    <div className="flex flex-col gap-3 text-gray-800 font-medium">
      <div className="flex justify-between items-center">
        <span>Total Unique Items:</span>
        <span className="font-semibold">{product.length}</span>
      </div>

      <div className="flex justify-between items-center">
        <span>Price:</span>
        <span className="font-semibold flex items-center gap-1">
          <FaIndianRupeeSign /> {price.toFixed(2)}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <span>Shipping:</span>
        <span className={`font-semibold ${price > 500 ? "text-green-600" : "text-red-600"}`}>
          <FaIndianRupeeSign /> {price > 500 ? 0 : 23}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <span>GST (18%):</span>
        <span className="font-semibold flex items-center gap-1">
          <FaIndianRupeeSign /> {gst.toFixed(2)}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <span>Promise Price:</span>
        <span className="font-semibold flex items-center gap-1">
          <FaIndianRupeeSign /> 12
        </span>
      </div>

      <hr className="my-2 border-gray-300" />

      <div className="flex justify-between items-center text-lg font-bold">
        <span>Total Price:</span>
        <span className="flex items-center gap-1 text-[#555555]">
          <FaIndianRupeeSign /> {totalPrice.toFixed(2)}
        </span>
      </div>
    </div>

    {/* Checkout Button */}
    <button onClick={handleCheckOut} className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-md">
      Proceed to Checkout
    </button>
  </div>
)}

    </div>
  );
}

export default MainCart;
