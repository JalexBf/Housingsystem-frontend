import React, { useState, useEffect } from "react";
import {
    Button,
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ManageViewingRequests = () => {
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [rentalRequests, setRentalRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchViewingAndRentalRequests();
    }, []);

    const fetchViewingAndRentalRequests = async () => {
        try {
            const token = localStorage.getItem("token");

            // Fetch Viewing Requests
            const viewingResponse = await axios.get("http://localhost:8080/api/viewing-requests", {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Fetch Rental Requests
            const rentalResponse = await axios.get("http://localhost:8080/api/rental-requests", {
                headers: { Authorization: `Bearer ${token}` },
            });

            setRequests(viewingResponse.data);
            setRentalRequests(rentalResponse.data);
        } catch (err) {
            setError("Failed to fetch requests.");
        } finally {
            setLoading(false);
        }
    };

    const handleRequestAction = async (id, status) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("User is not authenticated.");

            await axios.put(
                `http://localhost:8080/api/viewing-requests/${id}/status?status=${status}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            fetchViewingAndRentalRequests(); // Refresh list after action
        } catch (error) {
            console.error("Error updating request:", error);
            setError("Action failed.");
        }
    };

    const handleRentalAction = async (id, status) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("User is not authenticated.");

            await axios.put(
                `http://localhost:8080/api/rental-requests/${id}/status?status=${status}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            fetchViewingAndRentalRequests(); // Refresh list after action
        } catch (error) {
            console.error("Error updating rental request:", error);
            setError("Action failed.");
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 1200 }}>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>Manage Requests</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginBottom: 2 }}
                    onClick={() => navigate('/owner-dashboard')}
                >
                    Back to Dashboard
                </Button>

                {loading ? (
                    <Typography>Loading...</Typography>
                ) : error ? (
                    <Typography color="error">{error}</Typography>
                ) : (
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        {/* Viewing Requests */}
                        <Box sx={{ width: "48%" }}>
                            <Typography variant="h6">Viewing Requests</Typography>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Tenant</TableCell>
                                            <TableCell>Property</TableCell>
                                            <TableCell>Availability Slot</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {requests.map((request) => (
                                            <TableRow key={request.id}>
                                                <TableCell>{request.tenant?.username || "N/A"}</TableCell>
                                                <TableCell>{request.property?.id || "N/A"}</TableCell>
                                                <TableCell>
                                                    {request.availabilitySlot
                                                        ? `${request.availabilitySlot.dayOfWeek} ${request.availabilitySlot.startHour}:00 - ${request.availabilitySlot.endHour}:00`
                                                        : "N/A"}
                                                </TableCell>
                                                <TableCell>{request.status || "N/A"}</TableCell>
                                                <TableCell>
                                                    {request.status === "PENDING" && (
                                                        <>
                                                            <Button
                                                                variant="contained"
                                                                color="success"
                                                                sx={{ marginRight: 1 }}
                                                                onClick={() => handleRequestAction(request.id, "APPROVED")}
                                                            >
                                                                Approve
                                                            </Button>
                                                            <Button
                                                                variant="contained"
                                                                color="error"
                                                                onClick={() => handleRequestAction(request.id, "REJECTED")}
                                                            >
                                                                Reject
                                                            </Button>
                                                        </>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>

                        {/* Rental Requests */}
                        <Box sx={{ width: "48%" }}>
                            <Typography variant="h6">Rental Requests</Typography>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Tenant</TableCell>
                                            <TableCell>Property</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rentalRequests.map((rental) => (
                                            <TableRow key={rental.id}>
                                                <TableCell>{rental.tenant?.username || "N/A"}</TableCell>
                                                <TableCell>{rental.property?.id || "N/A"}</TableCell>
                                                <TableCell>{rental.status || "N/A"}</TableCell>
                                                <TableCell>
                                                    {rental.status === "PENDING" && (
                                                        <>
                                                            <Button
                                                                variant="contained"
                                                                color="success"
                                                                sx={{ marginRight: 1 }}
                                                                onClick={() => handleRentalAction(rental.id, "APPROVED")}
                                                            >
                                                                Approve
                                                            </Button>
                                                            <Button
                                                                variant="contained"
                                                                color="error"
                                                                onClick={() => handleRentalAction(rental.id, "REJECTED")}
                                                            >
                                                                Reject
                                                            </Button>
                                                        </>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Box>
                )}
            </Paper>
        </Box>
    );
};

export default ManageViewingRequests;
