import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Typography, CircularProgress, Divider, Button } from "@mui/material";

const PropertyDetails = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/properties/${id}`);
                console.log("API Response:", response.data);
                setProperty(response.data);
            } catch (error) {
                console.error("Error fetching property details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPropertyDetails();

        // Extract user ID from JWT token
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const user = JSON.parse(atob(token.split(".")[1])); // Decode JWT
                setUserId(user.id); // Extract user ID
            } catch (error) {
                console.error("Error decoding JWT:", error);
            }
        }
    }, [id]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this property?");
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:8080/api/properties/${id}`, {
                headers: { "Authorization": `Bearer ${token}` },
            });

            alert("Property deleted successfully!");
            navigate("/"); // Redirect after deletion
        } catch (error) {
            console.error("Failed to delete property:", error);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!property) {
        return <Typography sx={{ padding: 4 }}>Property not found.</Typography>;
    }

    return (
        <Box sx={{ padding: 4, maxWidth: 800, margin: "auto" }}>
            {/* Title and Basic Details */}
            <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                {property.category ? property.category.charAt(0) + property.category.slice(1).toLowerCase() : "Unknown"}
                {property.area ? `, ${property.area}` : ""}
            </Typography>

            <Typography variant="body1">
                📍 <strong>Address:</strong> {property.address && property.address.trim() !== "" ? property.address : "No address available"}
            </Typography>

            <Typography variant="body1">💰 <strong>Price:</strong> {property.price ? `€${property.price}` : "Not listed"}
            </Typography>

            <Typography variant="body1">
                📐 <strong>Square Meters:</strong> {property.squareMeters ? `${property.squareMeters} m²` : "Not specified"}
            </Typography>

            <Divider sx={{ marginY: 2 }} />

            {/* Additional Property Details */}
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>Property Details</Typography>

            <Typography variant="body1">🏢 <strong>Floor:</strong> {property.floor ? property.floor : "Not specified"}
            </Typography>
            <Typography variant="body1">🚪 <strong>Rooms:</strong> {property.numberOfRooms ? property.numberOfRooms : "Not specified"}</Typography>
            <Typography variant="body1">🚿 <strong>Bathrooms:</strong> {property.numberOfBathrooms ? property.numberOfBathrooms : "Not specified"}</Typography>
            <Typography variant="body1">🛠️ <strong>Renovation Year:</strong> {property.renovationYear ? property.renovationYear : "Not specified"}</Typography>
            <Typography variant="body1">📝 <strong>ATAK:</strong> {property.atak ? property.atak : "Not specified"}</Typography>

            {/* Amenities List */}
            <Typography variant="body1" sx={{ fontWeight: "bold", display: "inline" }}>
                🏠 Amenities:
            </Typography>
            <Typography variant="body1" sx={{ display: "inline" }}>
                {property.amenities && property.amenities.length > 0 ? (
                    <ul style={{ display: "inline", marginLeft: "8px", padding: "0" }}>
                        {property.amenities.map((amenity, index) => (
                            <li key={index} style={{ display: "inline", marginRight: "8px" }}>
                                {amenity}{index < property.amenities.length - 1 ? "," : ""}
                            </li>
                        ))}
                    </ul>
                ) : " -"}
            </Typography>

            {/* Availability Slots */}
            <Typography variant="body1" sx={{ fontWeight: "bold", marginTop: 2 }}>
                Availability:
            </Typography>
            {property.availabilitySlots && property.availabilitySlots.length > 0 ? (
                <Box component="ul" sx={{ margin: 0, paddingLeft: 2 }}>
                    {property.availabilitySlots.map((slot, index) => (
                        <Typography key={index} component="li">
                            {slot}
                        </Typography>
                    ))}
                </Box>
            ) : (
                <Typography variant="body1" sx={{ display: "inline" }}> -</Typography>
            )}

            <Divider sx={{ marginY: 2 }} />

            {/* Photos */}
            <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>Photos</Typography>
            <Box sx={{ display: "flex", gap: 2, marginTop: 2, overflowX: "auto" }}>
                {property.photos && property.photos.length > 0 ? (
                    property.photos.map((photoUrl, index) => (
                        <img
                            key={index}
                            src={`http://localhost:8080${photoUrl}`}
                            alt="Property"
                            width="200"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/default-image.jpg";
                            }}
                        />
                    ))
                ) : (
                    <Typography>No photos available.</Typography>
                )}
            </Box>

            {/* Delete Button (Only for Owner) */}
            {userId && property.ownerId && userId === property.ownerId && (
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleDelete}
                    sx={{ marginTop: 2 }}
                >
                    Delete Property
                </Button>
            )}
        </Box>
    );
};

export default PropertyDetails;
