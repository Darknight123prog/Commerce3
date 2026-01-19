import DeleiverySatatus from '@/Componets/DeleiverySatatus';
import Spiner from '@/Componets/Spiner';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaCheckCircle } from "react-icons/fa";
import { FaBell } from "react-icons/fa";

function SingleOrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [loading, setLoading] = useState(true);
  const handleCancel=(id)=>{
    console.log(id);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const order_data = await axios.get(
          `${backendUrl}/api/v1/payment/paypal/SingleOrder/details/secure/user/${id}`,
          { withCredentials: true }
        );
        setOrder(order_data.data.details);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Spiner />;

  return (
    id && (
      <div className="min-h-screen w-full bg-amber-100 rounded-2xl shadow-md m-4 p-6">
        <div className="flex flex-col items-center gap-6">

          <h1 className="text-2xl font-semibold text-accent-foreground">
            Confirm Order Details
          </h1>

          {/* SHIPPING INFO + IMAGE */}
          <div className="lg:min-w-7xl  lg:max-w-4xl bg-white rounded-2xl shadow-lg p-5">
            <div className="flex flex-col lg:flex-row gap-6">

              {/* LEFT : SHIPPING INFO */}
              <div className="flex-1 lg:w-max-100 lg:h-min-200 bg-amber-50 p-4 rounded-xl space-y-1">
                <h2 className="font-semibold text-lg">Shipping Info</h2>

                <p>Address: {order.shiping_info.address}</p>
                <p>City: {order.shiping_info.city}</p>
                <p>State: {order.shiping_info.state}</p>
                <p>Contact: {order.shiping_info.phoneNumber}</p>
                <p>Total Price: ₹ {Number(order.totalPrice).toFixed(2)}</p>

                <div className="flex items-center gap-2 mt-2">
                  <span>Payment:</span>
                  {order.Payment_status === "submitted_for_settlement" ? (
                    <FaCheckCircle className="text-green-500 text-xl" />
                  ) : (
                    <span className="text-red-500">Not Done</span>
                  )}
                </div>
              </div>

              {/* RIGHT : IMAGE */}
              <div className="w-full lg:w-56 flex items-center justify-center">
                <div className="h-50 w-50 shadow-2xl shadow-accent-foreground rounded-xl overflow-hidden bg-transparent ">
                  <img
                    src="https://res.cloudinary.com/djgboajkm/image/upload/f_auto/q_auto/v1768645864/deleivery_qnjpqc.png"   // replace with your image path
                    alt="Delivery"
                    className="w-full h-full shadow-accent bg-transparent rounded-2xl object-contain p-2"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* DELIVERY STATUS */}
          <div className="h-32 w-full flex items-center justify-center">
            <DeleiverySatatus status={order.OrderStatus} />
          </div>

          {/* EXPECTED DELIVERY */}
          <div className="bg-white flex  items-center justify-center p-4 rounded-2xl shadow-md">
            <h1 className="font-medium">
              Expected Delivery Date{" "}
              {new Date(order.deleviredAt).toLocaleString("en-IN", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </h1>
            
            <button type='button' onClick={handleCancel} className=' h-10 hover:bg-red-500 text-shadow-2xs hover:shadow-2xl flex flex-col items-center-safe justify-center-safe hover:shadow-accent-foreground bg-white font-semibold border-2 border-accent-foreground hover:text-black  w-30 p-1 m-4 ml-7 rounded-md '>
             Cancel Order 
            </button><FaBell />

          </div>

          {/* PRODUCTS SECTION */}
          <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-5">
            <h2 className="text-xl font-semibold mb-4">
              Ordered Products
            </h2>

            <div className="max-h-96 overflow-y-auto space-y-3 pr-2">
              {order?.OrderInfo?.length > 0 &&
                order.OrderInfo.map((prod) => (
                  <div
                    key={prod._id}
                    className="flex gap-4 bg-amber-100 rounded-xl p-4 items-center"
                  >
                    <div className="h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-full h-full object-contain rounded-md"
                      />
                    </div>

                    <div className="flex-1 space-y-1">
                      <h3 className="font-semibold">{prod.name}</h3>
                      <p>Price: ₹ {prod.price}</p>
                      <p>Quantity: {prod.quantity}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

        </div>
      </div>
    )
  );
}

export default SingleOrderDetails;
