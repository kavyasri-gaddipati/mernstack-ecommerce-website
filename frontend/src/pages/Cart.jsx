import { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../context/CartContext';
import { FaTrash, FaArrowRight, FaShoppingBag } from 'react-icons/fa';

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  const totalPrice = cart.reduce((acc, item) => acc + item.product.price * item.qty, 0);

  if (cart.length === 0) {
    return (
      <div style={{textAlign: 'center', marginTop: '80px', padding: '20px'}}>
        <div style={{fontSize: '5rem', color: '#cbd5e1', marginBottom: '20px'}}>
          <FaShoppingBag style={{display: 'inline-block'}} />
        </div>
        <h2 style={{fontSize: '2rem', marginBottom: '10px'}}>Your Cart is Empty</h2>
        <p style={{color: '#64748b', marginBottom: '30px'}}>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="hero-btn" style={{textDecoration:'none', display:'inline-block'}}>
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px', marginTop: '20px'}}>Shopping Cart ({cart.length})</h2>

      <div className="cart-layout">
        
        {/* Left: Cart Items */}
        <div className="cart-items-container">
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              <img src={item.product.image} alt={item.product.name} className="cart-img" />
              
              <div className="cart-info">
                <div className="cart-name">{item.product.name}</div>
                <div className="cart-meta">Size: <strong>{item.size}</strong> | Qty: <strong>{item.qty}</strong></div>
                
                <div className="cart-controls">
                  <span style={{fontSize: '1.2rem', fontWeight: 'bold', color: '#4f46e5'}}>₹{item.product.price * item.qty}</span>
                  
                  <button 
                    onClick={() => removeFromCart(item.product._id)} 
                    className="remove-btn"
                  >
                    <FaTrash /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Summary */}
        <div className="cart-summary">
          <h3 style={{marginBottom: '20px', fontSize: '1.2rem'}}>Order Summary</h3>
          
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{totalPrice}</span>
          </div>
          <div className="summary-row">
            <span>Shipping Estimate</span>
            <span style={{color: 'green'}}>Free</span>
          </div>
          <div className="summary-row">
            <span>Tax Estimate (18%)</span>
            <span>₹{Math.round(totalPrice * 0.18)}</span>
          </div>

          <div className="summary-total">
            <span>Order Total</span>
            <span>₹{totalPrice + Math.round(totalPrice * 0.18)}</span>
          </div>

          <Link to="/checkout">
            <button className="btn-checkout">
              Proceed to Checkout <FaArrowRight style={{marginLeft: '10px'}}/>
            </button>
          </Link>
          
          <div style={{textAlign: 'center', marginTop: '15px', fontSize: '0.8rem', color: '#94a3b8'}}>
            Secure Checkout powered by Pasovit
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;