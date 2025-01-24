import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    afm: '',
    selectedRole: 'TENANT', // Default role
    idFrontPath: '', // Base64 for ID front
    idBackPath: '',  // Base64 for ID back
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [responsePayload, setResponsePayload] = useState(null); // Debugging the JSON response

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file changes for ID front and back
  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (!file) {
      setError('Please upload a valid file.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prevState) => ({
        ...prevState,
        [field]: reader.result.split(',')[1], // Extract base64 data
      }));
    };

    reader.onerror = () => {
      setError('Failed to read the file. Please try again.');
    };

    reader.readAsDataURL(file);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setResponsePayload(null);

    // Validate phone and AFM
    if (formData.phone.length !== 10 || formData.afm.length !== 10) {
      setError('Phone and AFM must each have exactly 10 digits.');
      return;
    }

    // Validate selectedRole
    if (!formData.selectedRole) {
      setError('Please select a role (TENANT or OWNER).');
      return;
    }

    // Validate image data
    if (!formData.idFrontPath || !formData.idBackPath) {
      setError('Both ID Front and ID Back images are required.');
      return;
    }

    // Validate password length
    if (formData.password.length <= 6) {
      setError('Password must have more than 6 characters.');
      return;
    }
  
    // Validate first name length
    if (formData.firstName.length <= 2) {
      setError('First name must have more than 2 characters.');
      return;
    }
  
    // Validate last name length
    if (formData.lastName.length <= 2) {
      setError('Last name must have more than 2 characters.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/auth/signup', formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      setSuccess(response.data.message || 'User registered successfully!');
      setResponsePayload(response.data.payload); // Debug JSON response from backend
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
      if (err.response?.data?.payload) {
        setResponsePayload(err.response.data.payload); // Debug JSON response on error
      }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#f5f5f5',
        padding: '16px',
        boxSizing: 'border-box',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: '100%',
          maxWidth: '500px',
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            variant="outlined"
            margin="normal"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            name="password"
            variant="outlined"
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            variant="outlined"
            margin="normal"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            variant="outlined"
            margin="normal"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            variant="outlined"
            margin="normal"
            value={formData.phone}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) { // Only allow digits
                setFormData({ ...formData, phone: value });
              }
            }}
            error={formData.phone.length > 0 && formData.phone.length !== 10}
            helperText={
              formData.phone.length > 0 && formData.phone.length !== 10
                ? 'Phone must be exactly 10 digits'
                : 'Must be exactly 10 digits'
            }
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="AFM"
            name="afm"
            variant="outlined"
            margin="normal"
            value={formData.afm}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setFormData({ ...formData, afm: value });
              }
            }}
            error={formData.afm.length > 0 && formData.afm.length !== 10}
            helperText={
              formData.afm.length > 0 && formData.afm.length !== 10
                ? 'AFM must be exactly 10 digits'
                : 'Must be exactly 10 digits'
            }
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              id="role-select"
              name="selectedRole"
              value={formData.selectedRole}
              onChange={handleChange}
              required
            >
              <MenuItem value="TENANT">Tenant</MenuItem>
              <MenuItem value="OWNER">Owner</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            component="label"
            sx={{ marginTop: 2, marginBottom: 2 }}
          >
            Upload ID Front
            <input
              type="file"
              hidden
              onChange={(e) => handleFileChange(e, 'idFrontPath')}
            />
          </Button>
          <Button
            variant="outlined"
            component="label"
            sx={{ marginTop: 2, marginBottom: 2 }}
          >
            Upload ID Back
            <input
              type="file"
              hidden
              onChange={(e) => handleFileChange(e, 'idBackPath')}
            />
          </Button>
          {error && (
            <Typography color="error" sx={{ marginTop: 1 }}>
              {error}
            </Typography>
          )}
          {success && (
            <Typography color="success" sx={{ marginTop: 1 }}>
              {success}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ marginTop: 2 }}
          >
            Sign Up
          </Button>
        </form>
        {/*
        responsePayload && (
          <Box
            sx={{
              marginTop: 2,
              padding: 2,
              backgroundColor: '#f0f0f0',
              borderRadius: '8px',
              textAlign: 'left',
              maxHeight: '200px',
              overflowY: 'auto',
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Debug JSON Response:
            </Typography>
            <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
              {JSON.stringify(responsePayload, null, 2)}
            </pre>
          </Box>
        )*/}
        <Typography sx={{ marginTop: 2 }}>
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Signup;
