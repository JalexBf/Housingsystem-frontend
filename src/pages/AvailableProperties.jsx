// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import {Grid, Box, Typography, CircularProgress, Button, AppBar, Toolbar} from "@mui/material";
//
// const AvailableProperties = () => {
//     const navigate = useNavigate();
//     const [properties, setProperties] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//
//     useEffect(() => {
//         const tenantId = localStorage.getItem("userId");
//         const token = localStorage.getItem("token"); // Retrieve token
//
//         console.log("Tenant Id in available properties: ", tenantId);
//         console.log("Token in available properties: ", token); // Debugging
//
//         if (tenantId && token) {
//             axios.get("http://localhost:8080/api/properties/available", {
//                 headers: { Authorization: `Bearer ${token}` }
//             })
//                 .then(response => {
//                     console.log("Received available properties data:", response.data);
//                     setProperties(Array.isArray(response.data) ? response.data : []);
//                     setLoading(false);
//                 })
//                 .catch(error => {
//                     console.error("Status Code:", error.response.status);
//                     console.error("Error fetching available properties info:", error.response?.data || error.message);
//                     setLoading(false);
//                 });
//         } else {
//             console.error("No tenant ID or token found in localStorage");
//             setLoading(false); // Add this here
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
//         <Box sx={{ width: "100vw", height: "100vh", backgroundColor: "#f5f5f5" }}>
//             <AppBar position="static" sx={{ backgroundColor: "#3f51b5", color: "white" }}>
//                 <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//                     <Typography variant="h6">Available Properties</Typography>
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
//             ) : Array.isArray(properties) && properties.length > 0 ? (
//                 <Grid container spacing={3}>
//                     {properties.map((property) => (
//                         <Grid item xs={12} sm={6} md={4} key={property.id}>
//                             <Box sx={{
//                                 padding: 4,
//                                 border: "1px solid #ddd",
//                                 borderRadius: 2,
//                                 color: "#3f51b5",
//                                 justifyContent: "center",
//                                 boxShadow: 1
//                             }} onClick={() => navigate(`/property/${property.id}`)}>
//                                 <Typography variant="h8">{property.category}</Typography>
//                                 <Typography>Price: ${property.price}</Typography>
//                                 <Typography>Location: {property.area}</Typography>
//                                 <Typography>Address: {property.address}</Typography>
//                                 <Typography>Number of Rooms: {property.numberOfRooms}</Typography>
//                                 <Typography>Number of Bathrooms: {property.numberOfBathrooms}</Typography>
//                             </Box>
//                         </Grid>
//                     ))}
//                 </Grid>
//             ) : (
//                 <Typography sx={{ color: "#3f51b5", textAlign: "center", width: "100%", marginTop: 3}}>
//                     No available properties found.
//                 </Typography>
//             )}
//
//             <Box sx={{ position: "absolute", bottom: 16, left: 16 }}>
//                 <Button variant="contained" onClick={() => navigate("/tenant-dashboard")}>Back to Dashboard</Button>
//             </Box>
//         </Box>
//     );
// };
//
// export default AvailableProperties;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    Grid,
    Box,
    Typography,
    CircularProgress,
    Button,
    AppBar,
    Toolbar,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Slider,
} from "@mui/material";

const AvailableProperties = () => {
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filter states
    const [category, setCategory] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000);
    const [location, setLocation] = useState("");
    const [minRooms, setMinRooms] = useState(1);
    const [minBathrooms, setMinBathrooms] = useState(1);

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = () => {
        const tenantId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        if (tenantId && token) {
            axios
                .get("http://localhost:8080/api/properties/available", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    console.log("Received available properties data:", response.data);
                    setProperties(Array.isArray(response.data) ? response.data : []);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Status Code:", error.response.status);
                    console.error("Error fetching available properties info:", error.response?.data || error.message);
                    setLoading(false);
                });
        } else {
            console.error("No tenant ID or token found in localStorage");
            setLoading(false);
        }
    };

    const handleFilter = () => {
        const tenantId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        if (tenantId && token) {
            axios
                .get("http://localhost:8080/api/properties/search", {
                    headers: { Authorization: `Bearer ${token}` },
                    params: {
                        category: category || null,
                        minPrice: minPrice || null,
                        maxPrice: maxPrice || null,
                        location: location || null,
                        minRooms: minRooms || null,
                    },
                })
                .then((response) => {
                    console.log("Filtered properties:", response.data);
                    setProperties(Array.isArray(response.data) ? response.data : []);
                })
                .catch((error) => {
                    console.error("Error filtering properties:", error.response?.data || error.message);
                });
        }
    };

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
        <Box sx={{ width: "100vw", height: "100vh", backgroundColor: "#f5f5f5", display: "flex" }}>
            {/* Filter Sidebar */}
            <Box sx={{ width: "300px", padding: 2, borderRight: "1px solid #ddd", backgroundColor: "#fff" ,  color: "#3f51b5",}}>
                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                    Filters
                </Typography>

                {/* Category Filter */}
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                    <InputLabel>Category</InputLabel>
                    <Select value={category} onChange={(e) => setCategory(e.target.value)} label="Category">
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="APARTMENT">Apartment</MenuItem>
                        <MenuItem value="HOUSE">House</MenuItem>
                        <MenuItem value="VILLA">Villa</MenuItem>
                    </Select>
                </FormControl>

                {/* Price Range Filter */}
                <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                    Price Range
                </Typography>
                <Slider
                    value={[minPrice, maxPrice]}
                    onChange={(e, newValue) => {
                        setMinPrice(newValue[0]);
                        setMaxPrice(newValue[1]);
                    }}
                    valueLabelDisplay="auto"
                    min={0}
                    max={10000}
                    step={100}
                    sx={{ marginBottom: 2 }}
                />

                {/* Location Filter */}
                <TextField
                    fullWidth
                    label="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />

                {/* Minimum Rooms Filter */}
                <TextField
                    fullWidth
                    label="Minimum Rooms"
                    type="number"
                    value={minRooms}
                    onChange={(e) => setMinRooms(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />

                {/* Minimum Bathrooms Filter */}
                <TextField
                    fullWidth
                    label="Minimum Bathrooms"
                    type="number"
                    value={minBathrooms}
                    onChange={(e) => setMinBathrooms(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />

                {/* Apply Filters Button */}
                <Button variant="contained" fullWidth onClick={handleFilter}>
                    Apply Filters
                </Button>
            </Box>

            {/* Main Content */}
            <Box sx={{ flex: 1, padding: 2 }}>
                <AppBar position="static" sx={{ backgroundColor: "#3f51b5", color: "white" }}>
                    <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="h6">Available Properties</Typography>
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
                ) : Array.isArray(properties) && properties.length > 0 ? (
                    <Grid container spacing={3}>
                        {properties.map((property) => (
                            <Grid item xs={12} sm={6} md={4} key={property.id}>
                                <Box
                                    sx={{
                                        padding: 4,
                                        border: "1px solid #ddd",
                                        borderRadius: 2,
                                        color: "#3f51b5",
                                        justifyContent: "center",
                                        boxShadow: 1,
                                    }}
                                    onClick={() => navigate(`/property/${property.id}`)}
                                >
                                    <Typography variant="h8">{property.category}</Typography>
                                    <Typography>Price: ${property.price}</Typography>
                                    <Typography>Location: {property.area}</Typography>
                                    <Typography>Address: {property.address}</Typography>
                                    <Typography>Number of Rooms: {property.numberOfRooms}</Typography>
                                    <Typography>Number of Bathrooms: {property.numberOfBathrooms}</Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Typography sx={{ color: "#3f51b5", textAlign: "center", width: "100%", marginTop: 3 }}>
                        No available properties found.
                    </Typography>
                )}

                <Box sx={{ position: "absolute", bottom: 16, left: 16 }}>
                    <Button variant="contained" onClick={() => navigate("/tenant-dashboard")}>
                        Back to Dashboard
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default AvailableProperties;