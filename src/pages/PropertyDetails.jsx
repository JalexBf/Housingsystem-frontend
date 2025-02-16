import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Card, CardMedia, CircularProgress, Button } from "@mui/material";
import axios from "axios";

const PropertyDetails = () => {
    const { id } = useParams(); // Get property ID from URL
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/properties/${id}`);
                setProperty(response.data);
            } catch (error) {
                console.error("Error fetching property details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPropertyDetails();
    }, [id]);

    if (loading) {
        return (
            <Box sx={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!property) {
        return <Typography sx={{ padding: 4 }}>Property not found.</Typography>;
    }

    return (
        <Box sx={{ padding: 4 }}>
            <Button onClick={() => navigate(-1)} variant="contained" sx={{ marginBottom: 2 }}>
                ⬅ Back
            </Button>

            <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                {property.category}, {property.area}
            </Typography>

            {/* Property Images */}
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                {property.photos.map((photo, index) => (
                    <Card key={index} sx={{ maxWidth: 300 }}>
                        <CardMedia
                            component="img"
                            height="200"
                            image={`http://localhost:8080/images/${photo.filePath}`}
                            alt={`Property image ${index + 1}`}
                        />
                    </Card>
                ))}
            </Box>

            {/* Property Details */}
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                <strong>Location:</strong> {property.location}
            </Typography>
            <Typography variant="body1">
                <strong>Size:</strong> {property.squareMeters} sqm
            </Typography>
            <Typography variant="body1">
                <strong>Price:</strong> {property.price}€
            </Typography>
        </Box>
    );
};

export default PropertyDetails;
