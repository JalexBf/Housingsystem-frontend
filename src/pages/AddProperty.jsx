import React, { useState } from 'react';
import {
    TextField,
    Button,
    Box,
    Typography,
    Paper,
    FormControl,
    Select,
    MenuItem,
    InputLabel, AppBar, Toolbar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DAYS_OF_WEEK = [
    { label: "Monday", value: "MONDAY" },
    { label: "Tuesday", value: "TUESDAY" },
    { label: "Wednesday", value: "WEDNESDAY" },
    { label: "Thursday", value: "THURSDAY" },
    { label: "Friday", value: "FRIDAY" },
    { label: "Saturday", value: "SATURDAY" },
    { label: "Sunday", value: "SUNDAY" }
];

const HOURS = Array.from({ length: 17 }, (_, i) => 6 + i); // 6:00 AM to 10:00 PM

const AddProperty = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        category: 'APARTMENT',
        area: '',
        address: '',
        atak: '',
        price: '',
        squareMeters: '',
        floor: 0,
        numberOfRooms: 1,
        numberOfBathrooms: 1,
        renovationYear: '',
        amenities: [],
        photos: [],
        availabilitySlots: [],
    });

    const [day, setDay] = useState('');
    const [startHour, setStartHour] = useState('');
    const [endHour, setEndHour] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData(prevData => ({
            ...prevData,
            photos: [...prevData.photos, ...Array.from(e.target.files)]
        }));
    };

    const addAvailabilitySlot = () => {
        if (!day || startHour === '' || endHour === '' || startHour >= endHour) {
            alert("Invalid slot selection.");
            return;
        }

        setFormData(prevData => ({
            ...prevData,
            availabilitySlots: [
                ...prevData.availabilitySlots,
                { dayOfWeek: day, startHour, endHour }
            ]
        }));

        setDay('');
        setStartHour('');
        setEndHour('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.availabilitySlots.length === 0) {
            alert("You must add at least one availability slot.");
            return;
        }

        try {
            const token = localStorage.getItem('token');

            const formDataToSend = new FormData();

            // Append property data as JSON string
            formDataToSend.append(
                "property",
                new Blob([JSON.stringify({
                    category: formData.category,
                    area: formData.area,
                    address: formData.address,
                    atak: formData.atak,
                    price: parseFloat(formData.price),
                    squareMeters: parseInt(formData.squareMeters),
                    floor: parseInt(formData.floor),
                    numberOfRooms: parseInt(formData.numberOfRooms),
                    numberOfBathrooms: parseInt(formData.numberOfBathrooms),
                    renovationYear: parseInt(formData.renovationYear),
                    amenities: formData.amenities,
                    availabilitySlots: formData.availabilitySlots.map(slot => ({
                        dayOfWeek: slot.dayOfWeek,
                        startHour: parseInt(slot.startHour),
                        endHour: parseInt(slot.endHour),
                    }))
                })], { type: "application/json" })
            );

            // Append each selected file
            for (const file of formData.photos) {
                formDataToSend.append("files", file);
            }

            // Send property data and photos in one request
            await axios.post(
                "http://localhost:8080/api/properties",
                formDataToSend,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            navigate("/owner-dashboard");
        } catch (err) {
            alert("Submission failed.");
        }
    };


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
        <Box sx={{  minHeight: "100vh", width: "100vw", display: "flex", flexDirection: "column", backgroundColor: "#f5f5f5", overflow: "auto" }}>

            <AppBar position="static" sx={{ backgroundColor: "#3f51b5", color: "white" }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h6">Add a Property</Typography>
                    <Box>
                        <Button color="inherit" onClick={() => navigate("/owner-dashboard")}>Home</Button>
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 600, alignSelf: "center" }}>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>Add New Property</Typography>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <InputLabel>Category</InputLabel>
                        <Select name="category" value={formData.category} onChange={handleChange}>
                            <MenuItem value="APARTMENT">Apartment</MenuItem>
                            <MenuItem value="HOUSE">House</MenuItem>
                            <MenuItem value="ROOM">Room</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField fullWidth label="Area" name="area" value={formData.area} onChange={handleChange} required sx={{ marginBottom: 2 }} />
                    <TextField fullWidth label="Address" name="address" value={formData.address} onChange={handleChange} required sx={{ marginBottom: 2 }} />
                    <TextField fullWidth label="ATAK" name="atak" value={formData.atak} onChange={handleChange} required sx={{ marginBottom: 2 }} />
                    <TextField fullWidth type="number" label="Price" name="price" value={formData.price} onChange={handleChange} required sx={{ marginBottom: 2 }} />
                    <TextField fullWidth type="number" label="Square Meters" name="squareMeters" value={formData.squareMeters} onChange={handleChange} required sx={{ marginBottom: 2 }} />
                    <TextField fullWidth type="number" label="Floor" name="floor" value={formData.floor} onChange={handleChange} required sx={{ marginBottom: 2 }} />
                    <TextField fullWidth type="number" label="Number of Rooms" name="numberOfRooms" value={formData.numberOfRooms} onChange={handleChange} required sx={{ marginBottom: 2 }} />
                    <TextField fullWidth type="number" label="Number of Bathrooms" name="numberOfBathrooms" value={formData.numberOfBathrooms} onChange={handleChange} required sx={{ marginBottom: 2 }} />
                    <TextField fullWidth type="number" label="Renovation Year" name="renovationYear" value={formData.renovationYear} onChange={handleChange} required sx={{ marginBottom: 2 }} />
                    <Typography variant="h6" sx={{ marginTop: 2 }}>Upload Photos</Typography>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ marginBottom: 16 }}
                    />
                    {/* Preview selected images before submission */}
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', marginTop: 2 }}>
                        {formData.photos.map((photo, index) => (
                            <img
                                key={index}
                                src={URL.createObjectURL(photo)}
                                alt={`preview-${index}`}
                                width="100"
                            />
                        ))}
                    </Box>
                    <Typography variant="h6" sx={{ marginTop: 2 }}>Availability Slots</Typography>

                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <InputLabel>Day</InputLabel>
                        <Select value={day} onChange={(e) => setDay(e.target.value)}>
                            {DAYS_OF_WEEK.map(d => (
                                <MenuItem key={d.value} value={d.value}>{d.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <InputLabel>Start Hour</InputLabel>
                        <Select value={startHour} onChange={(e) => setStartHour(e.target.value)}>
                            {HOURS.map(h => (
                                <MenuItem key={h} value={h}>{h}:00</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <InputLabel>End Hour</InputLabel>
                        <Select value={endHour} onChange={(e) => setEndHour(e.target.value)}>
                            {HOURS.map(h => (
                                <MenuItem key={h} value={h}>{h}:00</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Button variant="outlined" onClick={addAvailabilitySlot} sx={{ marginBottom: 2 }}>
                        Add Time Slot
                    </Button>

                    <Button type="submit" fullWidth variant="contained">
                        Submit
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default AddProperty;
