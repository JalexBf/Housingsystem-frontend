import React from "react";
import {Button, Box, Typography, AppBar, Toolbar} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function OwnerDashboard() {
    const navigate = useNavigate();

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
        <Box sx={{ width: "100vw", height: "100vh", backgroundColor: "#f5f5f5" }}>

            <AppBar position="static" sx={{ backgroundColor: "#3f51b5", color: "white" }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h6">Tenant Dashboard</Typography>
                    <Box>
                        <Button color="inherit" onClick={() => navigate("/owner-dashboard")}>Home</Button>
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "calc(100vh - 64px)",
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    sx={{ fontWeight: "bold", color: "#3f51b5", marginBottom: 4 }}
                >
                    Owner Dashboard
                </Typography>

                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ marginBottom: 2, width: "300px" }}
                    onClick={() => navigate('/add-property')}
                >
                    Add New Property
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ marginBottom: 2, width: "300px" }}
                    onClick={() => navigate('/my-properties')}
                >
                    View My Properties
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ marginBottom: 2, width: "300px" }}
                    onClick={() => navigate('/viewing-requests')}
                >
                    Manage Property Requests
                </Button>
            </Box>
        </Box>
    );
}
