// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//     Box,
//     Typography,
//     CircularProgress,
//     Button,
//     AppBar,
//     Toolbar,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
//     Select,
//     MenuItem,
//     List,
//     ListItem,
//     ListItemText,
//     ListItemSecondaryAction
// } from "@mui/material";
//
// const ManageRequests = () => {
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [rentalRequests, setRentalRequests] = useState([]);
//     const [viewingRequests, setViewingRequests] = useState([]);
//     const [selectedViewingRequest, setSelectedViewingRequest] = useState(null);
//     const [selectedSlot, setSelectedSlot] = useState("");
//     const [availabilitySlots, setAvailabilitySlots] = useState([]);
//     const [dialogOpen, setDialogOpen] = useState(false);
//
//     useEffect(() => {
//         const fetchRequests = async () => {
//             const token = localStorage.getItem("token");
//             const tenantId = localStorage.getItem("userId");
//
//             if (token && tenantId) {
//                 try {
//                     const rentalResponse = await axios.get(`http://localhost:8080/api/tenant/{}/rental-requests`, {
//                         headers: { Authorization: `Bearer ${token}` }
//                     });
//                     const viewingResponse = await axios.get(`http://localhost:8080/api/viewing-requests`, {
//                         headers: { Authorization: `Bearer ${token}` }
//                     });
//
//                     const tenantRentalRequests = rentalResponse.data.filter(request => request.tenant.id == tenantId);
//                     const tenantViewingRequests = viewingResponse.data.filter(request => request.tenant.id == tenantId);
//
//                     setRentalRequests(tenantRentalRequests);
//                     setViewingRequests(tenantViewingRequests);
//                 } catch (err) {
//                     setError("Failed to fetch requests. Please try again.");
//                 } finally {
//                     setLoading(false);
//                 }
//             }
//         };
//         fetchRequests();
//     }, []);
//
//     const handleCancelRequest = async (requestId, type) => {
//         const token = localStorage.getItem("token");
//         try {
//             await axios.put(`http://localhost:8080/api/${type}-requests/${requestId}/status?status=CANCELLED`, {}, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             alert(`${type.charAt(0).toUpperCase() + type.slice(1)} request cancelled successfully!`);
//             // Refresh the requests list
//             window.location.reload();
//         } catch (error) {
//             console.error(`Error cancelling ${type} request:`, error);
//             alert(`Failed to cancel ${type} request.`);
//         }
//     };
//
//     const handleUpdateViewingRequest = async () => {
//         const token = localStorage.getItem("token");
//         try {
//             await axios.put(`http://localhost:8080/api/viewing-requests/${selectedViewingRequest.id}`, {
//                 availabilitySlot: { id: selectedSlot.id }
//             }, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             alert("Viewing request updated successfully!");
//             setDialogOpen(false);
//             // Refresh the requests list
//             window.location.reload();
//         } catch (error) {
//             console.error("Error updating viewing request:", error);
//             alert("Failed to update viewing request.");
//         }
//     };
//
//     const handleOpenDialog = (request) => {
//         setSelectedViewingRequest(request);
//         setAvailabilitySlots(request.property.availabilitySlots || []);
//         setDialogOpen(true);
//     };
//
//     return (
//         <Box sx={{ width: "100vw", height: "100vh", backgroundColor: "#f5f5f5" }}>
//             <AppBar position="static" sx={{ backgroundColor: "#3f51b5", color: "white" }}>
//                 <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//                     <Typography variant="h6">Manage Requests</Typography>
//                     <Box>
//                         <Button color="inherit" onClick={() => navigate("/tenant-dashboard")}>Home</Button>
//                         <Button color="inherit" onClick={() => navigate("/profile")}>Profile</Button>
//                         <Button color="inherit" onClick={() => navigate("/available")}>Properties</Button>
//                     </Box>
//                 </Toolbar>
//             </AppBar>
//
//             {loading ? (
//                 <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
//                     <CircularProgress />
//                 </Box>
//             ) : error ? (
//                 <Typography sx={{ textAlign: "center", color: "red", marginTop: 4 }}>{error}</Typography>
//             ) : (
//                 <Box sx={{ padding: 4 }}>
//                     <Typography variant="h4" sx={{ marginBottom: 4 }}>Rental Requests</Typography>
//                     <List>
//                         {rentalRequests.map(request => (
//                             <ListItem key={request.id}>
//                                 <ListItemText
//                                     primary={`Property: ${request.property.category} - Status: ${request.status}`}
//                                 />
//                                 <ListItemSecondaryAction>
//                                     <Button onClick={() => handleCancelRequest(request.id, "rental")} color="error">
//                                         Cancel
//                                     </Button>
//                                 </ListItemSecondaryAction>
//                             </ListItem>
//                         ))}
//                     </List>
//
//                     <Typography variant="h4" sx={{ marginBottom: 4, marginTop: 4 }}>Viewing Requests</Typography>
//                     <List>
//                         {viewingRequests.map(request => (
//                             <ListItem key={request.id}>
//                                 <ListItemText
//                                     primary={`Property: ${request.property.category} - Status: ${request.status}`}
//                                     secondary={`Slot: ${request.availabilitySlot.dayOfWeek} ${request.availabilitySlot.startHour}:00 - ${request.availabilitySlot.endHour}:00`}
//                                 />
//                                 <ListItemSecondaryAction>
//                                     <Button onClick={() => handleOpenDialog(request)} color="primary" sx={{ marginRight: 2 }}>
//                                         Update Slot
//                                     </Button>
//                                     <Button onClick={() => handleCancelRequest(request.id, "viewing")} color="error">
//                                         Cancel
//                                     </Button>
//                                 </ListItemSecondaryAction>
//                             </ListItem>
//                         ))}
//                     </List>
//                 </Box>
//             )}
//
//             <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
//                 <DialogTitle>Update Viewing Slot</DialogTitle>
//                 <DialogContent>
//                     <Select
//                         fullWidth
//                         value={selectedSlot}
//                         onChange={(e) => setSelectedSlot(e.target.value)}
//                     >
//                         {availabilitySlots.map(slot => (
//                             <MenuItem key={slot.id} value={slot}>
//                                 {slot.dayOfWeek} {slot.startHour}:00 - {slot.endHour}:00
//                             </MenuItem>
//                         ))}
//                     </Select>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
//                     <Button onClick={handleUpdateViewingRequest} color="primary">Update</Button>
//                 </DialogActions>
//             </Dialog>
//         </Box>
//     );
// };
//
// export default ManageRequests;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    MenuItem,
    Paper
} from "@mui/material";

const ManageRequests = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tenant, setTenant] = useState(null);
    const [selectedViewingRequest, setSelectedViewingRequest] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState("");
    const [availabilitySlots, setAvailabilitySlots] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        const fetchTenantRequests = async () => {
            const tenantId = localStorage.getItem("userId");
            const token = localStorage.getItem("token");

            if (tenantId && token) {
                try {
                    const response = await axios.get(`http://localhost:8080/api/tenants/${tenantId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    setTenant(response.data);
                    console.log("Repsonse for the tenant in manage requests: ", response.data)
                } catch (err) {
                    setError("Failed to fetch tenant requests. Please try again.");
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchTenantRequests();
    }, []);

    const handleCancelRequest = async (requestId, type) => {
        const token = localStorage.getItem("token");
        try {
            await axios.put(`http://localhost:8080/api/${type}-requests/${requestId}/status?status=CANCELLED`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert(`${type.charAt(0).toUpperCase() + type.slice(1)} request cancelled successfully!`);
            window.location.reload();
        } catch (error) {
            alert(`Failed to cancel ${type} request.`);
        }
    };

    const handleUpdateViewingRequest = async () => {
        const token = localStorage.getItem("token");
        try {
            await axios.put(`http://localhost:8080/api/viewing-requests/${selectedViewingRequest.id}`, {
                availabilitySlot: { id: selectedSlot.id }
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log("Availability chosen: ", availabilitySlot)
            alert("Viewing request updated successfully!");
            setDialogOpen(false);
            window.location.reload();
        } catch (error) {
            alert("Failed to update viewing request.");
        }
    };

    const handleOpenDialog = (request) => {
        setSelectedViewingRequest(request);

        // Ensure the request and its property are valid
        if (!request || !request.property || !request.availabilitySlot) {
            console.error("Invalid request data:", request);
            return;
        }

        const currentSlotId = request.availabilitySlot.id;

        // Ensure availabilitySlots exist before filtering
        const otherSlots = request.property.availabilitySlots
            ? request.property.availabilitySlots.filter(slot => slot.id !== currentSlotId)
            : [];

        setAvailabilitySlots(otherSlots);
        setDialogOpen(true);
    };

    const handleLogout = () => {
        const token = localStorage.getItem("token")
        axios.post("http://localhost:8080/api/logout", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                localStorage.removeItem("authToken");
                localStorage.removeItem("userId");
                localStorage.removeItem("user");
                localStorage.removeItem("username");
                navigate("/login");
            })
            .catch((error) => console.error("Logout failed:", error));
    };


    return (
        <Box sx={{ width: "100vw", minHeight: "100vh", backgroundColor: "#f5f5f5", paddingBottom: 4 }}>
            <AppBar position="static" sx={{ backgroundColor: "#3f51b5", color: "white" }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h6">Manage Requests</Typography>
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
            ) : tenant && (
                <Box sx={{ padding: 4 }}>
                    {/* Rental Requests Section */}
                    <Typography variant="h4" sx={{ color: "#3f51b5", textAlign: "center", marginBottom: 3 }}>
                        Rental Requests
                    </Typography>

                    {tenant.rentalRequests?.length > 0 ? (
                        tenant.rentalRequests.map((request) => (
                            <Paper key={request.id} sx={{ padding: 2, marginBottom: 2, borderRadius: 2, boxShadow: 2 }}>
                                <Typography><strong>Property:</strong> {request.property.address}</Typography>
                                <Typography><strong>Status:</strong> {request.status}</Typography>
                                <Button
                                    onClick={() => handleCancelRequest(request.id, "rental")}
                                    color="error"
                                    sx={{ marginTop: 1 }}
                                >
                                    Cancel
                                </Button>
                            </Paper>
                        ))
                    ) : (
                        <Typography sx={{ textAlign: "center", color: "gray", marginTop: 2 }}>
                            No rental requests found.
                        </Typography>
                    )}

                    {/* Viewing Requests Section */}
                    <Typography variant="h4" sx={{ color: "#3f51b5", textAlign: "center", marginTop: 4, marginBottom: 3 }}>
                        Viewing Requests
                    </Typography>

                    {tenant.viewingRequests?.length > 0 ? (
                        tenant.viewingRequests.map((request) => (
                            <Paper key={request.id} sx={{ padding: 2, marginBottom: 2, borderRadius: 2, boxShadow: 2 }}>
                                <Typography><strong>Property:</strong> {request.property.address}</Typography>
                                <Typography><strong>Status:</strong> {request.status}</Typography>
                                <Typography>
                                    <strong>Slot:</strong> {request.availabilitySlot.dayOfWeek} {request.availabilitySlot.startHour}:00 - {request.availabilitySlot.endHour}:00
                                </Typography>
                                <Box sx={{ marginTop: 1, display: "flex", gap: 2 }}>
                                    <Button onClick={() => handleOpenDialog(request)} color="primary">
                                        Update Slot
                                    </Button>
                                    <Button onClick={() => handleCancelRequest(request.id, "viewing")} color="error">
                                        Cancel
                                    </Button>
                                </Box>
                            </Paper>
                        ))
                    ) : (
                        <Typography sx={{ textAlign: "center", color: "gray", marginTop: 2 }}>
                            No viewing requests found.
                        </Typography>
                    )}
                </Box>
            )}

            {/* Update Slot Dialog */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Update Viewing Slot</DialogTitle>
                <DialogContent>
                    {availabilitySlots.length > 0 ? (
                        <Select
                            fullWidth
                            value={selectedSlot}
                            onChange={(e) => setSelectedSlot(e.target.value)}
                        >
                            {availabilitySlots.map(slot => (
                                <MenuItem key={slot.id} value={slot}>
                                    {slot.dayOfWeek} {slot.startHour}:00 - {slot.endHour}:00
                                </MenuItem>
                            ))}
                        </Select>
                    ) : (
                        <Typography color="textSecondary">No other slots available for this property.</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                    <Button
                        onClick={handleUpdateViewingRequest}
                        color="primary"
                        disabled={!selectedSlot} // Disable if no slot is selected
                    >
                        Update
                    </Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
};

export default ManageRequests;
