import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!username || !password) {
      setError('Please fill in both fields.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await API.post('/api/auth/login', { username, password });

      console.log("Login response:", response.data);

      const { accessToken, roles } = response.data;

      if (!accessToken) {
        setError('Login failed: Token not received from the server.');
        return;
      }

      localStorage.setItem('token', accessToken);
      localStorage.setItem('user', JSON.stringify({ role: roles[0] }));

      const role = roles[0];
      if (role === 'ROLE_TENANT') {
        navigate('/tenant-dashboard');
      } else if (role === 'ROLE_OWNER') {
        navigate('/owner-dashboard');
      } else if (role === 'ROLE_ADMIN') {
        setError('The Admin enters through the Backend.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh',
            backgroundColor: '#f5f5f5',
          }}
      >
        <Paper
            elevation={3}
            sx={{
              padding: 4,
              width: { xs: '90%', sm: '400px' },
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
                <Typography color="error" sx={{ marginTop: 1, padding: 1, backgroundColor: "#ffe6e6", borderRadius: "5px" }}>
                  {error}
                </Typography>
            )}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ marginTop: 2 }}
                disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          <Typography sx={{ marginTop: 2 }}>
            Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
          </Typography>
        </Paper>
      </Box>
  );
};

export default Login;