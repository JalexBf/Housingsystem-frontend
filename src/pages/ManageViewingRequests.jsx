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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchViewingRequests();
    }, []);


    const fetchViewingRequests = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:8080/api/viewing-requests/my-requests", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setRequests(response.data);
        } catch (err) {
            setError("Failed to fetch viewing requests.");
        } finally {
            setLoading(false);
        }
    };

    const handleRequestAction = async (id, status) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("🚨 No token found! Redirecting to login.");
                setError("Authentication error.");
                return;
            }

            console.log(`🔹 Sending PUT request with JSON body. ID: ${id}, Status: ${status}`);

            await axios.post(
                `http://localhost:8080/api/viewing-requests/${id}/status`,
                { status: status }, // ✅ Send JSON body
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log(`✅ Successfully updated request ${id} to ${status}`);
            fetchViewingRequests(); // Refresh list
        } catch (error) {
            console.error("🚨 Error updating request:", error);
            setError("Action failed.");
        }
    };





    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 800 }}>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>Manage Viewing Requests</Typography>
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
                ) : requests.length === 0 ? (
                    <Typography>No viewing requests available.</Typography>
                ) : (
                    <TableContainer>
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
                                {requests.map(request => (
                                    <TableRow key={request.id}>
                                        <TableCell>{request.tenant ? request.tenant.username : "Unknown User"}</TableCell>
                                        <TableCell>{request.property.id}</TableCell>
                                        <TableCell>{request.status}</TableCell>
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
                )}
            </Paper>
        </Box>
    );
};

export default ManageViewingRequests;