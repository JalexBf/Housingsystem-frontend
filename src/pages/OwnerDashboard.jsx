import React from "react";
import { Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function OwnerDashboard() {
    const navigate = useNavigate(); // Initialize navigation

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: "100vw",
                backgroundColor: "#f5f5f5",
                margin: 0,
                padding: 0,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
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

                {/* Corrected Add Property Button with Navigation */}
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ marginBottom: 2, width: "300px" }}
                    onClick={() => navigate('/add-property')}  // Navigate to AddProperty page
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
                    onClick={() => {
                        console.log("Navigating to /manage-viewing-requests");
                        navigate('/manage-viewing-requests');
                    }}
                >
                    Manage Viewing Requests
                </Button>

            </Box>
        </Box>
    );
}
