import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TenantDashboard = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#f5f5f5',
        margin: 0,
        padding: 0,
        overflow: 'hidden', // Ensures no scrollbars
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginBottom: 4,
          fontWeight: 'bold',
          color: '#3f51b5',
          textAlign: 'center',
        }}
      >
        Tenant Dashboard
      </Typography>

      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <Button
          variant="contained"
          sx={{ width: '300px' }}
          onClick={() => navigate('/properties')}
        >
          View Available Properties
        </Button>

        <Button
          variant="contained"
          sx={{ width: '300px' }}
          onClick={() => navigate('/rental-requests')}
        >
          Manage Rental Requests
        </Button>

        <Button
          variant="contained"
          sx={{ width: '300px' }}
          onClick={() => navigate('/viewing-requests')}
        >
          Manage Viewing Requests
        </Button>
      </Box>
    </Box>
  );
};

export default TenantDashboard;
