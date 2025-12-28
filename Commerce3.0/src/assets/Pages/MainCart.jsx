import { showError } from '@/Utils/Toast';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PacmanLoader from "react-spinners/PacmanLoader";
import { InputNumber } from "antd";

function MainCart() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCartProduct = async () => {
      try {
        const res = await axios.get(
          'http://localhost:8568/api/v1/add/GetCartList',
          { withCredentials: true }
        );
        setProduct(res.data.details || []);
      } catch (err) {
        showError(`Error occurred: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    getCartProduct();
  }, []);

 
  if (loading) {
    return (
      <div className="flex h-[40rem] w-full items-center justify-center">
        <PacmanLoader color="#36454F" />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row p-4 bg-[#C4C4C4] gap-4">

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
          value={e.quantity || 1} // controlled
          onChange={(val) => {
            setProduct((prev) =>
              prev.map((p) =>
                p._id === e._id ? { ...p, quantity: val } : p
              )
            );
          }}
        /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Billing Section */}
    {product.length>0&&  <div className="bg-[#E6E6FF] rounded-2xl flex-none lg:w-1/3 p-4 min-h-[200px]">
       <h2> Billing section</h2>
       
      </div>
}
    </div>
  );
}

export default MainCart;
