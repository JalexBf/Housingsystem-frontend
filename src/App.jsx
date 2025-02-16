import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MyProperties from "./pages/MyProperties";
import PropertyDetails from "./pages/PropertyDetails";
import Signup from './pages/Signup';
import TenantDashboard from './pages/TenantDashboard';
import OwnerDashboard from './pages/OwnerDashboard';
import AddProperty from "./pages/AddProperty.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add-property" element={<AddProperty />} />
                <Route path="/my-properties" element={<MyProperties />} />
                <Route path="/property/:id" element={<PropertyDetails />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/tenant-dashboard" element={<TenantDashboard />} />
                <Route path="/owner-dashboard" element={<OwnerDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
