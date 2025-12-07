import { useEffect, useState } from 'react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setProducts(data.products);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <div>
      {/* Modern Hero Section */}
      <div className="container">
        <div className="hero">
          <h1>Upgrade Your Style</h1>
          <p>Discover the latest trends in fashion. Premium quality, affordable prices.</p>
          <button className="hero-btn">Shop Collection</button>
        </div>
      </div>

      <div className="container">
        {/* Modern Filter Chips */}
        <div className="filter-container">
            {['All', 'Men', 'Women', 'Kids', 'Shoes', 'Accessories', 'Electronics', 'Beauty'].map(cat => (
             <button 
               key={cat}
               onClick={() => setFilter(cat)}
               className={`filter-chip ${filter === cat ? 'active' : ''}`}
             >
               {cat}
             </button>
          ))}
        </div>

        {/* Product Grid */}
        {loading ? (
           <h2 style={{textAlign: 'center', padding: '50px'}}>Loading Collections...</h2>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;