import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, CircularProgress, MenuItem } from "@mui/material";
import axios from "axios";

const PropertySearch = () => {
    const [area, setArea] = useState("");
    const [date, setDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");
    const [areas, setAreas] = useState([]);

    // Fetch available areas from the backend
    useEffect(() => {
        axios.get("http://localhost:8080/api/property/area")
            .then(response => {
                if (Array.isArray(response.data)) {
                    setAreas(response.data);
                } else {
                    console.error("Unexpected API response:", response.data);
                    setAreas([]); // Set an empty array to prevent errors
                }
            })
            .catch(error => {
                console.error("Error fetching areas:", error);
                setAreas([]); // Prevents 'map' from breaking
            });
    }, []);

    const handleSearch = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await axios.get("http://localhost:8080/api/properties/searchByAreaAndDate", {
                params: { area, date }
            });

            setResults(response.data);
        } catch (err) {
            setError("An error occurred while searching for properties.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 600, margin: "auto", textAlign: "center" }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Search for Properties
            </Typography>

            {/* Area Dropdown */}
            <TextField
                select
                label="Select Area"
                fullWidth
                value={area}
                onChange={(e) => setArea(e.target.value)}
                sx={{ marginBottom: 2 }}
            >
                {Array.isArray(areas) && areas.length > 0 ? (
                    areas.map((a) => (
                        <MenuItem key={a.id} value={a.name}>
                            {a.name}
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem disabled>No areas available</MenuItem>
                )}
            </TextField>

            {/* Date Picker */}
            <TextField
                type="date"
                label="Available Date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                sx={{ marginBottom: 2 }}
            />

            {/* Search Button */}
            <Button variant="contained" color="primary" onClick={handleSearch} disabled={loading}>
                {loading ? "Searching..." : "Search"}
            </Button>

            {/* Loading Spinner */}
            {loading && <CircularProgress sx={{ margin: 2 }} />}

            {/* Error Message */}
            {error && <Typography color="error">{error}</Typography>}

            {/* Results */}
            {results.length > 0 ? (
                <Box sx={{ marginTop: 3 }}>
                    <Typography variant="h6">Search Results:</Typography>
                    {results.map((property, index) => (
                        <Box key={index} sx={{ padding: 2, border: "1px solid #ddd", borderRadius: 2, marginTop: 2 }}>
                            <Typography variant="body1"><strong>{property.name}</strong></Typography>
                            <Typography variant="body2">{property.location}</Typography>
                            <Typography variant="body2">{property.price} per month</Typography>
                        </Box>
                    ))}
                </Box>
            ) : (
                !loading && (area || date) && <Typography sx={{ marginTop: 3 }}>No properties found.</Typography>
            )}
        </Box>
    );
};

export default PropertySearch;
