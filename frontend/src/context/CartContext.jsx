import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import api from '../services/api';
import AuthContext from './AuthContext'; 

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user } = useContext(AuthContext); // User login status
  const navigate = useNavigate();

  
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart([]); 
    }
  }, [user]);

  // 1. Get Cart Items
  const fetchCart = async () => {
    try {
      const { data } = await api.get('/cart');
      setCart(data.items || []); 
    } catch (error) {
      console.error("Error fetching cart", error);
    }
  };

  // 2. Add to Cart
  const addToCart = async (productId, size, qty) => {
    if (!user) {
      alert("Please Login to add items to Cart! 🔐");
      navigate('/login');
      return;
    }

    try {
      await api.post('/cart/add', { productId, size, qty });
      await fetchCart(); 
      alert("Item Added to Cart! 🛒");
    } catch (error) {
      console.error("Error adding to cart", error);
      alert("Error adding item");
    }
  };

  // 3. Remove Item
  const removeFromCart = async (productId) => {
    try {
      await api.delete(`/cart/remove/${productId}`);
      await fetchCart(); // Update cart
    } catch (error) {
      console.error("Error removing item", error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;