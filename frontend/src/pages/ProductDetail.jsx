import { useEffect, useState, useContext } from 'react'; // useContext add chesam
import { useParams } from 'react-router-dom';
import api from '../services/api';
import CartContext from '../context/CartContext'; // Cart Context import chesam

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // User Selection
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');

  // Cart Context nundi 'addToCart' function tiskunnam
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
        setLoading(false);
        // Default ga first size select avvali
        if(data.sizes && data.sizes.length > 0) setSize(data.sizes[0]);
      } catch (error) {
        console.error("Error fetching product", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Kotha Add to Cart Logic
  const addToCartHandler = () => {
    if (!size) {
      alert('Please select a size');
      return;
    }
    // Context dwara Cart lo add chestunnam
    addToCart(product._id, size, qty);
  };

  if (loading) return <h2 style={{textAlign: 'center', marginTop:'20px'}}>Loading... ⏳</h2>;
  if (!product) return <h2>Product not found</h2>;

  return (
    <div className="product-detail-container">
      {/* Left Side: Image */}
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>

      {/* Right Side: Details */}
      <div className="product-info">
        <h2>{product.name}</h2>
        <p className="price">₹{product.price}</p>
        <p>{product.description}</p>

        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Status:</strong> {product.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>

        {product.stock > 0 && (
          <>
            {/* Size Selector */}
            <div style={{marginTop: '20px'}}>
              <label>Select Size:</label>
              <select 
                className="form-select" 
                value={size} 
                onChange={(e) => setSize(e.target.value)}
              >
                {product.sizes.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Quantity Selector */}
            <div>
              <label>Quantity:</label>
              <select 
                className="form-select"
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
              >
                {[...Array(product.stock > 10 ? 10 : product.stock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>{x + 1}</option>
                ))}
              </select>
            </div>

            {/* Add to Cart Button */}
            <button onClick={addToCartHandler} className="btn" style={{marginTop: '10px'}}>
              Add to Cart 🛒
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;