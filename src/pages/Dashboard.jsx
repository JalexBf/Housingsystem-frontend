import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const data = await fetchProperties();
        setProperties(data);
      } catch (err) {
        console.error('Failed to load properties:', err);
      }
    };

    loadProperties();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {properties.map((property) => (
          <li key={property.id}>{property.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
