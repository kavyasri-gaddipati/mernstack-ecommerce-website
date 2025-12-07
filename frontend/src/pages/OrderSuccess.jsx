import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const OrderSuccess = () => {
  return (
    <div style={{textAlign: 'center', marginTop: '50px'}}>
      <FaCheckCircle style={{fontSize: '5rem', color: 'green', marginBottom: '20px'}} />
      <h1>Order Placed Successfully! 🎉</h1>
      <p style={{fontSize: '1.2rem', color: '#555'}}>Thank you for shopping with Pasovit Clothings.</p>
      <p>We have sent an email confirmation to you.</p>
      
      <Link to="/" className="btn" style={{marginTop: '30px'}}>
        Continue Shopping 🛍️
      </Link>
    </div>
  );
};

export default OrderSuccess;