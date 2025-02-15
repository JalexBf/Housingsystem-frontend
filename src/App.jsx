import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Property from './pages/Property.jsx';
import Signup from './pages/Signup';
import TenantDashboard from './pages/TenantDashboard';
import OwnerDashboard from './pages/OwnerDashboard';
import AvailableProperties from "./pages/AvailableProperties"; // Import the page
import TenantProfile from './pages/TenantProfile';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/property/:id" element={<Property />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/available" element={<AvailableProperties />} />
                <Route path="/tenant-dashboard" element={<TenantDashboard />} />
                <Route path="/owner-dashboard" element={<OwnerDashboard />} />
                <Route path="/profile" element={<TenantProfile />} />
            </Routes>
        </Router>
    );
}

export default App;


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Dashboard from './pages/Dashboard';
// import Property from './pages/Property';
// import Signup from './pages/Signup';
// import TenantDashboard from './pages/TenantDashboard';
// import OwnerDashboard from './pages/OwnerDashboard';
//
// function App() {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/dashboard" element={<Dashboard />} />
//                 <Route path="/properties" element={<Property />} />
//                 <Route path="/signup" element={<Signup />} />
//                 <Route path="/tenant-dashboard" element={<TenantDashboard />} />
//                 <Route path="/owner-dashboard" element={<OwnerDashboard />} />
//             </Routes>
//         </Router>
//     );
// }
//
// export default App;
