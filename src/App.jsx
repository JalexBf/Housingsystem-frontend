import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TenantDashboard from './pages/TenantDashboard';
import OwnerDashboard from './pages/OwnerDashboard';
import ProtectedRoute from './routes/ProtectedRoute';
import Unauthorized from './pages/Unauthorized';
import AddProperty from './pages/AddProperty';
import MyProperties from "./pages/MyProperties";
import PropertyDetails from "./pages/PropertyDetails";
import PropertySearch from "./pages/PropertySearch";
import Dashboard from './pages/Dashboard';
import Property from './pages/Property.jsx';
import AvailableProperties from "./pages/AvailableProperties";
import ManageViewingRequests from "./pages/ManageViewingRequests";



function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/search" element={<PropertySearch />} />
                <Route path="/property/:id" element={<PropertyDetails />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/available" element={<AvailableProperties />} />
                <Route path="/property/:id" element={<Property />} />

                <Route element={<ProtectedRoute allowedRoles={['ROLE_TENANT']} />}>
                    <Route path="/tenant-dashboard" element={<TenantDashboard />} />
                </Route>

                <Route element={<ProtectedRoute allowedRoles={['ROLE_OWNER']} />}>
                    <Route path="/owner-dashboard" element={<OwnerDashboard />} />
                    <Route path="/add-property" element={<AddProperty />} />
                    <Route path="/my-properties" element={<MyProperties />} />
                    <Route path="/manage-viewing-requests" element={<ManageViewingRequests />} />
                </Route>

                <Route path="/unauthorized" element={<Unauthorized />} />

            </Routes>
        </Router>
    );
}

export default App;
