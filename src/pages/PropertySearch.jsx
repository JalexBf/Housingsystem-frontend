import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button, CircularProgress } from "@mui/material";
import axios from "axios";
import SearchBar from "./SearchBar";
import PropertyFilters from "./PropertyFilters"; // ✅ Import Filters

const PropertySearch = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async (filters = {}) => {
        try {
            // Remove empty/null values from filters
            const cleanFilters = Object.fromEntries(
                Object.entries(filters).filter(([_, value]) => value !== "" && value !== null)
            );

            const queryParams = new URLSearchParams(cleanFilters).toString();
            const url = `http://localhost:8080/api/properties/search?${queryParams}`;

            const response = await axios.get(url);
            setProperties(response.data);
        } catch (error) {
            console.error("Failed to fetch properties:", error);
        } finally {
            setLoading(false);
        }
    };


    if (loading) {
        return (
            <Box sx={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ display: "flex" }}>
            {/* Sidebar Filters */}
            <PropertyFilters onFilter={fetchProperties} />

            {/* Main Content */}
            <Box sx={{ flex: 1, padding: 4 }}>

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
        </Box>
    );
};

export default PropertySearch;
