const api = axios.create({
  // Ikkada Live Link Undali (Localhost kaadu)
  baseURL: 'https://pasovit-backend-kvpy.onrender.com/api', 
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});