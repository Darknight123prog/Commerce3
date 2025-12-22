import React from 'react';
import {Link} from 'react-router-dom'
import SingleProductDetails from '../assets/Pages/SingleProductDetails';
function Product({ product }) {
  // console.log(product)
  return (
    <Link to={`/ProductDetails/${product._id}`} >
    <div className=" rounded-lg shadow-md p-8 bg-white gap-2 w-60 m-2 hover:shadow-xl transition-shadow">
      {/* Product Image */}
      <img
        src={product.image[0].public_url}   // image from prop
        alt={product.name}
        className="w-full h-40  object-contain rounded-md mb-2"
      />

      {/* Product Name */}
      <h5 className="text-lg font-semibold mb-1 ">{product.name}</h5>
      {/* catogory */}
      {/* <p>catogary : {product.catogary}</p> */}

      {/* rating */}
      {/* <p>Rating : {product.rating.toFixed(2)}</p> */}


      {/* Product Price */}
      <p className="text-gray-600">₹{product.price}</p>
      
    </div>
    </Link>
  );
}

export default Product;
