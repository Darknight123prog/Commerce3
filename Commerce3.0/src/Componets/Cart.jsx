import { useAuth } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaShoppingCart } from "react-icons/fa";
import { showError, showSuccess } from '../Utils/Toast';

function Cart({ Product }) {
  const { user,cart, setCart } = useAuth();
  const navigate = useNavigate();

  const handleNotSignIn = () => {
    navigate('/register');
  };

  const HandleRemoveCart = async () => {
    try {
      const nCart = await axios.delete(
        "http://localhost:8568/api/v1/RemoveFromCart",
        {
          data: { Product_id: Product },
          withCredentials: true,
          
        }
      );
      setCart(nCart.data.details);
      showSuccess("Removed from Cart");
    } catch (err) {
      showError("Cannot remove from Cart");
    }
  };

  const HandleAddCart = async () => {
    try {
      const nCart = await axios.post(
        "http://localhost:8568/api/v1/add/AddtoCart",
        { Product_id: Product },
        { withCredentials: true }
      );
      setCart(nCart.data.details);
      showSuccess("Added to Cart");
    } catch (err) {
      showError("Cannot add to Cart :");
    }
  };

 

  if (!user) {
    return (
      <button
        onClick={handleNotSignIn}
        className="w-auto border-2 border-black py-2 rounded-lg hover:bg-black hover:text-white transition"
      >
        <h6 className='flex gap-1 items-center p-1' > Add to {<FaShoppingCart />}</h6>
      </button>
    );
  }

  if (user && cart.includes(Product)) {
    return (
      <button
        onClick={HandleRemoveCart}
        className="w-full border-2 border-black py-2 rounded-lg hover:bg-black hover:text-white transition"
      >
        <h6 className='flex gap-1 items-center p-1' > Remove from {<FaShoppingCart />}</h6>
      </button>
    );
  }

  if (user && !cart.includes(Product)) {
    return (
      <button
        onClick={HandleAddCart}
        className="w-full border-2 border-black py-2 rounded-lg hover:bg-black hover:text-white transition"
      >
       <h6 className='flex gap-1 items-center p-1' > Add to {<FaShoppingCart />}</h6>
      </button>
    );
  }
}

export default Cart;
