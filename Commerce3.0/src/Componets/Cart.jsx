import { useAuth } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaShoppingCart } from "react-icons/fa";
import { showError, showSuccess } from '../Utils/Toast';

function Cart({ Product ,size}) {
  const { user,cart, setCart } = useAuth();
  const navigate = useNavigate();
 const backendUrl=import.meta.env.VITE_BACKEND_URL;
 

  const handleNotSignIn = () => {
    navigate('/register');
  };

  const HandleRemoveCart = async () => {
    try {
     
      const nCart = await axios.delete(
        `${backendUrl}/api/v1/RemoveFromCart`,
        {
          data: { Product_id: Product },
          withCredentials: true,
          
        }
      );

      setCart(nCart.data.details);
     
      showSuccess("Removed from Cart");
    } catch (err) {
      showError("Cannot remove from Cart",err.message);
    }
  };

  const HandleAddCart = async () => {
    try {

      const nCart = await axios.post(
        `${backendUrl}/api/v1/add/AddtoCart`,
        { Product_id: Product ,size:size||'regular'},
        { withCredentials: true }
      );

      setCart(nCart.data.details);
      showSuccess("Added to Cart");
    } catch (err) {
      showError(`Cannot add to Cart :${err.message}`);
    }
  };

 

  if (!user) {
    return (
      <button
        onClick={handleNotSignIn}
        className="w-full/2 border-2 font-bold h-14 shadow-2xs hover:shadow-2xl hover:shadow-card-foreground flex flex-col items-center-safe justify-center-safe hover:scale-3d border-black py-2 p-3 rounded-lg hover:bg-black hover:text-white transition"
      >
        <h6 className='flex gap-1  font-bold items-center p-1' > Add to {<FaShoppingCart />}</h6>
      </button>
    );
  }

  if (user && cart.find(item => String(item.product_id)===String(Product))) {
    return (
      <button
        onClick={HandleRemoveCart}
        className="w-full/2 border-2 font-bold h-14 shadow-2xs hover:shadow-2xl hover:shadow-card-foreground flex flex-col items-center-safe justify-center-safe hover:scale-3d border-black py-2 p-3 rounded-lg hover:bg-black hover:text-white transition"
      >
        <h6 className='flex gap-1 font-bold items-center justify-center-safe  p-1' > Remove {<FaShoppingCart />}</h6>
      </button>
    );
  }

  if (user && !cart.find(item => String(item.product_id)===String(Product))) {
    return (
      <button
        onClick={HandleAddCart}
        className="w-full/2 border-2 h-14 shadow-2xs hover:shadow-2xl hover:shadow-card-foreground flex flex-col items-center-safe justify-center-safe hover:scale-3d border-black py-2 p-3 rounded-lg hover:bg-black hover:text-amber-200 transition"
      >
       <h6 className='flex gap-1 font-bold  justify-center-safe items-center p-1' > Add to {<FaShoppingCart  />}</h6>
      </button>
    );
  }
}

export default Cart;
