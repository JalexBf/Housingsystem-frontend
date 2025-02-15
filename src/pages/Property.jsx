// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Box, Typography, CircularProgress, Button, AppBar, Toolbar } from "@mui/material";
//
// const Property = () => {
//     const { id } = useParams(); // Get property ID from URL params
//     const navigate = useNavigate();
//     const [property, setProperty] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//
//     useEffect(() => {
//
//         const fetchPropertyDetails = async () => {
//             const token = localStorage.getItem("token"); // Retrieve token
//             if (token) {
//             try {
//                 const response = await axios.get(`http://localhost:8080/api/properties/${id}`, {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });
//                 console.log("Received property data:", response.data);
//                 if (Array.isArray(response.data) && response.data.length > 0) {
//                     console.log("Got into if.")
//                     setProperty(response.data[0]);  // Access the first object if response is an array
//                 } else {
//                     console.log("Got into else.")
//                     console.log(response.data.length)
//                     setProperty(response.data);  // If it's a single object, set it directly
//                 }
//             } catch (err) {
//                 setError("Failed to fetch property details. Please try again.");
//             } finally {
//                 setLoading(false);
//             }
//         }
//         };
//
//         fetchPropertyDetails();
//     }, [id]);
//
//     // const handleRequestViewing = async () => {
//     //     try {
//     //         await axios.post("http://localhost:8080/api/viewing-requests", {
//     //             headers: { Authorization: `Bearer ${token}` },
//     //             propertyId: id,
//     //             tenantId: localStorage.getItem("userId"),
//     //         });
//     //         alert("Viewing request sent successfully!");
//     //     } catch (error) {
//     //         alert("Failed to send viewing request.");
//     //     }
//     // };
//     //
//     // const handleRequestRental = async () => {
//     //     try {
//     //         await axios.post("http://localhost:8080/api/rental-requests", {
//     //             headers: { Authorization: `Bearer ${token}` },
//     //             propertyId: id,
//     //             tenantId: localStorage.getItem("userId"),
//     //         });
//     //         alert("Rental request sent successfully!");
//     //     } catch (error) {
//     //         alert("Failed to send rental request.");
//     //     }
//     // };
//
//     const handleRequestViewing = async () => {
//         const token = localStorage.getItem("token");
//         try {
//             await axios.post(
//                 "http://localhost:8080/api/viewing-requests",
//                 {
//                     property: { id: id },  // Property object containing ID
//                     tenant: { id: localStorage.getItem("userId") }, // Tenant object containing ID
//                     proposedTime: new Date().toISOString(), // Provide a proposed time (for testing)
//                     status: "PENDING"
//                 },
//                 {
//                     headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
//                 }
//             );
//             alert("Viewing request sent successfully!");
//         } catch (error) {
//             console.error("Error sending viewing request:", error);
//             alert("Failed to send viewing request.");
//         }
//     };
//
//     const handleRequestRental = async () => {
//         const token = localStorage.getItem("token");
//         try {
//             await axios.post(
//                 "http://localhost:8080/api/rental-requests",
//                 {
//                     property: { id: id }, // Property object containing ID
//                     tenant: { id: localStorage.getItem("userId") }, // Tenant object containing ID
//                     status: "PENDING"
//                 },
//                 {
//                     headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
//                 }
//             );
//             alert("Rental request sent successfully!");
//         } catch (error) {
//             console.error("Error sending rental request:", error);
//             alert("Failed to send rental request.");
//         }
//     };
//
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
//     return (
//         <Box sx={{ width: "100vw", height: "100vh", backgroundColor: "#f5f5f5" }}>
//             <AppBar position="static" sx={{ backgroundColor: "#3f51b5", color: "white" }}>
//                 <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//                     <Typography variant="h6">Property Details</Typography>
//                     <Box>
//                         <Button color="inherit" onClick={() => navigate("/tenant-dashboard")}>Home</Button>
//                         <Button color="inherit" onClick={() => navigate("/profile")}>Profile</Button>
//                         <Button color="inherit" onClick={() => navigate("/available")}>Properties</Button>
//                         <Button color="inherit" onClick={handleLogout}>Logout</Button>
//                     </Box>
//                 </Toolbar>
//             </AppBar>
//
//
//             {loading ? (
//                 <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
//                     <CircularProgress />
//                 </Box>
//             ) : error ? (
//                 <Typography sx={{ textAlign: "center", color: "red", marginTop: 4 }}>{error}</Typography>
//             ) : property ?(
//                 <Box sx={{
//                     padding: 4,
//                     border: "1px solid #ddd",
//                     borderRadius: 2,
//                     color: "#3f51b5",
//                     justifyContent: "center",
//                     boxShadow: 1}}>
//                     {/*<Typography>{propery.photos}</Typography>*/}
//                     <Typography variant="h4" color="primary">{property.category}</Typography>
//                     <Typography>Price: ${property.price}</Typography>
//                     <Typography>Location: {property.area}</Typography>
//                     <Typography>Address: {property.address}</Typography>
//                     <Typography>Number of Rooms: {property.numberOfRooms}</Typography>
//                     <Typography>Number of Bathrooms: {property.numberOfBathrooms}</Typography>
//                     <Typography>Number of Floors: {property.floor}</Typography>
//                     <Typography>Square Meters: {property.sqeareMeters}</Typography>
//                     <Typography>Renovation Year: {property.renovationYear}</Typography>
//
//                     <Typography variant="h4" color="primary">Amenities</Typography>
//                     <Typography>{property.amenities}</Typography>
//
//                     <Box sx={{
//                         padding: 4,
//                         border: "1px solid #ddd",
//                         borderRadius: 2,
//                         color: "#3f51b5",
//                         justifyContent: "center",
//                         boxShadow: 1}}>
//                         <Typography variant="h4" color="primary">Owner</Typography>
//                         <Typography>{property.owner.firstName} {property.owner.lastName}</Typography>
//
//                         <Typography variant="h4" color="primary">Contact info</Typography>
//                         <Typography>Phone number: {property.owner.phone}</Typography>
//                         <Typography>Email: {property.owner.email}</Typography>
//
//                     </Box>
//                     <Button variant="contained" color="primary" sx={{ marginTop: 2, marginRight: 2 }} onClick={handleRequestViewing}>
//                         Request Viewing
//                     </Button>
//                     <Button variant="contained" color="secondary" sx={{ marginTop: 2 }} onClick={handleRequestRental}>
//                         Request Rental
//                     </Button>
//
//                 </Box>
//             ): (
//                 <Typography>No property details available.</Typography>
//             )}
//             <Button variant="contained" sx={{ marginTop: 2, marginLeft: 2 }} onClick={() => navigate("/available")}>
//                 Back to Properties
//             </Button>
//             <Button variant="contained" sx={{ marginTop: 2, marginLeft: 2,  display: "flex",  justifyContent: "bottom", alignItems:"left" }} onClick={() => navigate("/tenant-dashboard")}>
//                 Back to Dashboard
//             </Button>
//         </Box>
//     );
// };
//
// export default Property;





import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Typography, CircularProgress, Button, AppBar, Toolbar, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

const Property = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [viewingOpen, setViewingOpen] = useState(false);
    const [proposedTime, setProposedTime] = useState("");
    const [requestType, setRequestType] = useState("");

    useEffect(() => {
        const fetchPropertyDetails = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await axios.get(`http://localhost:8080/api/properties/${id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setProperty(response.data);
                } catch (err) {
                    setError("Failed to fetch property details. Please try again.");
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchPropertyDetails();
    }, [id]);

    const handleConfirm = (type) => {
        setRequestType(type);
        if (type === "viewing") {
            setViewingOpen(true);
        } else {
            setConfirmOpen(true);
        }
    };

    const sendRequest = async () => {
        const token = localStorage.getItem("token");
        const endpoint = requestType === "rental" ? "rental-requests" : "viewing-requests";
        const data = {
            property: { id: id },
            tenant: { id: localStorage.getItem("userId") },
            status: "PENDING"
        };
        if (requestType === "viewing") {
            data.proposedTime = proposedTime;
        }

        try {
            await axios.post(`http://localhost:8080/api/${endpoint}`, data, {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
            });
            alert(`${requestType === "rental" ? "Rental" : "Viewing"} request sent successfully!`);
        } catch (error) {
            alert(`Failed to send ${requestType} request.`);
        } finally {
            setConfirmOpen(false);
            setViewingOpen(false);
        }
    };

    return (
        <Box sx={{ width: "100vw", height: "100vh", backgroundColor: "#f5f5f5", position: "relative" }}>
            <AppBar position="static" sx={{ backgroundColor: "#3f51b5", color: "white" }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h6">Property Details</Typography>
                    <Box>
                        <Button color="inherit" onClick={() => navigate("/tenant-dashboard")}>Home</Button>
                        <Button color="inherit" onClick={() => navigate("/profile")}>Profile</Button>
                        <Button color="inherit" onClick={() => navigate("/available")}>Properties</Button>
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
                    <Typography>Square Meters: {property.sqeareMeters}</Typography>
                    <Typography>Renovation Year: {property.renovationYear}</Typography>

                    <Typography variant="h4" color="primary">Amenities</Typography>
                    <Typography>{property.amenities}</Typography>

                    <Box sx={{
                        padding: 4,
                        border: "1px solid #ddd",
                        borderRadius: 2,
                        color: "#3f51b5",
                        justifyContent: "center",
                        boxShadow: 1}}>
                        <Typography variant="h4" color="primary">Availability Slots</Typography>
                        <Typography>This property is available for viewings at the between the following times:</Typography>
                        <Typography>{property.availabilitySlots.startTime}  -  {property.availabilitySlots.endTime}</Typography>
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

                    <Button variant="contained" color="primary" sx={{ mt: 2, mr: 2 }} onClick={() => handleConfirm("viewing")}>Request Viewing</Button>
                    <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={() => handleConfirm("rental")}>Request Rental</Button>
                </Box>
            ) : (
                <Typography>No property details available.</Typography>
            )}

            {/* Confirm Rental Dialog */}
            <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
                <DialogTitle>Confirm Request</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to send a {requestType} request?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
                    <Button onClick={sendRequest} color="primary">Confirm</Button>
                </DialogActions>
            </Dialog>

            {/* Viewing Request Dialog */}
            <Dialog open={viewingOpen} onClose={() => setViewingOpen(false)}>
                <DialogTitle>Propose a Viewing Time</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        type="datetime-local"
                        value={proposedTime}
                        onChange={(e) => setProposedTime(e.target.value)}
                        sx={{ mt: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setViewingOpen(false)}>Cancel</Button>
                    <Button onClick={() => setConfirmOpen(true)} color="primary">Next</Button>
                </DialogActions>
            </Dialog>

            <Box sx={{ position: "absolute", bottom: 16, left: 16 }}>
                <Button variant="contained" sx={{ mr: 2 }} onClick={() => navigate("/available")}>Back to Properties</Button>
                <Button variant="contained" onClick={() => navigate("/tenant-dashboard")}>Back to Dashboard</Button>
            </Box>
        </Box>
    );
};

export default Property;





// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
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
//     MenuItem
// } from "@mui/material";
//
// const Property = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [property, setProperty] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
//     const [viewingDialogOpen, setViewingDialogOpen] = useState(false);
//     const [selectedTime, setSelectedTime] = useState("");
//     const [availabilitySlots, setAvailabilitySlots] = useState([]);
//     const [requestType, setRequestType] = useState("");
//
//     useEffect(() => {
//         const fetchPropertyDetails = async () => {
//             const token = localStorage.getItem("token");
//             if (token) {
//                 try {
//                     const response = await axios.get(`http://localhost:8080/api/properties/${id}`, {
//                         headers: { Authorization: `Bearer ${token}` }
//                     });
//                     const propertyData = Array.isArray(response.data) && response.data.length > 0 ? response.data[0] : response.data;
//                     setProperty(propertyData);
//                     setAvailabilitySlots(propertyData.availabilitySlots || []);
//                 } catch (err) {
//                     setError("Failed to fetch property details. Please try again.");
//                 } finally {
//                     setLoading(false);
//                 }
//             }
//         };
//         fetchPropertyDetails();
//     }, [id]);
//
//     const handleRequest = async () => {
//         const token = localStorage.getItem("token");
//         const requestData = {
//             property: { id: id },
//             tenant: { id: localStorage.getItem("userId") },
//             status: "PENDING"
//         };
//
//         if (requestType === "viewing") {
//             requestData.proposedTime = selectedTime;
//         }
//
//         try {
//             await axios.post(
//                 `http://localhost:8080/api/${requestType}-requests`,
//                 requestData,
//                 { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
//             );
//             alert(`${requestType.charAt(0).toUpperCase() + requestType.slice(1)} request sent successfully!`);
//         } catch (error) {
//             console.error(`Error sending ${requestType} request:`, error);
//             alert(`Failed to send ${requestType} request.`);
//         }
//         setConfirmDialogOpen(false);
//         setViewingDialogOpen(false);
//     };
//
//     return (
//         <Box sx={{ width: "100vw", height: "100vh", backgroundColor: "#f5f5f5" }}>
//             <AppBar position="static" sx={{ backgroundColor: "#3f51b5", color: "white" }}>
//                 <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//                     <Typography variant="h6">Property Details</Typography>
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
//             ) : property ? (
//                 <Box sx={{ padding: 4, border: "1px solid #ddd", borderRadius: 2, boxShadow: 1 }}>
//                     <Typography variant="h4" color="primary">{property.category}</Typography>
//                     <Typography>Price: ${property.price}</Typography>
//                     <Typography>Location: {property.area}</Typography>
//                     <Typography>Number of Rooms: {property.numberOfRooms}</Typography>
//                     <Typography>Square Meters: {property.sqeareMeters}</Typography>
//
//                     <Typography variant="h5" color="primary">Owner</Typography>
//                     <Typography>{property.owner.firstName} {property.owner.lastName}</Typography>
//
//                     <Button variant="contained" color="primary" sx={{ marginTop: 2, marginRight: 2 }} onClick={() => {
//                         setRequestType("viewing");
//                         setViewingDialogOpen(true);
//                     }}>
//                         Request Viewing
//                     </Button>
//                     <Button variant="contained" color="secondary" sx={{ marginTop: 2 }} onClick={() => {
//                         setRequestType("rental");
//                         setConfirmDialogOpen(true);
//                     }}>
//                         Request Rental
//                     </Button>
//                 </Box>
//             ) : (
//                 <Typography>No property details available.</Typography>
//             )}
//
//             <Box sx={{ position: "fixed", bottom: 20, left: 20 }}>
//                 <Button variant="contained" onClick={() => navigate("/available")} sx={{ marginRight: 2 }}>
//                     Back to Properties
//                 </Button>
//                 <Button variant="contained" onClick={() => navigate("/tenant-dashboard")}>
//                     Back to Dashboard
//                 </Button>
//             </Box>
//
//             <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
//                 <DialogTitle>Confirm Request</DialogTitle>
//                 <DialogContent>
//                     <Typography>Are you sure you want to make this {requestType} request?</Typography>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
//                     <Button onClick={handleRequest} color="primary">Confirm</Button>
//                 </DialogActions>
//             </Dialog>
//
//             <Dialog open={viewingDialogOpen} onClose={() => setViewingDialogOpen(false)}>
//                 <DialogTitle>Select a Viewing Time</DialogTitle>
//                 <DialogContent>
//                     <Select fullWidth value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
//                         {availabilitySlots.map(slot => (
//                             <MenuItem key={slot.id} value={slot.startTime}>{new Date(slot.startTime).toLocaleString()}</MenuItem>
//                         ))}
//                     </Select>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setViewingDialogOpen(false)}>Cancel</Button>
//                     <Button onClick={() => setConfirmDialogOpen(true)} color="primary">Next</Button>
//                 </DialogActions>
//             </Dialog>
//         </Box>
//     );
// };
//
// export default Property;
