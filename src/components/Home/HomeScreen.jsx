import React, { useState, useEffect } from "react";
import API from "../../services/api";
import PropertyCard from "./PropertyCard";

const HomeScreen = () => {
    const [properties, setProperties] = useState([]);
    const [ownerId, setOwnerId] = useState(null);

    useEffect(() => {
        // Fetch owner ID from JWT or state
        const token = localStorage.getItem("token");
        if (token) {
            const parsedToken = JSON.parse(atob(token.split(".")[1]));
            setOwnerId(parsedToken.id); // Assumes the JWT contains the ownerId
        }
        if (ownerId) fetchProperties();
    }, [ownerId]);

    const fetchProperties = async () => {
        try {
            const response = await API.get(`/api/properties/owner/${ownerId}`);
            setProperties(response.data);
        } catch (err) {
            console.error("Failed to fetch properties", err);
        }
    };

    const deleteProperty = async (propertyId) => {
        try {
            await API.delete(`/api/properties/${propertyId}`);
            setProperties((prev) => prev.filter((p) => p.id !== propertyId));
        } catch (err) {
            console.error("Failed to delete property", err);
        }
    };

    return (
        <div>
            <h1>Home Screen</h1>
            <div>
                {properties.map((property) => (
                    <PropertyCard
                        key={property.id}
                        property={property}
                        onDelete={deleteProperty}
                    />
                ))}
            </div>
        </div>
    );
};

export default HomeScreen;
