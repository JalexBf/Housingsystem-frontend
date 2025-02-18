import React, { useState } from "react";
import { Box, Typography, TextField, Select, MenuItem, FormControl, InputLabel, Slider, Button } from "@mui/material";

const PropertyFilters = ({ onFilter }) => {
    const [category, setCategory] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000);
    const [location, setLocation] = useState("");
    const [minRooms, setMinRooms] = useState(1);
    const [minBathrooms, setMinBathrooms] = useState(1);

    const handleFilter = () => {
        const filterData = {
            category: category || null,
            minPrice: minPrice || null,
            maxPrice: maxPrice || null,
            location: location || null,
            minRooms: minRooms || null,
            minBathrooms: minBathrooms || null,
        };

        console.log("Applying filters:", filterData); // Debugging

        onFilter(filterData);
    };



    return (
        <Box sx={{ width: "300px", padding: 2, borderRight: "1px solid #ddd", backgroundColor: "#fff" }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>Filters</Typography>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel>Category</InputLabel>
                <Select value={category} onChange={(e) => setCategory(e.target.value)} label="Category">
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="APARTMENT">Apartment</MenuItem>
                    <MenuItem value="HOUSE">House</MenuItem>
                    <MenuItem value="VILLA">Villa</MenuItem>
                </Select>
            </FormControl>

            <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>Price Range</Typography>
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

            <TextField fullWidth label="Location" value={location} onChange={(e) => setLocation(e.target.value)} sx={{ marginBottom: 2 }} />
            <TextField fullWidth label="Minimum Rooms" type="number" value={minRooms} onChange={(e) => setMinRooms(e.target.value)} sx={{ marginBottom: 2 }} />
            <TextField fullWidth label="Minimum Bathrooms" type="number" value={minBathrooms} onChange={(e) => setMinBathrooms(e.target.value)} sx={{ marginBottom: 2 }} />

            <Button variant="contained" fullWidth onClick={handleFilter}>Apply Filters</Button>
        </Box>
    );
};

export default PropertyFilters;
