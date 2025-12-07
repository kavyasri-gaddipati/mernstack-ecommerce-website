import { useState, useContext } from 'react';
import { Link } from 'react-router-dom'; // Register page link kosam
import AuthContext from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useContext(AuthContext); // Context nundi login function tiskunnam

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      // Backend nundi vachina error message chupinchadam
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="form-container">
      <h2 style={{textAlign: 'center', marginBottom: '20px'}}>Sign In</h2>
      
      {error && <div className="alert">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email Address</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter email"
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter password"
            required
          />
        </div>

        <button type="submit" className="btn btn-block">Login</button>
      </form>

      <p style={{marginTop: '15px', textAlign: 'center'}}>
        New Customer? <Link to="/register" style={{color: 'blue'}}>Register Here</Link>
      </p>
    </div>
  );
};

export default Login;