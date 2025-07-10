import React from "react";
import GigList from "./gigs/GigList";

const FreelancerDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="w-full max-w-2xl p-8 bg-white rounded-2xl shadow-2xl text-center">
          <h2 className="text-3xl font-bold text-indigo-700 mb-6">Freelancer Dashboard</h2>
          {user && user.role === "freelancer" ? (
            <div>
              <p className="text-xl text-gray-700 mb-2">Welcome, <span className="font-semibold">{user.name}</span>!</p>
              <p className="text-gray-500">Role: {user.role}</p>
            </div>
          ) : (
            <p className="text-red-500">You are not logged in as a freelancer.</p>
          )}
        </div>
      </div>
      <GigList />
    </div>
  );
};

export default FreelancerDashboard; 