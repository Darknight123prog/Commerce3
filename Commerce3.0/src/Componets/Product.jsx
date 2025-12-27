import React from 'react';
import { Link } from 'react-router-dom';
import Cart from './Cart';

function Product({ product }) {
  return (
    <div className="flex flex-col ml-3 w-64 items-center bg-white rounded-2xl shadow-md p-5 m-3 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

      <Link to={`/ProductDetails/${product._id}`} className="w-full">
        <div className="w-full flex flex-col gap-y-3">

          {/* Product Image */}
          <div
            className="w-full h-48 bg-gray-50 border border-gray-100
            rounded-xl flex items-center justify-center"
          >
            <img
              src={product.image[0].public_url}
              alt={product.name}
              className="h-full max-h-44 w-auto object-contain p-3"
            />
          </div>

          {/* Product Name */}
          <h5 className="text-sm font-semibold text-gray-900 line-clamp-2">
            {product.name}
          </h5>

          {/* Product Price */}
          <p className="text-lg font-bold text-emerald-600 mb-2">
            ₹{product.price}
          </p>
        </div>
      </Link>

      {/* Cart Button */}
      <div className="mt-4 w-full flex justify-center gap-4">
        <Cart Product={product._id} />
        <Cart Product={product._id} />
      </div>
    </div>
  );
}

export default Product;
