import React, { useState } from "react";
import { TextField, MenuItem, Button, Box } from "@mui/material";

const SearchBar = ({ onSearch }) => {
    const [filters, setFilters] = useState({
        area: "",
        category: "",
        minPrice: "",
        maxPrice: "",
        minRooms: "",
        maxRooms: "",
        minSquareMeters: "",
        maxSquareMeters: "",
    });

    const categories = ["Apartment", "Room", "Studio", "House"];

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleSearch = () => {
        onSearch(filters);
    };

    return (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
            <TextField name="area" label="Area" value={filters.area} onChange={handleChange} />
            <TextField name="category" select label="Category" value={filters.category} onChange={handleChange}>
                <MenuItem value="">All</MenuItem>
                {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
            </TextField>
            <TextField name="minPrice" label="Min Price (€)" type="number" value={filters.minPrice} onChange={handleChange} />
            <TextField name="maxPrice" label="Max Price (€)" type="number" value={filters.maxPrice} onChange={handleChange} />
            <TextField name="minRooms" label="Min Rooms" type="number" value={filters.minRooms} onChange={handleChange} />
            <TextField name="maxRooms" label="Max Rooms" type="number" value={filters.maxRooms} onChange={handleChange} />
            <TextField name="minSquareMeters" label="Min Size (m²)" type="number" value={filters.minSquareMeters} onChange={handleChange} />
            <TextField name="maxSquareMeters" label="Max Size (m²)" type="number" value={filters.maxSquareMeters} onChange={handleChange} />

            <Button variant="contained" onClick={handleSearch}>Search</Button>
        </Box>
    );
};

export default SearchBar;
