import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Button,
    Paper,
    AppBar,
    Toolbar,
    CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TenantProfile = () => {
    const navigate = useNavigate();
    const [tenant, setTenant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch tenant data
    useEffect(() => {
        const tenantId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        if (tenantId && token) {
            axios
                .get(`http://localhost:8080/api/tenants/${tenantId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    console.log("Received tenant data:", response.data);
                    setTenant(response.data); // Set the tenant data (including rental and viewing requests)
                })
                .catch((error) => {
                    console.error("Error fetching tenant info:", error.response?.data || error.message);
                    setError("Failed to fetch tenant information.");
                })
                .finally(() => setLoading(false));
        } else {
            console.error("No tenant ID or token found in localStorage");
            setError("No tenant ID found.");
            setLoading(false);
        }
    }, []);

    // Handle logout
    const handleLogout = () => {
        axios
            .post("http://localhost:8080/api/logout")
            .then(() => {
                localStorage.removeItem("authToken");
                localStorage.removeItem("userId");

                navigate("/login");
            })
            .catch((error) => console.error("Logout failed:", error));
    };

    return (
        <Box sx={{ minHeight: "100vh", width: "100vw", display: "flex", flexDirection: "column", backgroundColor: "#f5f5f5", overflow: "auto"}}>
            <AppBar position="static" sx={{ backgroundColor: "#3f51b5", color: "white" }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h6">Profile</Typography>
                    <Box>
                        <Button color="inherit" onClick={() => navigate("/tenant-dashboard")}>Home</Button>
                        <Button color="inherit" onClick={() => navigate("/profile")}>Profile</Button>
                        <Button color="inherit" onClick={() => navigate("/available")}>Properties</Button>
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <Box sx={{ flexGrow: 1, overflow: "auto", padding: 2 }}>
                {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Typography sx={{ textAlign: "center", color: "red", marginTop: 4 }}>
                        {error}
                    </Typography>
                ) : tenant && (
                    <>
                        {/* Tenant Information */}
                        <Paper sx={{ padding: 2, border: "1px solid #ddd", margin: 1, borderRadius: 1, boxShadow: 1,  color: "#3f51b5", justifyContent: "center"}}>
                            <Typography variant="h6">User Information</Typography>
                            <Typography>Username: {tenant.username}</Typography>
                            <Typography>First Name: {tenant.firstName}</Typography>
                            <Typography>Last Name: {tenant.lastName}</Typography>
                            <Typography>Email: {tenant.email}</Typography>
                            <Typography>Phone: {tenant.phone}</Typography>
                        </Paper>

                        {/* Rental and Viewing Requests */}
                        <Typography variant="h4" sx={{ color: "#3f51b5", textAlign: "center", marginTop: 3 }}>
                            Rental Requests
                        </Typography>

                        {tenant.rentalRequests?.length > 0 ? (
                            tenant.rentalRequests.map((rentalRequest) => (
                                <Paper key={rentalRequest.id} sx={{ padding: 2, marginBottom: 2, boxShadow: 1 }}>
                                    <Typography>Request ID: {rentalRequest.id}</Typography>
                                    <Typography>Status: {rentalRequest.status}</Typography>
                                    {rentalRequest.property && (
                                        <>
                                            <Typography>Property ID: {rentalRequest.property.id}</Typography>
                                            <Typography>Property Address: {rentalRequest.property.address}</Typography>
                                            <Typography>Property Price: ${rentalRequest.property.price}</Typography>
                                        </>
                                    )}
                                </Paper>
                            ))
                        ) : (
                            <Typography sx={{ textAlign: "center", color: "red", marginTop: 2 }}>
                                No rental requests found.
                            </Typography>
                        )}

                        {/* Viewing Requests */}
                        <Typography variant="h4" sx={{ color: "#3f51b5", textAlign: "center", marginTop: 3 }}>
                            Viewing Requests
                        </Typography>

                        {tenant.viewingRequests?.length > 0 ? (
                            tenant.viewingRequests.map((viewingRequest) => (
                                <Paper key={viewingRequest.id} sx={{ padding: 2, marginBottom: 2, boxShadow: 1 }}>
                                    <Typography>Request ID: {viewingRequest.id}</Typography>
                                    <Typography>Status: {viewingRequest.status}</Typography>
                                    {viewingRequest.property && (
                                        <>
                                            <Typography>Property ID: {viewingRequest.property.id}</Typography>
                                            <Typography>Property Address: {viewingRequest.property.address}</Typography>
                                            <Typography>Property Price: ${viewingRequest.property.price}</Typography>
                                        </>
                                    )}
                                    {viewingRequest.availabilitySlot && (
                                        <>
                                            <Typography>Slot Day: {viewingRequest.availabilitySlot.dayOfWeek}</Typography>
                                            <Typography>Slot Time: {viewingRequest.availabilitySlot.startHour}:00 - {viewingRequest.availabilitySlot.endHour}:00</Typography>
                                        </>
                                    )}
                                </Paper>
                            ))
                        ) : (
                            <Typography sx={{ textAlign: "center", color: "red", marginTop: 2 }}>
                                No viewing requests found.
                            </Typography>
                        )}

                        {/* Back to Dashboard Button */}
                        <Box sx={{ display: "flex", justifyContent: "flex-start", marginTop: 2 }}>
                            <Button variant="contained" onClick={() => navigate("/tenant-dashboard")}>
                                Back to Dashboard
                            </Button>
                        </Box>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default TenantProfile;