import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { Box, Typography, Card, CardContent, CardMedia, Grid, Button, CircularProgress } from "@mui/material";
import axios from "axios";

const MyProperties = () => {
    const [properties, setProperties] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // ✅ Initialize navigation

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("No authentication token found.");
                    setLoading(false);
                    return;
                }

                // Add this line to get the userId from localStorage
                const userId = localStorage.getItem("userId");

                const response = await axios.get(`http://localhost:8080/api/properties/owner/${userId}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                });

                setProperties(response.data);
            } catch (error) {
                console.error("Failed to fetch properties:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    const handleView = (propertyId) => {
        navigate(`/property/${propertyId}`); // ✅ Navigate to property details page
    };

    const handleDelete = async (propertyId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this property?");
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:8080/api/properties/${propertyId}`, {
                headers: { "Authorization": `Bearer ${token}` },
            });

            // ✅ Remove the deleted property from the state
            setProperties((prevProperties) => prevProperties.filter((p) => p.id !== propertyId));
        } catch (error) {
            console.error("Failed to delete property:", error);
        }
    };

    if (loading) {
        return (
            <Box sx={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!properties || properties.length === 0) {
        return <Typography sx={{ padding: 4 }}>No properties found.</Typography>;
    }

    return (
        <Box sx={{ padding: 4 }}>
            <Grid container spacing={2}>
                {properties.map((property) => (
                    <Grid item xs={12} sm={8} md={6} key={property.id}>
                        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                            {property.photos && property.photos.length > 0 ? (
                                <CardMedia
                                    component="img"
                                    height="250"
                                    image={`http://localhost:8080${property.photos[0]}`}
                                    alt="Property Image"
                                    sx={{ objectFit: "cover" }}
                                />
                            ) : (
                                <CardMedia
                                    component="img"
                                    height="250"
                                    image="/default-property-image.jpg"
                                    alt="No Image Available"
                                    sx={{ objectFit: "cover" }}
                                />
                            )}
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                    {property.category && property.area
                                        ? `${property.category.charAt(0) + property.category.slice(1).toLowerCase()}, ${property.area}`
                                        : "Property Info Unavailable"}
                                </Typography>

                                {/* ✅ Fix: Wrap buttons inside a properly defined Box */}
                                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, marginTop: 2 }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleView(property.id)}
                                    >
                                        Προβολή
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleDelete(property.id)}
                                    >
                                        ΔΙΑΓΡΑΦΗ
                                    </Button>
                                </Box>

                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default MyProperties;
