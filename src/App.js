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
    console.log('No token or user found, redirecting to login');
    return <Navigate to="/login" replace />;
  }
  
  // Parse user data to check role
  let userData;
  try {
    userData = JSON.parse(user);
  } catch (error) {
    console.error('Error parsing user data:', error);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }
  
  console.log('ProtectedRoute - User data:', userData);
  console.log('ProtectedRoute - Current path:', window.location.pathname);
  console.log('ProtectedRoute - User role:', userData.role);
  console.log('ProtectedRoute - Role type:', typeof userData.role);
  console.log('ProtectedRoute - Role comparison (client):', userData.role === "client");
  console.log('ProtectedRoute - Role comparison (freelancer):', userData.role === "freelancer");
  
  // Check if user is trying to access the correct dashboard
  const currentPath = window.location.pathname;
  if (currentPath.includes("/client/dashboard") && userData.role !== "client") {
    console.log('Redirecting client to freelancer dashboard because role is:', userData.role);
    return <Navigate to="/freelancer/dashboard" replace />;
  }
  if (currentPath.includes("/freelancer/dashboard") && userData.role !== "freelancer") {
    console.log('Redirecting freelancer to client dashboard because role is:', userData.role);
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