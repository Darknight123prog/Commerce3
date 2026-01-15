import React, { useEffect, useRef, useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { useAuth } from '@/Context/AuthContext';
import axios from 'axios';
import Tracker from '@/Componets/Tracker';
import dropin from "braintree-web-drop-in";
import { showError, showInfo, showSuccess } from '@/Utils/Toast';
import Spiner from '@/Componets/Spiner';
import { toast } from 'react-toastify';

function OrderSummary() {
  const [count,setCount]=useState(8);
  const[paymentSucess,setPaymentSucess]=useState(false)
  const [PayLoading,setPayLoading]=useState(false);
  // const [Transaction_id,setTransaction_id]=useState(null);
  const { user } = useAuth();
  const [clientToken, setClientToken] = useState(null);
  const [instance, setInstance] = useState(null);
  const [loading,setLoading]=useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
 const dropinContainer = useRef(null);
  const [OrderInfo, setOrderInfo] = useState([]);


  const [price, setPrice] = useState({
    price: 0,
    gst: 0,
    other_price: 0,
    totalPrice: 0,
    discount_price: 0
  });
  const [address, setAddress] = useState({});

useEffect(() => {
  if (!paymentSucess) return; // only run after payment success

  setPayLoading(false); 

  const timer = setInterval(() => {
    setCount((prev) => {
      if (prev <= 1) {
        clearInterval(timer);            
        navigate('/success/secure/OrderList'); // redirect
        return 0;                        
      }
      return prev - 1;                  
    });
  }, 1000);

  return () => clearInterval(timer);      
}, [paymentSucess, navigate]);


  // const [shippingInfo, setShippingInfo] = useState({});
  useEffect(() => {
    axios.get(`${backendUrl}/api/v1/payment/paypal/pay/getToken`,{withCredentials:true}).then((res) => {
      setClientToken(res.data.clientToken);
    });
  }, []);

  // Initialize Drop-in manually
  useEffect(() => {
    if (clientToken && dropinContainer.current) {
      dropin.create(
        {
          authorization: clientToken,
          container: dropinContainer.current,
        },
        (err, dropinInstance) => {
          if (err) {
            console.error(err);
            return;
          }
          setInstance(dropinInstance);
          console.log("Drop-in instance ready:", dropinInstance);
        }
      );
    }
  }, [clientToken]);


  useEffect(() => {
    const storedPrice = JSON.parse(sessionStorage.getItem('price')) || price;
    const storedAddress = JSON.parse(sessionStorage.getItem('address')) || {};
    const storedProducts = JSON.parse(sessionStorage.getItem('productArray')) || [];
    console.log("the address is :",JSON.parse(sessionStorage.getItem('address')));
    console.log("the price array is :",JSON.parse(sessionStorage.getItem('price')));
    console.log("the cart array is : ",JSON.parse(sessionStorage.getItem('productArray')));

    setPrice(storedPrice);
    setOrderInfo(storedProducts);
    setAddress(storedAddress);

    
  }, []);

  // -------------------- PAY NOW HANDLER --------------------
  const handlePayNow = async () => {
   
if (!instance) return alert("Payment UI not ready");
 setLoading(true);
 const { nonce } = await instance.requestPaymentMethod();



      //here is the data that i have to send duriong the payment process
    const shiping_info={
      address: address.Landmark || '',
      city: address.city || '',
      state: address.state || '',
      phoneNumber:address.phone
    };

   const productInfo=OrderInfo.map((prod)=>({name:prod.name,price:prod.price,quantity:prod.quantity,Product_id:prod.Product_id,image:prod.image}));
    const totalPrice=price.totalPrice;
    const other_price=price.other_price;
    console.log('here is the nonce',nonce);

    setPayLoading(true);
     try {
    const { data } = await axios.post(`${backendUrl}/api/v1/payment/paypal/pay/braintree/paymentGateway/secure`, {
        nonce,
        shiping_info,
        productInfo,
        amount:totalPrice.toFixed(2),
        other_price,
        totalPrice
      },{withCredentials:true});
setPaymentSucess(true);
setPayLoading(false);
console.log(data);

showInfo(`payment is done sucessfully with transcation id ${data.transactionId}`);

// setPaymentSucess(true);

     

      instance.clearSelectedPaymentMethod(); // Reset UI
}catch(err){
   console.log(err);
  }finally{
    setLoading(false);
  }}
// setPaymentSucess(true);
  //  console.log("here is the prodduct detaisl",{productInfo:productInfo,shiping_info:shiping_info,totalPrice:totalPrice,other_price:other_price});


   


      
  

  const handleBack = () => {
    navigate('/cart/ProceedToCheckOut');
    showSuccess('Back to shipping');
  };

  if(PayLoading){
   return( <div className='flex h-screen w-screen flex-col items-center-safe justify-items-center '>
   <h1>Payment is in process ......</h1>
   <Spiner/></div>);
  }
  // if(PaymentSucess){
  //   return(<div className='flex h-screen w-screen flex-col items-center-safe justify-items-center '>
  //    <h1> Payment is sucessfully done </h1>
  //    <h4>transactionId is : {Transaction_id}</h4>

  //   </div>)
  // }


  if (paymentSucess) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-yellow-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 text-center animate-fadeIn">

        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-green-700">
          Payment Successful
        </h2>

        {/* Countdown */}
        <p className="mt-3 text-gray-600 text-sm">
          Redirecting to <span className="font-medium">Order Status</span> in
        </p>

        <div className="mt-4 text-4xl font-bold text-amber-500">
          {count}
        </div>

        {/* Warning */}
        <p className="mt-4 text-xs text-red-500 font-medium">
          ⚠ Do not refresh or leave this page
        </p>

        {/* Loader */}
        <div className="mt-5 flex justify-center">
          <div className="h-8 w-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
}


  return (
    <div className="min-h-screen bg-[url('https://res.cloudinary.com/djgboajkm/image/upload/f_auto/20944051_io6wgm')] bg-cover bg-center flex flex-col items-center p-2">

      {/* Tracker */}
      <div className="w-full max-w-4xl mb-6 p-2 h-20 flex items-center justify-center bg-amber-50 rounded-2xl">
        <Tracker st1="finish" st2="finish" st3="process" st4="wait" st5="wait" className="w-full text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-base"/>
      </div>

      {/* Order Summary */}
      <div className="w-full max-w-4xl bg-amber-500 rounded-2xl py-4 text-center font-semibold mb-4">
        Order Summary
      </div>

      {/* Amount Table */}
      <div className="w-full max-w-4xl mb-4 bg-white/80 rounded-xl overflow-x-auto">
        <h2 className="text-center font-semibold text-base mb-2">Amount to Pay</h2>
        <table className="w-full table-auto text-base">
          <thead className="bg-gray-100">
            <tr>
              <th>Subtotal</th>
              <th>Discount</th>
              <th>GST (18%)</th>
              <th>Other</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center hover:bg-gray-50">
              <td>₹{price.price.toLocaleString("en-IN")}</td>
              <td>₹{price.discount_price.toLocaleString("en-IN")}</td>
              <td>₹{price.gst.toLocaleString("en-IN")}</td>
              <td>₹{price.other_price.toLocaleString("en-IN")}</td>
              <td className="font-semibold">₹{price.totalPrice.toLocaleString("en-IN")}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Shipping Table */}
      <div className="w-full max-w-4xl mb-24 bg-white/80 rounded-xl overflow-x-auto">
        <h2 className="text-center font-semibold text-base mb-2">Shipping Details & Contact</h2>
        <table className="w-full table-auto text-base">
          <thead className="bg-gray-100">
            <tr>
              <th>Country</th>
              <th>State</th>
              <th>City</th>
              <th>Name</th>
              <th>Phone</th>
              <th>LandMark</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center hover:bg-gray-50">
              <td>{address.country}</td>
              <td>{address.state}</td>
              <td>{address.city}</td>
              <td>{address.name}</td>
              <td>{address.phone}</td>
              <td>{address.Landmark}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div ref={dropinContainer} className="mb-4"></div>

      {/* Pay Now Button */}
      <div className="fixed bottom-0 left-0 w-full border-t p-2 sm:p-4 backdrop-blur-md bg-white/20">
        <button
          onClick={handlePayNow}
          className="w-full max-w-3xl mx-auto block bg-amber-500 text-black py-3 rounded-xl font-semibold hover:bg-yellow-600 transition text-base"
        >
          Pay Now : ₹{price.totalPrice.toLocaleString("en-IN")}
        </button>
      </div>

      {/* Back Button */}
      <button   disabled={!instance || loading} onClick={handleBack} className='px-6 py-2 max-w-40 rounded-lg bg-[#7F00FF] text-white font-semibold hover:bg-blue-700 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg my-4'>
        Back to Cart
      </button>
    </div>
  );
}

export default OrderSummary;
