import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, CardMedia, Grid } from "@mui/material";
import axios from "axios";

const MyProperties = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("No authentication token found.");
                    return;
                }

                console.log("Sending token:", token);

                const response = await axios.get("http://localhost:8080/api/properties", {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                });

                console.log("API Response:", response.data);
                setProperties(response.data);
            } catch (error) {
                console.error("Failed to fetch property:", error);
            }
        };
        fetchProperty();
    }, []);

    if (properties.length === 0) {
        return <Typography sx={{ padding: 4 }}>No properties found.</Typography>;
    }

    return (
        <Box sx={{ padding: 4 }}>
            <Grid container spacing={2}>
                {properties.map(property => (
                    <Grid item xs={12} sm={8} md={6} key={property.id}>
                        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                            {property.firstPhotoUrl && (
                                <CardMedia
                                    component="img"
                                    height="250"
                                    image={`http://localhost:8080/images/${property.firstPhotoUrl}`}
                                    alt="Property Image"
                                    sx={{ objectFit: "cover" }}
                                />
                            )}
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                    {property.category && property.area
                                        ? `${property.category}, ${property.area}`
                                        : "Property Info Unavailable"}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default MyProperties;