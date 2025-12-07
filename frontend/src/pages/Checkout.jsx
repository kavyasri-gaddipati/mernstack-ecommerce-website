import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import api from '../services/api';
import { FaCreditCard, FaGooglePay, FaMoneyBillWave } from 'react-icons/fa';

const Checkout = () => {
  const { cart, fetchCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Card'); // Default Card

  // Calculate Total
  const totalPrice = cart.reduce((acc, item) => acc + item.product.price * item.qty, 0);
  const tax = Math.round(totalPrice * 0.18); // 18% Tax Mock
  const finalTotal = totalPrice + tax;

  const placeOrderHandler = async () => {
    setLoading(true);
    // Fake processing time (2 seconds) to feel real
    setTimeout(async () => {
      try {
        const orderData = {
          orderItems: cart.map(item => ({
            product: item.product._id,
            name: item.product.name,
            size: item.size,
            qty: item.qty,
            price: item.product.price
          })),
          totalPrice: finalTotal
        };

        await api.post('/orders', orderData);
        await fetchCart();
        navigate('/order-success');
        
      } catch (error) {
        alert('Order Failed! Please try again.');
      } finally {
        setLoading(false);
      }
    }, 2000);
  };

  if (cart.length === 0) return <h2>Cart is Empty.</h2>;

  return (
    <div className="payment-container">
      {/* Left Side: Payment Options */}
      <div className="payment-methods">
        <h2 style={{marginBottom: '20px'}}>Select Payment Method</h2>

        {/* Option 1: Card */}
        <div 
          className={`payment-option ${paymentMethod === 'Card' ? 'active' : ''}`}
          onClick={() => setPaymentMethod('Card')}
        >
          <FaCreditCard size={24} color="#4f46e5" />
          <div>
            <h4 style={{margin:0}}>Credit / Debit Card</h4>
            <small>Visa, Mastercard, RuPay</small>
          </div>
        </div>
        {paymentMethod === 'Card' && (
          <div className="payment-input">
            <input type="text" placeholder="Card Number" className="form-group input" style={{width:'100%', padding:'10px', marginBottom:'10px', border:'1px solid #ddd'}} />
            <div style={{display:'flex', gap:'10px'}}>
              <input type="text" placeholder="Expiry (MM/YY)" style={{width:'50%', padding:'10px', border:'1px solid #ddd'}} />
              <input type="text" placeholder="CVV" style={{width:'50%', padding:'10px', border:'1px solid #ddd'}} />
            </div>
          </div>
        )}

        {/* Option 2: UPI */}
        <div 
          className={`payment-option ${paymentMethod === 'UPI' ? 'active' : ''}`}
          onClick={() => setPaymentMethod('UPI')}
        >
          <FaGooglePay size={24} color="#e11d48" />
          <div>
            <h4 style={{margin:0}}>UPI / PhonePe / GPay</h4>
            <small>Pay directly from your bank</small>
          </div>
        </div>
        {paymentMethod === 'UPI' && (
          <div className="payment-input">
             <input type="text" placeholder="Enter UPI ID (e.g., user@upi)" style={{width:'100%', padding:'10px', border:'1px solid #ddd'}} />
             <button style={{marginTop:'10px', background:'#22c55e', color:'white', padding:'5px 10px', border:'none', borderRadius:'5px'}}>Verify</button>
          </div>
        )}

        {/* Option 3: COD */}
        <div 
          className={`payment-option ${paymentMethod === 'COD' ? 'active' : ''}`}
          onClick={() => setPaymentMethod('COD')}
        >
          <FaMoneyBillWave size={24} color="#16a34a" />
          <div>
            <h4 style={{margin:0}}>Cash on Delivery</h4>
            <small>Pay when you receive</small>
          </div>
        </div>
      </div>

      {/* Right Side: Order Summary */}
      <div className="order-summary-card">
        <h3>Order Summary</h3>
        <div style={{margin: '20px 0', borderBottom: '1px solid #eee', paddingBottom: '10px'}}>
           {cart.map(item => (
             <div key={item._id} style={{display:'flex', justifyContent:'space-between', marginBottom:'10px', fontSize:'0.9rem'}}>
               <span>{item.product.name} x {item.qty}</span>
               <span>₹{item.product.price * item.qty}</span>
             </div>
           ))}
        </div>
        
        <div style={{display:'flex', justifyContent:'space-between', marginBottom:'5px'}}>
          <span>Subtotal</span>
          <span>₹{totalPrice}</span>
        </div>
        <div style={{display:'flex', justifyContent:'space-between', marginBottom:'15px'}}>
          <span>Tax (18%)</span>
          <span>₹{tax}</span>
        </div>
        <div style={{display:'flex', justifyContent:'space-between', fontWeight:'bold', fontSize:'1.2rem', color:'#4f46e5'}}>
          <span>Total</span>
          <span>₹{finalTotal}</span>
        </div>

        <button 
          onClick={placeOrderHandler} 
          disabled={loading}
          className="btn-primary"
          style={{width: '100%', marginTop: '20px', padding: '15px'}}
        >
          {loading ? 'Processing Payment...' : `Pay ₹${finalTotal}`}
        </button>

        <p style={{fontSize: '0.8rem', color: '#999', marginTop: '15px', textAlign: 'center'}}>
          <FaCreditCard /> 100% Secure Payment
        </p>
      </div>
    </div>
  );
};

export default Checkout;