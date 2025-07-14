import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FreelancerDashboard from "./components/freelancer/FreelancerDashboard";
// import other pages as needed

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/freelancer/dashboard" element={<FreelancerDashboard />} />
        <Route path="/dashboard" element={<Navigate to="/freelancer/dashboard" />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;