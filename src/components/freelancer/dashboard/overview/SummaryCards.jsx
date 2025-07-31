import React from "react";

const stats = [
  { label: "Total Gigs", value: 7, color: "text-purple-600" },
  { label: "Active Orders", value: 3, color: "text-orange-500" },
  { label: "Completed Orders", value: 15, color: "text-green-600" },
  { label: "Total Earnings", value: "₹42,500", color: "text-blue-600" },
  { label: "Avg Rating", value: "4.8", color: "text-yellow-500" },
];

const SummaryCards = () => (
  <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
    {stats.map((stat) => (
      <div
        key={stat.label}
        className="bg-white rounded-xl shadow-md p-6 flex flex-col items-start min-w-[120px]"
      >
        <div className="text-sm text-gray-500 mb-2">{stat.label}</div>
        <div className={`text-3xl font-extrabold ${stat.color}`}>{stat.value}</div>
      </div>
    ))}
  </div>
);

export default SummaryCards; 