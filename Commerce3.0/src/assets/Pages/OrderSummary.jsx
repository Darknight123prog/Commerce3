import Tracker from '@/Componets/Tracker'
import { showError, showSuccess } from '@/Utils/Toast';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function OrderSummary() {
  const navigate=useNavigate();
  const handleBack=()=>{
      try{
      navigate('/cart/ProceedToCheckOut');
      showSuccess('back to shipping');
      }catch(err){
        showError(`Cannot go back : ${err}`);
      }
    }
  const [price, setPrice] = useState({
    price: 0,
    gst: 0,
    other_price: 0,
    totalPrice: 0,
    discount_price:0
    
  })
  const [address, setAddress] = useState({})

  useEffect(() => {
    const storedPrice = JSON.parse(sessionStorage.getItem('price')) || price
    const storedAddress = JSON.parse(sessionStorage.getItem('address')) || address
    setPrice(storedPrice)
    console.log(JSON.parse(sessionStorage.getItem('price')))
    setAddress(storedAddress)
  }, [])

  return (
    <div className="min-h-screen bg-[url('https://res.cloudinary.com/djgboajkm/image/upload/f_auto/20944051_io6wgm')] bg-cover bg-center flex flex-col items-center p-2">

      {/* Tracker */}
      <div className="w-full max-w-4xl mb-6 p-2 h-20 flex items-center justify-center bg-amber-50 rounded-2xl">
        <Tracker
          st1="finish"
          st2="finish"
          st3="process"
          st4="wait"
          st5="wait"
          className="w-full text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-base"
        />
      </div>

      {/* Title */}
      <div className="w-full max-w-4xl backdrop-blur-md bg-white/20  rounded-2xl py-4 sm:py-6 text-center text-base sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-4" >
      <div className="w-full max-w-4xl  bg-amber-500 rounded-2xl py-4 sm:py-6 text-center text-base sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-4">
        Order Summary
      </div>

      {/* Amount Table */}
      <div className="w-full max-w-4xl mb-4 bg-white/80 rounded-xl overflow-x-auto">
        <h2 className="text-center font-semibold text-xs sm:text-sm md:text-base mb-2">
          Amount to Pay
        </h2>
        <table className="w-full table-auto text-xs sm:text-sm md:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 py-1">Subtotal</th>
               <th className="px-2 py-1">Discount Price</th>
              
              <th className="px-2 py-1">GST (18%)</th>
              <th className="px-2 py-1">Other</th>
              <th className="px-2 py-1">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center hover:bg-gray-50">
              <td className="px-2 py-1">₹{price.price.toLocaleString("en-IN")}</td>
              <td className="px-2 py-1">₹{price.discount_price}</td>
              <td className="px-2 py-1">₹{price.gst.toLocaleString("en-IN")}</td>
              <td className="px-2 py-1">₹{price.other_price.toLocaleString("en-IN")}</td>
              <td className="px-2 py-1 font-semibold">₹{price.totalPrice.toLocaleString("en-IN")}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Shipping Table */}
      <div className="w-full max-w-4xl mb-24 bg-white/80 rounded-xl overflow-x-auto">
        <h2 className="text-center font-semibold text-xs sm:text-sm md:text-base mb-2">
          Shipping Details & Contact
        </h2>
        <table className="w-full table-auto text-xs sm:text-sm md:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 py-1">Country</th>
              <th className="px-2 py-1">State</th>
              <th className="px-2 py-1">City</th>
              <th className="px-2 py-1">Name</th>
              <th className="px-2 py-1">Phone</th>
               <th className="px-2 py-1">LandMark</th>
            </tr>
          </thead>
          <tbody>
            
            <tr className="text-center hover:bg-gray-50">
              <td className="px-2 py-1">{address.country}</td>
              <td className="px-2 py-1">{address.state}</td>
              <td className="px-2 py-1">{address.city}</td>
              <td className="px-2 py-1">{address.name}</td>
              <td className="px-2 py-1">{address.phone}</td>
              <td className="px-2 py-1">{address.Landmark}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Sticky Pay Button */}
      <div className="fixed bottom-0 left-0 w-full border-t p-2 sm:p-4 backdrop-blur-md bg-white/20">
        <button
          type="button"
          className="w-full max-w-3xl mx-auto block bg-amber-500 text-black py-2 sm:py-3 rounded-xl font-semibold hover:bg-blue-500 hover:shadow-md   transition text-xs sm:text-sm md:text-base lg:text-lg"
        >
          Pay Now : ₹ {price.totalPrice.toLocaleString("en-IN")}
        </button>
        
      </div>
      
    </div>
    <button onClick={handleBack} className='px-6 py-2 max-w-40 rounded-lg bg-[#7F00FF] text-white font-semibold 
                   hover:bg-blue-700 active:scale-95 transition-all duration-200
                   shadow-md hover:shadow-lg' type='button' >Back to Cart</button>
                  

      </div>
  )
}

export default OrderSummary
