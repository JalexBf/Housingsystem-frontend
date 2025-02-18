// import React, { useEffect, useState } from "react";
// import {
//     Box,
//     Typography,
//     Button,
//     Paper,
//     AppBar,
//     Toolbar,
//     CircularProgress,
//     TextField,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
// } from "@mui/material";
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
//     const [editDialogOpen, setEditDialogOpen] = useState(false);
//     const [editedTenant, setEditedTenant] = useState({
//         username: "",
//         firstName: "",
//         lastName: "",
//         phone: "",
//         email: "",
//     });
//
//     useEffect(() => {
//         const tenantId = localStorage.getItem("userId");
//         const token = localStorage.getItem("token");
//
//         console.log("Tenant Id in profile: ", tenantId);
//         console.log("Token: ", token);
//
//         if (tenantId && token) {
//             axios
//                 .get(`http://localhost:8080/api/tenants/${tenantId}`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 })
//                 .then((response) => {
//                     console.log("Received tenant data:", response.data);
//                     setTenant(response.data);
//                     setRentalRequests(response.data.rental)
//                     console.log("Rental requests: ", response.data.rental)
//                     setViewingRequests(response.data.viewing)
//                     setEditedTenant({
//                         username: response.data.username,
//                         firstName: response.data.firstName,
//                         lastName: response.data.lastName,
//                         phone: response.data.phone,
//                         email: response.data.email,
//                     });
//                 })
//                 .catch((error) => {
//                     console.error("Error fetching tenant info:", error.response?.data || error.message);
//                 })
//                 .finally(() => setLoading(false));
//         } else {
//             console.error("No tenant ID or token found in localStorage");
//             setError("No tenant ID found.");
//             setLoading(false);
//         }
//     }, []);
//
//     const handleLogout = () => {
//         axios
//             .post("http://localhost:8080/api/logout")
//             .then(() => {
//                 localStorage.removeItem("authToken");
//                 localStorage.removeItem("userId");
//                 navigate("/login");
//             })
//             .catch((error) => console.error("Logout failed:", error));
//     };
//
//     const handleEditClick = () => {
//         setEditDialogOpen(true);
//     };
//
//     const handleEditDialogClose = () => {
//         setEditDialogOpen(false);
//     };
//
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setEditedTenant((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };
//
//     const handleSaveChanges = () => {
//         const tenantId = localStorage.getItem("userId");
//         const token = localStorage.getItem("token");
//
//         if (tenantId && token) {
//             axios
//                 .put(`http://localhost:8080/api/tenants/${tenantId}`, editedTenant, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 })
//                 .then((response) => {
//                     console.log("Tenant updated successfully:", response.data);
//                     setTenant(response.data); // Update the displayed tenant data
//                     setEditDialogOpen(false); // Close the edit dialog
//                 })
//                 .catch((error) => {
//                     console.error("Error updating tenant info:", error.response?.data || error.message);
//                 });
//         }
//     };
//
//     return (
//         <Box sx={{ width: "100vw", height: "100vh", backgroundColor: "#f5f5f5" }}>
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
//             {loading ? (
//                 <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
//                     <CircularProgress />
//                 </Box>
//             ) : error ? (
//                 <Typography sx={{ textAlign: "center", color: "#3f51b5", marginTop: 4 }}>
//                     {error}
//                 </Typography>
//             ) : tenant && (
//                 <Paper
//                     sx={{
//                         padding: 4,
//                         border: "1px solid #ddd",
//                         borderRadius: 2,
//                         color: "#3f51b5",
//                         justifyContent: "center",
//                         boxShadow: 1,
//                         margin: 2,
//                     }}
//                 >
//                     <Typography variant="h6">User Information</Typography>
//                     <Typography>Username: {tenant.username}</Typography>
//                     <Typography>First Name: {tenant.firstName}</Typography>
//                     <Typography>Last Name: {tenant.lastName}</Typography>
//                     <Typography>Email: {tenant.email}</Typography>
//                     <Typography>Phone: {tenant.phone}</Typography>
//                     <Button variant="contained" onClick={handleEditClick} sx={{ marginTop: 2 }}>
//                         Edit Profile
//                     </Button>
//                 </Paper>
//             )}
//
//             {/* Edit Dialog */}
//             <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
//                 <DialogTitle>Edit Profile</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         fullWidth
//                         label="Username"
//                         name="username"
//                         value={editedTenant.username}
//                         onChange={handleInputChange}
//                         margin="normal"
//                     />
//                     <TextField
//                         fullWidth
//                         label="First Name"
//                         name="firstName"
//                         value={editedTenant.firstName}
//                         onChange={handleInputChange}
//                         margin="normal"
//                     />
//                     <TextField
//                         fullWidth
//                         label="Last Name"
//                         name="lastName"
//                         value={editedTenant.lastName}
//                         onChange={handleInputChange}
//                         margin="normal"
//                     />
//                     <TextField
//                         fullWidth
//                         label="Email"
//                         name="email"
//                         value={editedTenant.email}
//                         onChange={handleInputChange}
//                         margin="normal"
//                     />
//                     <TextField
//                         fullWidth
//                         label="Phone"
//                         name="phone"
//                         value={editedTenant.phone}
//                         onChange={handleInputChange}
//                         margin="normal"
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleEditDialogClose}>Cancel</Button>
//                     <Button onClick={handleSaveChanges} color="primary">
//                         Save Changes
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//
//             <Typography variant="h3" sx={{ color: "#3f51b5", textAlign: "center", width: "100%", marginTop: 3 }}>
//                 Rental Requests
//             </Typography>
//
//             {rentalRequests.length > 0 ? (
//                 rentalRequests.map((rentalRequest) => (
//                     <Typography key={rentalRequest.id}>
//                         rentalRequest
//                     </Typography>
//                 ))
//             ) : (
//                 <Typography color="error">No rental requests found.</Typography>
//             )}
//
//             <Typography variant="h3" sx={{ color: "#3f51b5", textAlign: "center", width: "100%", marginTop: 3 }}>
//                 Viewing Requests
//             </Typography>
//
//             {viewingRequests.length > 0 ? (
//                 viewingRequests.map((viewingRequest) => (
//                     <Typography key={viewingRequest.id}>
//                         viewingRequest
//                     </Typography>
//                 ))
//             ) : (
//                 <Typography color="error">No viewing requests found.</Typography>
//             )}
//
//             <Box sx={{ position: "absolute", bottom: 16, left: 16 }}>
//                 <Button variant="contained" onClick={() => navigate("/tenant-dashboard")}>
//                     Back to Dashboard
//                 </Button>
//             </Box>
//         </Box>
//     );
// };
//
// export default TenantProfile;


//
//
// import React, { useEffect, useState } from "react";
// import {
//     Box,
//     Typography,
//     Button,
//     Paper,
//     AppBar,
//     Toolbar,
//     CircularProgress,
//     TextField,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
// } from "@mui/material";
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
//     const [editDialogOpen, setEditDialogOpen] = useState(false);
//     const [editedTenant, setEditedTenant] = useState({
//         username: "",
//         firstName: "",
//         lastName: "",
//         phone: "",
//         email: "",
//     });
//
//     useEffect(() => {
//         const tenantId = localStorage.getItem("userId");
//         const token = localStorage.getItem("token");
//
//         console.log("Tenant Id in profile: ", tenantId);
//         console.log("Token: ", token);
//
//         if (tenantId && token) {
//             axios
//                 .get(`http://localhost:8080/api/tenants/${tenantId}`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 })
//                 .then((response) => {
//                     console.log("Received tenant data:", response.data);
//                     setTenant(response.data);
//                     setRentalRequests(response.data.rental || []); // Ensure rentalRequests is an array
//                     setViewingRequests(response.data.viewing || []); // Ensure viewingRequests is an array
//                     setEditedTenant({
//                         username: response.data.username,
//                         firstName: response.data.firstName,
//                         lastName: response.data.lastName,
//                         phone: response.data.phone,
//                         email: response.data.email,
//                     });
//                 })
//                 .catch((error) => {
//                     console.error("Error fetching tenant info:", error.response?.data || error.message);
//                     setError("Failed to fetch tenant information.");
//                 })
//                 .finally(() => setLoading(false));
//         } else {
//             console.error("No tenant ID or token found in localStorage");
//             setError("No tenant ID found.");
//             setLoading(false);
//         }
//     }, []);
//
//     const handleLogout = () => {
//         axios
//             .post("http://localhost:8080/api/logout")
//             .then(() => {
//                 localStorage.removeItem("authToken");
//                 localStorage.removeItem("userId");
//                 navigate("/login");
//             })
//             .catch((error) => console.error("Logout failed:", error));
//     };
//
//     const handleEditClick = () => {
//         setEditDialogOpen(true);
//     };
//
//     const handleEditDialogClose = () => {
//         setEditDialogOpen(false);
//     };
//
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setEditedTenant((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };
//
//     const handleSaveChanges = () => {
//         const tenantId = localStorage.getItem("userId");
//         const token = localStorage.getItem("token");
//
//         if (tenantId && token) {
//             axios
//                 .put(`http://localhost:8080/api/tenants/${tenantId}`, editedTenant, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 })
//                 .then((response) => {
//                     console.log("Tenant updated successfully:", response.data);
//                     setTenant(response.data); // Update the displayed tenant data
//                     setEditDialogOpen(false); // Close the edit dialog
//                 })
//                 .catch((error) => {
//                     console.error("Error updating tenant info:", error.response?.data || error.message);
//                 });
//         }
//     };
//
//     return (
//         <Box sx={{ width: "100vw", height: "100vh", backgroundColor: "#f5f5f5" }}>
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
//             {loading ? (
//                 <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
//                     <CircularProgress />
//                 </Box>
//             ) : error ? (
//                 <Typography sx={{ textAlign: "center", color: "red", marginTop: 4 }}>
//                     {error}
//                 </Typography>
//             ) : tenant && (
//                 <Paper
//                     sx={{
//                         padding: 4,
//                         border: "1px solid #ddd",
//                         borderRadius: 2,
//                         color: "#3f51b5",
//                         justifyContent: "center",
//                         boxShadow: 1,
//                         margin: 2,
//                     }}
//                 >
//                     <Typography variant="h6">User Information</Typography>
//                     <Typography>Username: {tenant.username}</Typography>
//                     <Typography>First Name: {tenant.firstName}</Typography>
//                     <Typography>Last Name: {tenant.lastName}</Typography>
//                     <Typography>Email: {tenant.email}</Typography>
//                     <Typography>Phone: {tenant.phone}</Typography>
//                     <Button variant="contained" onClick={handleEditClick} sx={{ marginTop: 2 }}>
//                         Edit Profile
//                     </Button>
//                 </Paper>
//             )}
//
//             {/* Edit Dialog */}
//             <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
//                 <DialogTitle>Edit Profile</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         fullWidth
//                         label="Username"
//                         name="username"
//                         value={editedTenant.username}
//                         onChange={handleInputChange}
//                         margin="normal"
//                     />
//                     <TextField
//                         fullWidth
//                         label="First Name"
//                         name="firstName"
//                         value={editedTenant.firstName}
//                         onChange={handleInputChange}
//                         margin="normal"
//                     />
//                     <TextField
//                         fullWidth
//                         label="Last Name"
//                         name="lastName"
//                         value={editedTenant.lastName}
//                         onChange={handleInputChange}
//                         margin="normal"
//                     />
//                     <TextField
//                         fullWidth
//                         label="Email"
//                         name="email"
//                         value={editedTenant.email}
//                         onChange={handleInputChange}
//                         margin="normal"
//                     />
//                     <TextField
//                         fullWidth
//                         label="Phone"
//                         name="phone"
//                         value={editedTenant.phone}
//                         onChange={handleInputChange}
//                         margin="normal"
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleEditDialogClose}>Cancel</Button>
//                     <Button onClick={handleSaveChanges} color="primary">
//                         Save Changes
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//
//             {/* Rental Requests Section */}
//             <Typography variant="h4" sx={{ color: "#3f51b5", textAlign: "center", width: "100%", marginTop: 3 }}>
//                 Rental Requests
//             </Typography>
//
//             {rentalRequests.length > 0 ? (
//                 rentalRequests.map((rentalRequest) => (
//                     <Paper key={rentalRequest.id} sx={{ padding: 2, margin: 2, boxShadow: 1 }}>
//                         <Typography>Request ID: {rentalRequest.id}</Typography>
//                         <Typography>Status: {rentalRequest.status}</Typography>
//                         <Typography>Property ID: {rentalRequest.property?.id}</Typography>
//                     </Paper>
//                 ))
//             ) : (
//                 <Typography sx={{ textAlign: "center", color: "red", marginTop: 2 }}>
//                     No rental requests found.
//                 </Typography>
//             )}
//
//             {/* Viewing Requests Section */}
//             <Typography variant="h4" sx={{ color: "#3f51b5", textAlign: "center", width: "100%", marginTop: 3 }}>
//                 Viewing Requests
//             </Typography>
//
//             {viewingRequests.length > 0 ? (
//                 viewingRequests.map((viewingRequest) => (
//                     <Paper key={viewingRequest.id} sx={{ padding: 2, margin: 2, boxShadow: 1 }}>
//                         <Typography>Request ID: {viewingRequest.id}</Typography>
//                         <Typography>Status: {viewingRequest.status}</Typography>
//                         <Typography>Property ID: {viewingRequest.property?.id}</Typography>
//                     </Paper>
//                 ))
//             ) : (
//                 <Typography sx={{ textAlign: "center", color: "red", marginTop: 2 }}>
//                     No viewing requests found.
//                 </Typography>
//             )}
//
//             <Box sx={{ position: "absolute", bottom: 16, left: 16 }}>
//                 <Button variant="contained" onClick={() => navigate("/tenant-dashboard")}>
//                     Back to Dashboard
//                 </Button>
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
                <Typography sx={{ textAlign: "center", color: "red", marginTop: 4 }}>
                    {error}
                </Typography>
            ) : tenant && (
                <>
                    {/* Tenant Information */}
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
                    </Paper>

                    {/* Rental Requests Section */}
                    <Typography variant="h4" sx={{ color: "#3f51b5", textAlign: "center", width: "100%", marginTop: 3 }}>
                        Rental Requests
                    </Typography>

                    {tenant.rentalRequests && tenant.rentalRequests.length > 0 ? (
                        tenant.rentalRequests.map((rentalRequest) => (
                            <Paper key={rentalRequest.id} sx={{ padding: 2, margin: 2, boxShadow: 1 }}>
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

                    {/* Viewing Requests Section */}
                    <Typography variant="h4" sx={{ color: "#3f51b5", textAlign: "center", width: "100%", marginTop: 3 }}>
                        Viewing Requests
                    </Typography>

                    {tenant.viewingRequests && tenant.viewingRequests.length > 0 ? (
                        tenant.viewingRequests.map((viewingRequest) => (
                            <Paper key={viewingRequest.id} sx={{ padding: 2, margin: 2, boxShadow: 1 }}>
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
                </>
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