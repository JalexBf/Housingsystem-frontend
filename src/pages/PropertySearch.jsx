import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button, CircularProgress } from "@mui/material";
import axios from "axios";
import SearchBar from "./SearchBar"; // ✅ Import SearchBar

const PropertySearch = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async (filters = {}) => {
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const url = `http://localhost:8080/api/properties/search?${queryParams}`;

            const response = await axios.get(url); // ✅ Public API request (No Auth Required)
            setProperties(response.data);
        } catch (error) {
            console.error("Failed to fetch properties:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        const token = localStorage.getItem("token")
        axios.post("http://localhost:8080/api/logout", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                localStorage.removeItem("authToken");
                localStorage.removeItem("userId");
                localStorage.removeItem("user");
                localStorage.removeItem("username");
                navigate("/login");
            })
            .catch((error) => console.error("Logout failed:", error));
    };

    if (loading) {
        return (
            <Box sx={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                <CircularProgress />
            </Box>
        );
    }
    return (
        <Box sx={{ padding: 4, backgroundColor: "#f5f5f5", }}>
            <SearchBar onSearch={fetchProperties} /> {/* ✅ Add SearchBar */}

            <Grid container spacing={2}>
                {properties.length > 0 ? (
                    properties.map((property) => (
                        <Grid item xs={12} sm={8} md={6} key={property.id}>
                            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                                {property.photos && property.photos.length > 0 && (
                                    <CardMedia
                                        component="img"
                                        height="250"
                                        image={`http://localhost:8080${property.photos[0]}`}
                                        alt="Property Image"
                                    />
                                )}
                                <CardContent>
                                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                        {property.category.charAt(0) + property.category.slice(1).toLowerCase()}, {property.area}
                                    </Typography>
                                    <Typography variant="body2">Price: €{property.price}</Typography>
                                    <Typography variant="body2">Rooms: {property.numberOfRooms}</Typography>

                                    <Button variant="contained" color="primary" onClick={() => navigate(`/property/${property.id}`)}>
                                        View Details
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography>No properties found.</Typography>
                )}
            </Grid>
        </Box>
    );
};

export default PropertySearch;
