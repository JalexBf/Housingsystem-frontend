import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TenantDashboard = () => {
    const navigate = useNavigate();
    const [tenant, setTenant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Get user ID from localStorage or auth context (modify based on your authentication flow)
        const tenantId = localStorage.getItem("userId");
        console.log("tenant id on dashboard: ", tenantId)
        if (tenantId) {
            axios.get(`http://localhost:8080/api/tenants/${tenantId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then(response => {
                    console.log("Received tenant data:", response.data);
                    setTenant(response.data);
                    console.log("Type of response data:", typeof response.data);
                    console.log("Is response an array?", Array.isArray(response.data));
                })
                .catch((error) => console.error("Error fetching tenant info:", error));
            console.log("tenant on dashboard: ", tenant)
        }else {
            console.error("No tenant ID found in localStorage");
        }
    }, []);

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
            {/* Header */}
            <AppBar position="static" sx={{ backgroundColor: "#3f51b5", color: "white" }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h6">Tenant Dashboard</Typography>
                    <Box>
                        <Button color="inherit" onClick={() => navigate("/tenant-dashboard")}>Home</Button>
                        <Button color="inherit" onClick={() => navigate("/profile")}>Profile</Button>
                        <Button color="inherit" onClick={() => navigate("/available")}>Properties</Button>
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "calc(100vh - 64px)",
                }}
            >
                <Typography variant="h4" sx={{ marginBottom: 4, fontWeight: "bold", color: "#3f51b5", textAlign: "center" }}>
                    {tenant ? `Welcome, ${tenant.username}!` : "Welcome!"}
                </Typography>

                {/* Tenant Options */}
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                    <Button variant="contained" sx={{ width: "300px" }} onClick={() => navigate("/search")}>
                        View Available Properties
                    </Button>
                    <Button variant="contained" sx={{ width: "300px" }} onClick={() => navigate("/manage-requests")}>
                        Manage Requests
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default TenantDashboard;

