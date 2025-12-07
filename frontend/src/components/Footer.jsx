import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPaperPlane, FaStore } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          
          {/* Column 1: Brand Info */}
          <div className="footer-col">
            <h3 className="footer-logo">
              <FaStore /> PASOVIT
            </h3>
            <p className="footer-desc">
              Elevate your style with Pasovit. We bring you the latest trends, premium quality, and sustainable fashion at affordable prices.
            </p>
            <div className="social-links">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaLinkedinIn /></a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h3>Shop</h3>
            <ul>
              <li><Link to="/">New Arrivals</Link></li>
              <li><Link to="/">Men's Fashion</Link></li>
              <li><Link to="/">Women's Collection</Link></li>
              <li><Link to="/">Kids Wear</Link></li>
              <li><Link to="/">Accessories</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="footer-col">
            <h3>Contact Us</h3>
            <ul className="contact-list">
              <li>
                <FaMapMarkerAlt className="icon" />
                <span>123 Fashion Ave, Hitech City, Hyderabad, India</span>
              </li>
              <li>
                <FaPhoneAlt className="icon" />
                <span>+91 98765 43210</span>
              </li>
              <li>
                <FaEnvelope className="icon" />
                <span>support@pasovit.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="footer-col">
            <h3>Stay Updated</h3>
            <p className="footer-desc">Subscribe to our newsletter for latest updates and offers.</p>
            <div className="newsletter-box">
              <input type="email" placeholder="Enter your email" />
              <button><FaPaperPlane /></button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Pasovit Clothings. All Rights Reserved.</p>
          <div className="payment-icons">
            <span>Visa</span>
            <span>MasterCard</span>
            <span>PayPal</span>
            <span>UPI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;