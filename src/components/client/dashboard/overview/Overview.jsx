import React from "react";
import SummaryCards from "./SummaryCards";
import RecentOrders from "./RecentOrders";
import RecentMessages from "./RecentMessages";

const Overview = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Overview</h3>
        <p className="text-gray-600">Welcome back! Here's what's happening with your projects.</p>
      </div>
      
      <SummaryCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentOrders />
        <RecentMessages />
      </div>
    </div>
  );
};

export default Overview; 