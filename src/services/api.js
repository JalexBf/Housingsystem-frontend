import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => response,
  (error) => {

    const responseData = error.response?.data || {};
    const errorMessage = responseData.message || "An unexpected error occurred.";

    if (error.response) {
      const { status } = error.response;
      
      if (status === 401) {
        if (errorMessage.includes('pending approval')) {
          console.error('Login failed: User is not yet approved.');
          return Promise.reject(new Error('Your account is pending approval by the admin.'));
        } else {
          console.error('Login failed: Invalid credentials.');
          return Promise.reject(new Error('Invalid username or password.'));
        }
      }else if (status === 403) {
        console.error('Forbidden: User does not have access.');
        return Promise.reject(new Error('You do not have permission to access this resource.'));
      }else if (status === 500) {
        console.error('Server error! Please try again later.');
        return Promise.reject(new Error('An unexpected error occurred. Please try again later.'));
      }
    }else if (error.request) {
      console.error('No response received from the server:', error.request);
      return Promise.reject(new Error('Unable to reach the server. Please check your connection.'));
    }else {
      console.error('Error:', error.message);
    }

    return Promise.reject(new Error(errorMessage));
  }
);

export default API;
