import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Grid, Box, Typography, CircularProgress, Button, AppBar, Toolbar} from "@mui/material";

const AvailableProperties = () => {
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token"); // Retrieve token

        console.log("Token in available properties: ", token); // Debugging

        if (token) {
            axios.get("http://localhost:8080/api/properties/available", {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    console.log("Received available properties data:", response.data);
                    setProperties(Array.isArray(response.data) ? response.data : []);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Status Code:", error.response.status);
                    console.error("Error fetching available properties info:", error.response?.data || error.message);
                    setLoading(false);
                });
        } else {
            console.error("No tenant ID or token found in localStorage");
            setLoading(false); // Add this here
        }
    }, []);

    const handleLogout = () => {
        axios.post("http://localhost:8080/api/logout")
            .then(() => {
                localStorage.removeItem("authToken");
                localStorage.removeItem("userId");
                navigate("/login");
            })
            .catch((error) => console.error("Logout failed:", error));
    };


    return (
        <Box sx={{ width: "100vw", height: "100vh", backgroundColor: "#f5f5f5" }}>
            <AppBar position="static" sx={{ backgroundColor: "#3f51b5", color: "white" }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h6">Available Properties</Typography>
                    <Box>
                        <Button color="inherit" onClick={() => navigate("/tenant-dashboard")}>Home</Button>
                        <Button color="inherit" onClick={() => navigate("/profile")}>Profile</Button>
                        <Button color="inherit" onClick={() => navigate("/available")}>Properties</Button>
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    </Box>
                </Toolbar>
            </AppBar>

            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography sx={{ textAlign: "center", color: "#3f51b5", marginTop: 4 }}>
                    {error}
                </Typography>
            ) : Array.isArray(properties) && properties.length > 0 ? (
                <Grid container spacing={3}>
                    {properties.map((property) => (
                        <Grid item xs={12} sm={6} md={4} key={property.id}>
                            <Box sx={{
                                padding: 4,
                                border: "1px solid #ddd",
                                borderRadius: 2,
                                color: "#3f51b5",
                                justifyContent: "center",
                                boxShadow: 1
                            }} onClick={() => navigate(`/property/${property.id}`)}>
                                <Typography variant="h8">{property.category}</Typography>
                                <Typography>Price: ${property.price}</Typography>
                                <Typography>Location: {property.area}</Typography>
                                <Typography>Address: {property.address}</Typography>
                                <Typography>Number of Rooms: {property.numberOfRooms}</Typography>
                                <Typography>Number of Bathrooms: {property.numberOfBathrooms}</Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography sx={{ color: "#3f51b5", textAlign: "center", width: "100%", marginTop: 3}}>
                    No available properties found.
                </Typography>
            )}

            <Box sx={{ position: "absolute", bottom: 16, left: 16 }}>
                <Button variant="contained" onClick={() => navigate("/tenant-dashboard")}>Back to Dashboard</Button>
            </Box>
        </Box>
    );
};

export default AvailableProperties;
