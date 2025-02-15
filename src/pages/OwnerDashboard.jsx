import React from "react";
import { Button, Box, Typography } from "@mui/material";

export default function OwnerDashboard() {
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
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ marginBottom: 2, width: "300px" }}
                >
                    View My Properties
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ marginBottom: 2, width: "300px" }}
                >
                    Add New Property
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ marginBottom: 2, width: "300px" }}
                >
                    Manage Property Requests
                </Button>
            </Box>
        </Box>
    );
}
