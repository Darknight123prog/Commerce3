import Spiner from '@/Componets/Spiner';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Order_tracking_page() {

   const backendUrl=import.meta.env.VITE_BACKEND_URL;
const navigate=useNavigate();
const[OrderPlaced,setOrderPlaced]=useState({});
const [loading,setLoading]=useState(true);
  useEffect(()=>{
    try{
    const fetchOrder=async()=>{
      const order=await axios.get(`${backendUrl}/api/v1/payment/paypal/Order/details/secure/user`,{withCredentials:true});
      setOrderPlaced(order.data.details);
    }
     fetchOrder();
}
  catch(err){
    console.log(`erorr is ${err}`);

  }finally{
    setLoading(false);
  }    
}
 
,[])
console.log(OrderPlaced);
  if(loading){
    return(<Spiner/>)
  }

  const handleSingleOrder=(id)=>{
    navigate(`/success/secure/SingleOrder/Details/${id}`);
    console.log(id);
    
  }
  return (

<div className='max-h-full min-h-45 max-w-full min-w-full p-2 flex flex-col items-center-safe justify-center-safe'>
<div  ></div>
    {OrderPlaced.length > 0 &&
  OrderPlaced.map((obj, key) => (
    <div
    
 
      key={obj._id || key}
      className="bg-yellow-50 hover:shadow-2xl transition-all hover:shadow-accent lg:h-40 lg:w-200 h-30 p-4 mb-4 rounded-lg shadow-md"
    >
      <div onClick={()=>handleSingleOrder(obj._id)}>
      <p className="text-blue-600 font-semibold">
        Order status: {obj.OrderStatus}
      </p>
      <p className="text-gray-700 mt-1">
        Number of Products: {obj.OrderInfo?.length}
      </p>
      <p className="text-gray-700 mt-1">
       Expected Date for delivery: {new Date(obj?.deleviredAt).toLocaleString("en-IN",{
         day: "2-digit",
          month: "long",
          year: "numeric",
          // hour: "2-digit",
          // minute: "2-digit",
       })}
      </p>

      <p className="text-gray-500 mt-1 text-sm">
        Order Placed at:{" "}
        {new Date(obj?.createdAt).toLocaleString("en-IN", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </div>
  </div>
  
))
}
   
</div>

  )
}

export default Order_tracking_page
