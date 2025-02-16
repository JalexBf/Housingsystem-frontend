import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Card, CardMedia, CardContent } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PropertyDetails() {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/api/properties/${id}`)
            .then((response) => {
                setProperty(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching property:", error);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <CircularProgress sx={{ display: "block", margin: "auto", mt: 5 }} />;
    if (!property) return <Typography variant="h6">Property not found.</Typography>;

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center", mb: 3 }}>
                {property.address}
            </Typography>
            <Card sx={{ maxWidth: 600, margin: "auto" }}>
                {property.photos && property.photos.length > 0 && (
                    <CardMedia
                        component="img"
                        height="300"
                        image={`/${property.photos[0].filePath}`} // Adjust backend path if needed
                        alt="Property Image"
                    />
                )}
                <CardContent>
                    <Typography variant="body1">
                        <strong>Location:</strong> {property.area}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Size:</strong> {property.squareMeters} m²
                    </Typography>
                    <Typography variant="body1">
                        <strong>Price:</strong> €{property.price}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Rooms:</strong> {property.numberOfRooms}, Bathrooms: {property.numberOfBathrooms}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}
