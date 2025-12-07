import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSignOutAlt, FaStore } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';
import CartContext from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  return (
    <nav className="navbar">
      <div className="container nav-container">
        {/* Colorful Logo */}
        <Link to="/" className="logo">
          <FaStore /> PASOVIT
        </Link>

        {/* Links */}
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          
          <Link to="/cart" className="cart-btn">
            <FaShoppingCart size={20} /> 
            {cart.length > 0 && (
              <span className="badge">{cart.length}</span>
            )}
          </Link>

          {user ? (
            <div style={{display:'flex', alignItems:'center', gap:'15px'}}>
              <span style={{fontSize:'0.9rem', fontWeight:'600'}}>Hi, {user.name.split(' ')[0]}</span>
              <button onClick={logout} className="btn-outline" style={{padding: '6px 15px', fontSize: '0.8rem'}}>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-primary">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;