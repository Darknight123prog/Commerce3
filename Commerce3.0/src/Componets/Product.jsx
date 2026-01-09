import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cart from './Cart';
import { useAuth } from '@/Context/AuthContext';
import { showInfo, showSuccess, showWarning } from '@/Utils/Toast';
import Button from '@/Componets/Button';



function Product({ product,isUpdate }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const update=isUpdate||false;
  const handleUpdate=(_id)=>{
  sessionStorage.setItem('update_id',JSON.stringify(_id));

  showInfo('redirecting to Update Prouct Form');
  navigate('/auth/admin/MainAdmin/updateProduct/UpdateForm')
}

  const handleBuy = () => {
    if (!user) {
      showWarning('Need to log in first');
      navigate('/login');
    } else {
      const prod = {
        imgUrl: product.image[0].public_url,
        _id: product._id,
        name: product.name,
        price: product.price,
        quantity: product.quantity || 1,
      };
      sessionStorage.setItem('product_id', JSON.stringify(prod));
      navigate('/cart/buyNow');
    }
  };

  return (
    <div className="w-full min-w-0 rounded-xl bg-white p-3 shadow-accent-foreground hover:shadow-lg transition flex flex-col">
      <Link to={`/ProductDetails/${product._id}`} className="w-full flex flex-col">
        {/* Product Image */}
        <div className="w-full h-48 sm:h-44 md:h-40 bg-white   rounded-xl flex items-center justify-center">
          <img
         
            src={product.image[0].public_url}
            alt={product.name}
            loading="lazy"  
            className="h-full max-h-44 w-auto object-contain p-2 sm:p-3"
          />
        </div>

        {/* Product Name */}
        <h5 className="text-base sm:text-base font-semibold text-gray-900 line-clamp-2 mt-2">
          {product.name}
        </h5>

        {/* Product Price */}
        {!product.discount || product.discount==0?(<p className="text-base sm:text-sm font-bold text-emerald-600 mt-1">
          ₹{product.price.toLocaleString("en-IN")}
        </p>):(
          <div>
           <p className="text-stone-700 line-through font-semibold">₹ {product.price.toLocaleString("en-IN")}</p>
             <p className="text-amber-500  font-semibold">{product.discount}% off</p>
               <p className="text-black  font-semibold">₹ {(product.price -product.price*0.01*product.discount).toLocaleString("en-IN")}</p>

          </div>
        )}
        <div>
      {product.discount && product.discount<20 &&<div className='h-7 text-[0.5rem] flex flex-col shadow-2xl p-1  items-center-safe justify-center-safe mt-6 w-17 rounded-md text-green-950 font-bold bg-green-400'>
          Hot Deal
        </div>} 
       {product.discount && product.discount>20 &&<div className='h-7 text-[0.5rem] flex flex-col shadow-2xl p-1  items-center-safe justify-center-safe mt-6 w-20 rounded-md text-red-950 font-bold bg-red-500'>
          Super Hot Deal
        </div>} 
        </div>
       
        
      </Link>

      {!update?(
      <div className="mt-4 w-full flex flex-col sm:flex-row gap-2 sm:gap-4">
        <Cart Product={product._id} className="flex-1" />
        <button
          type="button"
          onClick={handleBuy}
          className="
            flex-1
            relative overflow-hidden
            px-4 sm:px-6 py-2 sm:py-3
            rounded-xl
            
            bg-gradient-to-r from-amber-500 to-orange-500
            text-white font-semibold text-base sm:text-lg
            shadow-lg
           
            transition-all
            hover:scale-105 hover:shadow-2xl
            active:scale-95
          "
        >
          Buy
        </button>
      </div>
      ):(<div>
        <div onClick={()=>handleUpdate(product._id)}>
          <Button  text='Update Product'  />

        </div>
      </div>)}
      
    </div>
  );
}

export default Product;
