import { Link } from 'react-router-dom';
import { FaShoppingCart, FaEye } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  return (
    <div className="card">
      <Link to={`/product/${product._id}`}>
        <div className="card-img-wrap">
          <img src={product.image} alt={product.name} />
        </div>
      </Link>

      <div className="card-content">
        <div className="card-cat">{product.category}</div>
        <h3 className="card-title">{product.name}</h3>
        
        <div className="card-footer">
          <span className="price">₹{product.price}</span>
          
          <Link to={`/product/${product._id}`} className="add-btn">
             <FaShoppingCart />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;