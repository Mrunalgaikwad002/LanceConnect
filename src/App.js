import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FreelancerDashboard from "./components/freelancer/FreelancerDashboard";
import ClientDashboard from "./components/client/ClientDashboard";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancelled from "./pages/PaymentCancelled";
// import other pages as needed

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }
  
  // Parse user data to check role
  const userData = JSON.parse(user);
  
  // Check if user is trying to access the correct dashboard
  const currentPath = window.location.pathname;
  if (currentPath.includes("/client/dashboard") && userData.role !== "client") {
    return <Navigate to="/freelancer/dashboard" replace />;
  }
  if (currentPath.includes("/freelancer/dashboard") && userData.role !== "freelancer") {
    return <Navigate to="/client/dashboard" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/freelancer/dashboard" 
          element={
            <ProtectedRoute>
              <FreelancerDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/client/dashboard" 
          element={
            <ProtectedRoute>
              <ClientDashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-cancelled" element={<PaymentCancelled />} />
        <Route path="/dashboard" element={<Navigate to="/login" />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;