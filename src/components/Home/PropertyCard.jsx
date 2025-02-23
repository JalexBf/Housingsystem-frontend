import React from "react";

const PropertyCard = ({ property, onDelete }) => {
    return (
        <div className="property-card">
            <h3>{property.name}</h3>
            <p>{property.location}</p>
            <button onClick={() => onDelete(property.id)}>Delete</button>
        </div>
    );
};

export default PropertyCard;
