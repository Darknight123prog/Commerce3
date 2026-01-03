import React, { useEffect, useState } from "react";
import { InputNumber } from "antd";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function BuyNow() {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  // Load product from sessionStorage
  useEffect(() => {
    const prod = JSON.parse(sessionStorage.getItem("product_id"));
    if (prod) {
      setProduct(prod);
      setQuantity(prod.quantity || 1);
    }
  }, []);

  if (!product) {
    return <h2 className="text-center mt-10 text-xl">No Product added to cart</h2>;
  }

  // ✅ Derived values (AUTO UPDATE)
  const basePrice = product.price * quantity;
  const gst = basePrice * 0.18;
  const shipping = basePrice > 500 ? 0 : 23;
  const promisePrice = 12;
  const totalPrice = basePrice + gst + shipping + promisePrice;

  // Quantity handler
  const handleQuantityChange = (val) => {
    setQuantity(val);
  };

  // Checkout handler
  const handleCheckOut = () => {
    const priceData = {
      price: basePrice,
      gst,
      shipping,
      other_price:promisePrice,
      quantity,
      totalPrice,
    };

    sessionStorage.setItem("price", JSON.stringify(priceData));
    navigate("/cart/ProceedToCheckOut");
  };

  return (
    <div className="flex flex-col lg:flex-row p-4 bg-[#FFF0E5] gap-4">
      {/* Product Section */}
      <div className="bg-white rounded-2xl flex-1 p-4 overflow-x-auto">
        <h1 className="text-xl font-semibold mb-4">Product in Cart</h1>

        <table className="w-full border rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Image</th>
              <th className="p-3 border">Product</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center hover:bg-gray-50">
              <td className="p-3 border">
                <img
                loading="lazy"  
                  src={product.imgUrl}
                  alt={product.name}
                  className="h-20 w-20 object-contain mx-auto"
                />
              </td>
              <td className="p-3 border">{product.name}</td>
              <td className="p-3 border">₹{product.price}</td>
              <td className="p-3 border">
                <InputNumber
                  min={1}
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Billing Section */}
      <div className="bg-white rounded-2xl lg:w-1/3 p-6 shadow-lg border">
        <h2 className="text-xl font-bold mb-4 text-center">
          Billing Summary
        </h2>

        <div className="flex flex-col gap-3 text-gray-800 font-medium">
          <div className="flex justify-between">
            <span>Quantity:</span>
            <span className="font-semibold">{quantity}</span>
          </div>

          <div className="flex justify-between">
            <span>Base Price:</span>
            <span className="flex items-center gap-1 font-semibold">
              <FaIndianRupeeSign /> {basePrice.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Shipping:</span>
            <span
              className={`flex items-center gap-1 font-semibold ${
                shipping === 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              <FaIndianRupeeSign /> {shipping}
            </span>
          </div>

          <div className="flex justify-between">
            <span>GST (18%):</span>
            <span className="flex items-center gap-1 font-semibold">
              <FaIndianRupeeSign /> {gst.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Promise Price:</span>
            <span className="flex items-center gap-1 font-semibold">
              <FaIndianRupeeSign /> {promisePrice}
            </span>
          </div>

          <hr />

          <div className="flex justify-between text-lg font-bold">
            <span>Total Price:</span>
            <span className="flex items-center gap-1">
              <FaIndianRupeeSign /> {totalPrice.toFixed(2)}
            </span>
          </div>
        </div>

        <button
          onClick={handleCheckOut}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default BuyNow;
