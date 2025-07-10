import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard"; // <-- Make sure this import exists
import FreelancerDashboard from "./components/freelancer/FreelancerDashboard"; // <-- For freelancer

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* <-- Add this line */}
        <Route path="/freelancer/dashboard" element={<FreelancerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;