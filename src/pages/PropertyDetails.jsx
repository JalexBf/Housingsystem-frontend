import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
    Box,
    Typography,
    Divider,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Select,
    MenuItem,
} from "@mui/material";

const PropertyDetails = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [requestType, setRequestType] = useState("");
    const [viewingDialogOpen, setViewingDialogOpen] = useState(false);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState("");
    const [availabilitySlots, setAvailabilitySlots] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/properties/${id}`);
                setProperty(response.data);
                setAvailabilitySlots(response.data.availabilitySlots || []);
            } catch (error) {
                console.error("Error fetching property details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPropertyDetails();

        // Get user info from localStorage
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const user = JSON.parse(atob(token.split(".")[1])); // Decode JWT
                setUserId(user?.sub);
            } catch (error) {
                console.error("Error decoding JWT:", error);
            }
        }

        const userData = localStorage.getItem("user");
        if (userData) {
            try {
                setUserRole(JSON.parse(userData).role);
            } catch (error) {
                console.error("Error parsing user role from localStorage:", error);
            }
        }
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this property?")) return;

        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:8080/api/properties/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            alert("Property deleted successfully!");
            navigate("/"); // Redirect after deletion
        } catch (error) {
            console.error("Failed to delete property:", error);
        }
    };

    const handleRequest = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Authentication error. Please log in.");
            return;
        }

        const tenantId = localStorage.getItem("userId"); // Ensure this is correct
        if (!tenantId) {
            alert("Tenant ID not found. Please log in again.");
            return;
        }

        if (!selectedSlot || !selectedSlot.id) {
            alert("Please select a viewing slot.");
            return;
        }

        const requestData = {
            propertyId: id,
            availabilitySlotId: selectedSlot.id,
        };

        console.log("Sending request:", requestData);

        try {
            await axios.post(
                `http://localhost:8080/api/tenants/${tenantId}/add-viewing-request`,
                requestData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("Viewing request sent successfully!");
        } catch (error) {
            console.error("Error sending viewing request:", error);
            alert("Failed to send viewing request.");
        }
    };


    if (loading) return <Typography>Loading...</Typography>;

    return (
        <Box sx={{ padding: 4, maxWidth: 800, margin: "auto" }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                {property?.category ? property.category.charAt(0) + property.category.slice(1).toLowerCase() : "Unknown"}
                {property?.area ? `, ${property.area}` : ""}
            </Typography>

            <Typography variant="body1">
                📍 <strong>Address:</strong> {property?.address || "No address available"}
            </Typography>

            <Typography variant="body1">💰 <strong>Price:</strong> {property?.price ? `€${property.price}` : "Not listed"}</Typography>

            <Typography variant="body1">
                📐 <strong>Square Meters:</strong> {property?.squareMeters ? `${property.squareMeters} m²` : "Not specified"}
            </Typography>

            <Divider sx={{ marginY: 2 }} />

            <Typography variant="h6" sx={{ fontWeight: "bold" }}>Property Details</Typography>

            <Typography variant="body1">🏢 <strong>Floor:</strong> {property?.floor || "Not specified"}</Typography>
            <Typography variant="body1">🚪 <strong>Rooms:</strong> {property?.numberOfRooms || "Not specified"}</Typography>
            <Typography variant="body1">🚿 <strong>Bathrooms:</strong> {property?.numberOfBathrooms || "Not specified"}</Typography>
            <Typography variant="body1">🛠️ <strong>Renovation Year:</strong> {property?.renovationYear || "Not specified"}</Typography>

            <Divider sx={{ marginY: 2 }} />

            <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>Photos</Typography>
            <Box sx={{ display: "flex", gap: 2, marginTop: 2, overflowX: "auto" }}>
                {property?.photos?.length > 0 ? (
                    property.photos.map((photoUrl, index) => (
                        <img
                            key={index}
                            src={`http://localhost:8080${photoUrl}`}
                            alt={`Property ${index + 1}`}
                            width="200"
                        />
                    ))
                ) : (
                    <Typography>No photos available.</Typography>
                )}
            </Box>

            {userRole === "ROLE_TENANT" && (
                <>
                    <Button variant="contained" color="primary" sx={{ marginTop: 2, marginRight: 2 }} onClick={() => {
                        setRequestType("viewing");
                        setViewingDialogOpen(true);
                    }}>
                        Request Viewing
                    </Button>
                    <Button variant="contained" color="secondary" sx={{ marginTop: 2 }} onClick={() => {
                        setRequestType("rental");
                        setConfirmDialogOpen(true);
                    }}>
                        Request Rental
                    </Button>
                </>
            )}

            {userRole === "ROLE_OWNER" && userId === property?.ownerId && (
                <Button variant="contained" color="error" sx={{ marginTop: 2 }} onClick={handleDelete}>
                    Delete Property
                </Button>
            )}

            <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
                <DialogTitle>Confirm Request</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to make this {requestType} request?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleRequest} color="primary">Confirm</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={viewingDialogOpen} onClose={() => setViewingDialogOpen(false)}>
                <DialogTitle>Select a Viewing Time</DialogTitle>
                <DialogContent>
                    <Select
                        fullWidth
                        value={selectedSlot || ""} // Ensures no null value
                        onChange={(e) => setSelectedSlot(e.target.value)}
                    >
                        {availabilitySlots.map((slot) => (
                            <MenuItem key={slot.id} value={slot}>
                                {slot.dayOfWeek} {slot.startHour}:00 - {slot.endHour}:00
                            </MenuItem>
                        ))}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setViewingDialogOpen(false)}>Cancel</Button>
                    <Button onClick={() => setConfirmDialogOpen(true)} color="primary">Next</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default PropertyDetails;
