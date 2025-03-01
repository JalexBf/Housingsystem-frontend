import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
    Box,
    Typography,
    CircularProgress,
    Button,
    AppBar,
    Toolbar,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Select,
    MenuItem
} from "@mui/material";

const Property = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tenant, setTenant] = useState(null);
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [viewingDialogOpen, setViewingDialogOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState("");
    const [availabilitySlots, setAvailabilitySlots] = useState([]);
    const [amenities, setAmenities] = useState([]);
    const [requestType, setRequestType] = useState("");

    useEffect(() => {
        const fetchPropertyDetails = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await axios.get(`http://localhost:8080/api/properties/${id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    console.log("Received property details data:", response.data);
                    console.log("Received propertyData data:", Array.isArray(response.data) && response.data.length > 0 ? response.data[0] : response.data);
                    const propertyData = Array.isArray(response.data) && response.data.length > 0 ? response.data[0] : response.data;
                    setProperty(propertyData);
                    setAvailabilitySlots(propertyData.availabilitySlots || []);
                    setAmenities(propertyData.amenities || []);
                } catch (err) {
                    setError("Failed to fetch property details. Please try again.");
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchPropertyDetails();
    }, [id]);


    const handleRequest = async () => {
        const tenantId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");
        const requestData = {
            property: { id: id },
            tenant: { id: tenantId },
            status: "PENDING"
        };

        if (requestType === "viewing") {
            if (!selectedSlot) {
                console.error("No slot selected!");
                alert("Please select a viewing slot.");
                return;
            }
            requestData.availabilitySlot = { id: selectedSlot.id };
        }

        try {
            const response = await axios.post(
                `http://localhost:8080/api/tenants/${tenantId}/add-${requestType}-request`,
                requestData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log(`${requestType} request added successfully:`, response.data);
            alert(`${requestType.charAt(0).toUpperCase() + requestType.slice(1)} request sent successfully!`);
        } catch (error) {
            console.error(`Error sending ${requestType} request:`, error);
            alert(`Failed to send ${requestType} request.`);
        }

        setConfirmDialogOpen(false);
        setViewingDialogOpen(false);
    };

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
                    <Typography variant="h6">Property Details</Typography>
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
                <Typography sx={{ textAlign: "center", color: "red", marginTop: 4 }}>{error}</Typography>
            ) : property ? (
                <Box sx={{
                    padding: 4,
                    border: "1px solid #ddd",
                    borderRadius: 2,
                    color: "#3f51b5",
                    justifyContent: "center",
                    boxShadow: 1}}>
                   {/*<Typography>{propery.photos}</Typography>*/}
                    <Typography variant="h4" color="primary">{property.category}</Typography>
                    <Typography>Price: ${property.price}</Typography>
                    <Typography>Location: {property.area}</Typography>
                    <Typography>Address: {property.address}</Typography>
                    <Typography>Number of Rooms: {property.numberOfRooms}</Typography>
                    <Typography>Number of Bathrooms: {property.numberOfBathrooms}</Typography>
                    <Typography>Number of Floors: {property.floor}</Typography>
                    <Typography>Square Meters: {property.squareMeters}</Typography>
                    <Typography>Renovation Year: {property.renovationYear}</Typography>

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

                    <Box sx={{
                        padding: 4,
                        border: "1px solid #ddd",
                        borderRadius: 2,
                        color: "#3f51b5",
                        justifyContent: "center",
                        boxShadow: 1}}>
                        <Typography variant="h4" color="primary">Availability Slots</Typography>
                        <Typography>This property is available for viewings at the between the following times:</Typography>
                        <Box sx={{ padding: 2, border: "1px solid #ddd", borderRadius: 2, boxShadow: 1 }}>
                            {availabilitySlots.length > 0 ? (
                                availabilitySlots.map((slot) => (
                                    <Typography key={slot.id}>
                                        {slot.dayOfWeek}: {slot.startHour}:00 - {slot.endHour}:00
                                    </Typography>
                                ))
                            ) : (
                                <Typography color="error">This property is not available for viewing requests.</Typography>
                            )}
                        </Box>
                    </Box>


                    <Box sx={{
                        padding: 4,
                        border: "1px solid #ddd",
                        borderRadius: 2,
                        color: "#3f51b5",
                        justifyContent: "center",
                        boxShadow: 1}}>
                        <Typography variant="h4" color="primary">Owner</Typography>
                        <Typography>{property.owner.firstName} {property.owner.lastName}</Typography>

                        <Typography variant="h4" color="primary">Contact info</Typography>
                        <Typography>Phone number: {property.owner.phone}</Typography>
                        <Typography>Email: {property.owner.email}</Typography>
                    </Box>

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
                </Box>
            ) : (
                <Typography>No property details available.</Typography>
            )}

            <Box sx={{ position: "fixed", bottom: 20, left: 20 }}>
                <Button variant="contained" onClick={() => navigate("/available")} sx={{ marginRight: 2 }}>
                    Back to Properties
                </Button>
                <Button variant="contained" onClick={() => navigate("/tenant-dashboard")}>
                    Back to Dashboard
                </Button>
            </Box>

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
                        {availabilitySlots.map(selectedSlot => (
                            <MenuItem
                                key={selectedSlot.id}
                                value={selectedSlot}
                            >
                                {selectedSlot.dayOfWeek} {selectedSlot.startHour}:00 - {selectedSlot.endHour}:00
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

export default Property;
