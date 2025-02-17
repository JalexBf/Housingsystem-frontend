// import React, { useEffect, useState } from "react";
// import {Box, Typography, Button, Paper, AppBar, Toolbar, CircularProgress} from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
//
// const TenantProfile = () => {
//     const navigate = useNavigate();
//     const [tenant, setTenant] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [rentalRequests, setRentalRequests] = useState([]);
//     const [viewingRequests, setViewingRequests] = useState([]);
//
//
//     // useEffect(() => {
//     //     const tenantId = localStorage.getItem("userId");
//     //     const accessToken = localStorage.getItem("token");
//     //     console.log("Tenant Id:", tenantId)
//     //     if (tenantId) {
//     //         axios.get(`http://localhost:8080/api/tenants/${tenantId}`)
//     //             .then((response) => getTenant(response.data))
//     //             .catch((error) => console.error("Error fetching tenant info:", error));
//     //
//     //         axios.get(`http://localhost:8080/api/rental-requests/${tenantId}`)
//     //             .then(response => {
//     //                 console.log("Rental Requests Response:", response.data); // Debugging
//     //                 if (Array.isArray(response.data)) {
//     //                     setRentalRequests(response.data);
//     //                 } else {
//     //                     setRentalRequests([]); // Ensure it's always an array
//     //                 }
//     //             })
//     //             .catch(error => {
//     //                 console.error("Error fetching rental requests:", error);
//     //                 setRentalRequests([]); // Avoid setting undefined
//     //             });
//     //
//     //         axios.get(`http://localhost:8080/api/viewing-requests/${tenantId}`)
//     //             .then(response => {
//     //                 console.log("Viewing Requests Response:", response.data); // Debugging
//     //                 if (Array.isArray(response.data)) {
//     //                     setViewingRequests(response.data);
//     //                 } else {
//     //                     setViewingRequests([]); // Ensure it's always an array
//     //                 }
//     //             })
//     //             .catch(error => {
//     //                 console.error("Error fetching viewing requests:", error);
//     //                 setViewingRequests([]); // Avoid setting undefined
//     //             });
//     //
//     //     } else {
//     //         console.error("No tenant ID found in localStorage");
//     //     }
//     // }, []);
//
//     useEffect(() => {
//         const tenantId = localStorage.getItem("userId");
//         const token = localStorage.getItem("token"); // Retrieve token
//
//         console.log("Tenant Id in profile: ", tenantId);
//         console.log("Token: ", token); // Debugging
//
//         if (tenantId && token) {
//             axios.get(`http://localhost:8080/api/tenants/${tenantId}`, {
//                 headers: { Authorization: `Bearer ${token}` }
//             })
//                 .then(response => {
//                     console.log("Received tenant data:", response.data);
//                     setTenant(response.data);
//                     console.log("Type of response data:", typeof response.data);
//                     console.log("Is response an array?", Array.isArray(response.data));
//                 })
//                 .catch(error => {
//                     console.error("Error fetching tenant info:", error.response?.data || error.message);
//                 })
//             .finally(() => setLoading(false)); // Ensure loading state is updated
//         } else {
//             console.error("No tenant ID or token found in localStorage");
//             setError("No tenant ID found.");
//             setLoading(false);
//         }
//     }, []);
//
//     const handleLogout = () => {
//         axios.post("http://localhost:8080/api/logout")
//             .then(() => {
//                 localStorage.removeItem("authToken");
//                 localStorage.removeItem("userId");
//                 navigate("/login");
//             })
//             .catch((error) => console.error("Logout failed:", error));
//     };
//
//
//     return (
//         <Box sx={{  width: "100vw", height: "100vh", backgroundColor: "#f5f5f5" }}>
//             <AppBar position="static" sx={{ backgroundColor: "#3f51b5", color: "white" }}>
//                 <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//                     <Typography variant="h6">Profile</Typography>
//                     <Box>
//                         <Button color="inherit" onClick={() => navigate("/tenant-dashboard")}>Home</Button>
//                         <Button color="inherit" onClick={() => navigate("/profile")}>Profile</Button>
//                         <Button color="inherit" onClick={() => navigate("/available")}>Properties</Button>
//                         <Button color="inherit" onClick={handleLogout}>Logout</Button>
//                     </Box>
//                 </Toolbar>
//             </AppBar>
//
//             {/*<Typography variant="h2" sx={{ marginBottom: 4, fontWeight: "bold", color: "#3f51b5", textAlign: "left"   }}>*/}
//             {/*    Profile*/}
//             {/*</Typography>*/}
//
//             {loading ? (
//                 <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
//                     <CircularProgress />
//                 </Box>
//             ) : error ? (
//                 <Typography sx={{ textAlign: "center", color: "#3f51b5", marginTop: 4 }}>
//                     {error}
//                 </Typography>
//             ) : tenant && (
//                 <Paper sx={{
//                     padding: 4,
//                     border: "1px solid #ddd",
//                     borderRadius: 2,
//                     color: "#3f51b5",
//                     justifyContent: "center",
//                     boxShadow: 1
//                 }} >
//                     <Typography variant="h6">User Information</Typography>
//                     <Typography>Username: {tenant.username}</Typography>
//                     <Typography>First Name: {tenant.firstName}</Typography>
//                     <Typography>Last Name: {tenant.lastName}</Typography>
//                     <Typography>Email: {tenant.email}</Typography>
//                 </Paper>
//             )}
//
//             <Typography variant="h3" sx={{ color: "#3f51b5", textAlign: "center", width: "100%", marginTop: 3 }}>
//                 Rental Requests
//             </Typography>
//
//             {Array.isArray(rentalRequests) && rentalRequests.length > 0 ? rentalRequests.map(request => (
//                 <Paper key={request.id} sx={{ padding: 2, marginBottom: 1 }}>
//                     <Typography variant="h5" sx={{ color: "#3f51b5", textAlign: "center", width: "100%", marginTop: 3 }}>{request.details}</Typography>
//                 </Paper>
//             )) : (
//                 <Typography variant="h5" sx={{ color: "#3f51b5", textAlign: "center", width: "100%", marginTop: 3 }}>No rental requests found.</Typography>
//             )}
//
//             <Typography variant="h3" sx={{ color: "#3f51b5", textAlign: "center", width: "100%", marginTop: 3 }}>
//                 Viewing Requests
//             </Typography>
//
//             {Array.isArray(viewingRequests) && viewingRequests.length > 0 ? viewingRequests.map(request => (
//                 <Paper key={request.id} sx={{ padding: 2, marginBottom: 1 }}>
//                     <Typography variant="h5" sx={{ color: "#3f51b5", textAlign: "center", width: "100%", marginTop: 3 }}>{request.details}</Typography>
//                 </Paper>
//             )) : (
//                 <Typography variant="h5" sx={{ color: "#3f51b5", textAlign: "center", width: "100%", marginTop: 3 }}>No viewing requests found.</Typography>
//             )}
//
//             <Box sx={{ position: "absolute", bottom: 16, left: 16 }}>
//                 <Button variant="contained" onClick={() => navigate("/tenant-dashboard")}>Back to Dashboard</Button>
//             </Box>
//         </Box>
//     );
// };
//
// export default TenantProfile;



import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Button,
    Paper,
    AppBar,
    Toolbar,
    CircularProgress,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TenantProfile = () => {
    const navigate = useNavigate();
    const [tenant, setTenant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [rentalRequests, setRentalRequests] = useState([]);
    const [viewingRequests, setViewingRequests] = useState([]);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editedTenant, setEditedTenant] = useState({
        username: "",
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
    });

    useEffect(() => {
        const tenantId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        console.log("Tenant Id in profile: ", tenantId);
        console.log("Token: ", token);

        if (tenantId && token) {
            axios
                .get(`http://localhost:8080/api/tenants/${tenantId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    console.log("Received tenant data:", response.data);
                    setTenant(response.data);
                    setEditedTenant({
                        username: response.data.username,
                        firstName: response.data.firstName,
                        lastName: response.data.lastName,
                        phone: response.data.phone,
                        email: response.data.email,
                    });
                })
                .catch((error) => {
                    console.error("Error fetching tenant info:", error.response?.data || error.message);
                })
                .finally(() => setLoading(false));
        } else {
            console.error("No tenant ID or token found in localStorage");
            setError("No tenant ID found.");
            setLoading(false);
        }
    }, []);

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

    const handleEditClick = () => {
        setEditDialogOpen(true);
    };

    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedTenant((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSaveChanges = () => {
        const tenantId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        if (tenantId && token) {
            axios
                .put(`http://localhost:8080/api/tenants/${tenantId}`, editedTenant, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    console.log("Tenant updated successfully:", response.data);
                    setTenant(response.data); // Update the displayed tenant data
                    setEditDialogOpen(false); // Close the edit dialog
                })
                .catch((error) => {
                    console.error("Error updating tenant info:", error.response?.data || error.message);
                });
        }
    };

    return (
        <Box sx={{ width: "100vw", height: "100vh", backgroundColor: "#f5f5f5" }}>
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

            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography sx={{ textAlign: "center", color: "#3f51b5", marginTop: 4 }}>
                    {error}
                </Typography>
            ) : tenant && (
                <Paper
                    sx={{
                        padding: 4,
                        border: "1px solid #ddd",
                        borderRadius: 2,
                        color: "#3f51b5",
                        justifyContent: "center",
                        boxShadow: 1,
                        margin: 2,
                    }}
                >
                    <Typography variant="h6">User Information</Typography>
                    <Typography>Username: {tenant.username}</Typography>
                    <Typography>First Name: {tenant.firstName}</Typography>
                    <Typography>Last Name: {tenant.lastName}</Typography>
                    <Typography>Email: {tenant.email}</Typography>
                    <Typography>Phone: {tenant.phone}</Typography>
                    <Button variant="contained" onClick={handleEditClick} sx={{ marginTop: 2 }}>
                        Edit Profile
                    </Button>
                </Paper>
            )}

            {/* Edit Dialog */}
            <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Username"
                        name="username"
                        value={editedTenant.username}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={editedTenant.firstName}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        value={editedTenant.lastName}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={editedTenant.email}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Phone"
                        name="phone"
                        value={editedTenant.phone}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditDialogClose}>Cancel</Button>
                    <Button onClick={handleSaveChanges} color="primary">
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>

            <Typography variant="h3" sx={{ color: "#3f51b5", textAlign: "center", width: "100%", marginTop: 3 }}>
                Rental Requests
            </Typography>

            {Array.isArray(rentalRequests) && rentalRequests.length > 0 ? (
                rentalRequests.map((request) => (
                    <Paper key={request.id} sx={{ padding: 2, marginBottom: 1 }}>
                        <Typography variant="h5" sx={{ color: "#3f51b5", textAlign: "center", width: "100%", marginTop: 3 }}>
                            {request.details}
                        </Typography>
                    </Paper>
                ))
            ) : (
                <Typography variant="h5" sx={{ color: "#3f51b5", textAlign: "center", width: "100%", marginTop: 3 }}>
                    No rental requests found.
                </Typography>
            )}

            <Typography variant="h3" sx={{ color: "#3f51b5", textAlign: "center", width: "100%", marginTop: 3 }}>
                Viewing Requests
            </Typography>

            {Array.isArray(viewingRequests) && viewingRequests.length > 0 ? (
                viewingRequests.map((request) => (
                    <Paper key={request.id} sx={{ padding: 2, marginBottom: 1 }}>
                        <Typography variant="h5" sx={{ color: "#3f51b5", textAlign: "center", width: "100%", marginTop: 3 }}>
                            {request.details}
                        </Typography>
                    </Paper>
                ))
            ) : (
                <Typography variant="h5" sx={{ color: "#3f51b5", textAlign: "center", width: "100%", marginTop: 3 }}>
                    No viewing requests found.
                </Typography>
            )}

            <Box sx={{ position: "absolute", bottom: 16, left: 16 }}>
                <Button variant="contained" onClick={() => navigate("/tenant-dashboard")}>
                    Back to Dashboard
                </Button>
            </Box>
        </Box>
    );
};

export default TenantProfile;