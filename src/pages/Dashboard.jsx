import React from "react";

const Dashboard = () => {
  // Get user info from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl text-center">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6">Welcome to your Dashboard</h2>
        {user ? (
          <div>
            <p className="text-xl text-gray-700 mb-2">Hello, <span className="font-semibold">{user.name}</span>!</p>
            <p className="text-gray-500">Role: {user.role}</p>
          </div>
        ) : (
          <p className="text-red-500">No user info found. Please log in.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 