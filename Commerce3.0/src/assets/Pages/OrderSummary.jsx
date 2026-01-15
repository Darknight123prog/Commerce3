import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/Context/AuthContext';
import axios from 'axios';
import Tracker from '@/Componets/Tracker';
import dropin from "braintree-web-drop-in";
import { showError, showSuccess } from '@/Utils/Toast';

function OrderSummary() {
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
    try {
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

    const { data } = await axios.post(`${backendUrl}/api/v1/payment/paypal/pay/braintree/paymentGateway/secure`, {
        nonce,
        amount:totalPrice,
        shiping_info,
        productInfo,
        other_price,
        totalPrice
      },{withCredentials:true});
      alert("Payment Successful 🎉\nTransaction ID: " + data.transactionId);
      instance.clearSelectedPaymentMethod(); // Reset UI


   console.log("here is the prodduct detaisl",{productInfo:productInfo,shiping_info:shiping_info,totalPrice:totalPrice,other_price:other_price});


   


      
  }catch(err){
    err.response?.data?.error
  }finally{
    setLoading(false);
  }}

  const handleBack = () => {
    navigate('/cart/ProceedToCheckOut');
    showSuccess('Back to shipping');
  };

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
