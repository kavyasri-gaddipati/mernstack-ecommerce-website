import axios from 'axios';

// Mee Render URL ikkada pettanu
const api = axios.create({
  baseURL: 'https://pasovit-backend-kvpy.onrender.com/api', 
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;