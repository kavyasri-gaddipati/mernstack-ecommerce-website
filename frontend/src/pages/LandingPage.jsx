import { Link } from 'react-router-dom';
import { FaShoppingBag, FaUserPlus, FaSignInAlt } from 'react-icons/fa';

const LandingPage = () => {
  return (
    <div className="landing-container" style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '20px'
    }}>
      
      {/* Hero Icon */}
      <div style={{
        fontSize: '4rem',
        color: '#4f46e5',
        marginBottom: '20px',
        animation: 'float 3s ease-in-out infinite'
      }}>
        <FaShoppingBag />
      </div>

      {/* Title */}
      <h1 style={{
        fontSize: '3.5rem',
        fontWeight: '800',
        marginBottom: '15px',
        background: 'linear-gradient(to right, #4f46e5, #ec4899)',
        WebkitBackgroundClip: 'text',
        color: 'transparent'
      }}>
        Welcome to Pasovit
      </h1>

      {/* Description */}
      <p style={{
        fontSize: '1.2rem',
        color: '#64748b',
        maxWidth: '600px',
        marginBottom: '40px',
        lineHeight: '1.8'
      }}>
        Discover the latest trends in fashion. Join our community to access exclusive collections, 
        premium deals, and a seamless shopping experience.
      </p>

      {/* Action Buttons */}
      <div style={{display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center'}}>
        <Link to="/login" className="btn-primary" style={{
          padding: '15px 40px', 
          fontSize: '1.1rem',
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px',
          textDecoration: 'none'
        }}>
          <FaSignInAlt /> Login Now
        </Link>

        <Link to="/register" className="btn-outline" style={{
          padding: '15px 40px', 
          fontSize: '1.1rem',
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px',
          textDecoration: 'none',
          borderWidth: '2px'
        }}>
          <FaUserPlus /> Register
        </Link>
      </div>

      {/* Floating Animation Style */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;