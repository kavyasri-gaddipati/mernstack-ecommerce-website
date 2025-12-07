import axios from 'axios';

// Backend URL ki connection
const api = axios.create({
  baseURL: '/api', // Proxy dwara http://localhost:5000/api ki veltundi
  withCredentials: true, // Cookies (Token) pass avvadaniki idhi mukhyam
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;