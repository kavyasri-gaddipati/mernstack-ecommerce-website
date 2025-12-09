import axios from 'axios';

const api = axios.create({
  // MEE RENDER LINK (Check spelling carefully)
  baseURL: 'https://pasovit-backend-kvpy.onrender.com/api', 
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;