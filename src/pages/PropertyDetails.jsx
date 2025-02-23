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
    List,
    ListItem,
    ListItemText,
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
    const [amenities, setAmenities] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [availabilitySlots, setAvailabilitySlots] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/properties/${id}`);
                setProperty(response.data);
                setAvailabilitySlots(response.data.availabilitySlots || []);
                setAmenities(propertyData.amenities || []);
                console.log("Received property details data:", response.data);
                console.log("Received propertyData data:", Array.isArray(response.data) && response.data.length > 0 ? response.data[0] : response.data);
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
        const tenantId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");
        const requestData = {
            property: { id: id },
            tenant: { id: tenantId },
            status: "PENDING",
        };

        if (requestType === "viewing") {
            if (!selectedSlot) {
                alert("Please select a viewing slot.");
                return;
            }
            requestData.availabilitySlot = { id: selectedSlot.id };
        }

        try {
            await axios.post(
                `http://localhost:8080/api/tenants/${tenantId}/add-${requestType}-request`,
                requestData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert(`${requestType.charAt(0).toUpperCase() + requestType.slice(1)} request sent successfully!`);
        } catch (error) {
            console.error(`Error sending ${requestType} request:`, error);
            alert(`Failed to send ${requestType} request.`);
        }

        setConfirmDialogOpen(false);
        setViewingDialogOpen(false);
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
                        <img key={index} src={`http://localhost:8080${photoUrl}`} alt="Property" width="200" />
                    ))
                ) : (
                    <Typography>No photos available.</Typography>
                )}
            </Box>

            <Divider sx={{ marginY: 2 }} />

            <Typography variant="h4" color="primary">Amenities</Typography>
            <Box sx={{ padding: 2, border: "1px solid #ddd", borderRadius: 2, boxShadow: 1 }}>
                {amenities.length > 0 ? (
                    amenities.map((amenity) => (
                        <Typography key={amenity.id}>
                            amenity
                        </Typography>
                    ))
                ) : (
                    <Typography color="error">This property doesn't offer any extra amenities.</Typography>
                )}
            </Box>

            <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>Availability Slots</Typography>
            <List>
                {availabilitySlots.length > 0 ? (
                    availabilitySlots.map((slot) => (
                        <ListItem key={slot.id}>
                            <ListItemText
                                primary={`${slot.dayOfWeek} ${slot.startHour}:00 - ${slot.endHour}:00`}
                            />
                        </ListItem>
                    ))
                ) : (
                    <Typography>No availability slots available.</Typography>
                )}
            </List>

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
                    <Select fullWidth value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)}>
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