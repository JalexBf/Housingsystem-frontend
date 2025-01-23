import axios from 'axios';

// Create an Axios instance with default settings
const API = axios.create({
  baseURL: 'http://localhost:8080', // Replace with your backend's base URL
  timeout: 5000, // Optional: Set a timeout for requests
});

// Interceptor to include Authorization header with JWT token if available
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Retrieve the JWT token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor to handle responses globally (e.g., logging out on 401 Unauthorized)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized requests, e.g., redirect to login page
      console.error('Unauthorized! Redirecting to login...');
      localStorage.removeItem('token'); // Clear token
      window.location.href = '/login'; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default API;
