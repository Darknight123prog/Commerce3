import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HashLoader } from "react-spinners";
import Product from '../../Componets/Product';
import {  useLocation, useNavigate } from 'react-router-dom';
import Pagination from '../../Componets/Pagination';


function ProductMainPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const[page,setPage]=useState(1);
  const[totalPage,setTotalPage]=useState(null);
  const[catogary,setCatogary]=useState(undefined);
  const[totalProducts,setTotalProducts]=useState(null);
  // const [Range,setRange]=useState([0,500000]);
  // const [page,setPage]=[1];

  const { search } = useLocation();
 
 const navigate=useNavigate();
  const query = new URLSearchParams(search).get("keyword");

const handleBack=()=>{
navigate('/');

}
  useEffect(() => {
  const fetchProducts = async () => {
    setLoading(true);
    try {
      
      const res = await axios.get("http://localhost:8568/api/v1/products", {
        params: {
          keyword: query || undefined,
          catogary: catogary || undefined,
          page
        }
      });

      setProducts(res.data.details);
      setTotalPage(res.data.total_page);
      setTotalProducts(res.data.No_of_products);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, [query, page, catogary,setProducts]);

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center bg-white">
        <HashLoader color="#77e56e" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <>
      
      <div className='bg-white h-screen w-full flex flex-col justify-center items-center'>
        <button type='button' onClick={handleBack}>Back</button>
        
        <h1 className='text-xl mb-4 text-center'>Sorry, Product Not Found 😔</h1>
        <img
          src='https://res.cloudinary.com/djgboajkm/image/upload/f_auto/9318688_iwlwvb'
          className='object-contain max-h-[70vh]'
          alt="No Product"
        />
      </div>
    </>);
  }

  return (
  <div className="flex flex-col md:flex-row min-h-screen bg-[#aa98a9] gap-4 p-3 w-full">

    {/* FILTER SIDEBAR */}
    <aside className="w-full md:w-1/4 bg-[#997a8d] p-4 rounded-lg shadow-md">
      <h4 className="text-lg font-semibold mb-3 text-white">
        Categories
      </h4>

      <ul className="flex flex-col gap-2">
        {[
          "electronics",
          "shoes",
          "watches",
          "Mobile Phones",
          "women wear",
        ].map((item) => (
          <li key={item}>
            <button
              onClick={() => setCatogary(item)}
              className={`w-full text-left px-3 py-2 rounded-md transition
                ${
                  catogary === item
                    ? "bg-white text-[#997a8d] font-semibold"
                    : "bg-[#b497a8] text-white hover:bg-white hover:text-[#997a8d]"
                }`}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </aside>

    {/* PRODUCTS SECTION */}
    <main className="w-full md:w-3/4 bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-semibold">Best Sellers</h5>
        {query && (
          <span className="text-sm text-gray-600">
           
          </span>
        )}
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((prod) => (
          <Product key={prod._id} product={prod} />
        ))}
      </div>

      {/* PAGINATION */}
      <div className="mt-6 flex justify-center">
        <Pagination
          currentPage={page}
          totalPages={totalPage}
          onPageChange={setPage}
        />
      </div>
    </main>
  </div>
);

}

export default ProductMainPage;
