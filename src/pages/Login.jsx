import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Reset any previous errors

    if (!username || !password) {
      setError('Please fill in both fields.');
      return;
    }

    try {
      const response = await API.post('/api/auth/login', { username, password });
      const { token } = response.data;

      // Save token to localStorage for future requests
      localStorage.setItem('token', token);

      alert('Login successful!');
      navigate('/dashboard'); // Redirect to dashboard or another page
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid username or password.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw', // Full viewport width
        height: '100vh', // Full viewport height
        backgroundColor: '#f5f5f5', // Light background
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: { xs: '90%', sm: '400px' }, // Responsive width
          textAlign: 'center',
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <Typography color="error" sx={{ marginTop: 1 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ marginTop: 2 }}
          >
            Login
          </Button>
        </form>
        <Typography sx={{ marginTop: 2 }}>
          Don&apos;t have an account? <Link to="/signup">Sign Up</Link> {/* Add the link */}
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
