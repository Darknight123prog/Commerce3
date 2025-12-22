import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HashLoader } from "react-spinners";
import Product from '../../Componets/Product';
import { useLocation } from 'react-router-dom';
import Filter from '../../Componets/Filter';

function ProductMainPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { search } = useLocation();
  const query = new URLSearchParams(search).get("keyword");
  const filter = new URLSearchParams(search).get("catogary");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:8568/api/v1/products`, {
          params: {
            keyword: query || undefined,
            catogary: filter || undefined
          }
        });
        console.log(query, filter);
        setProducts(res.data.details);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query, filter]);

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center bg-white">
        <HashLoader color="#77e56e" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className='bg-white h-screen w-full flex flex-col justify-center items-center'>
        <h1 className='text-xl mb-4 text-center'>Sorry, Product Not Found 😔</h1>
        <img
          src='https://res.cloudinary.com/djgboajkm/image/upload/f_auto/9318688_iwlwvb'
          className='object-contain max-h-[70vh]'
          alt="No Product"
        />
      </div>
    );
  }

  return (
    <div className='flex flex-col md:flex-row h-auto bg-[#aa98a9] gap-4 p-3 w-full'>
      
      {/* Filters */}
      <div className='w-full md:w-1/4 bg-[#997a8d] p-3 rounded-md'>
     <div>
      <h5>Price Range</h5>
       <input type='range' min={20} max={10000000} />
        </div>
      </div>

      {/* Products */}
      <div className='w-full md:w-3/4 bg-white p-3 rounded-md'>
        <h5 className='text-lg font-semibold mb-3'>Best Seller</h5>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {products.map(prod => (
            <Product key={prod._id} product={prod} />
          ))}
        </div>
      </div>

    </div>
  );
}

export default ProductMainPage;
