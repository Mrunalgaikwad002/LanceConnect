import React from "react";
import { FaStar, FaWallet, FaClipboardList, FaCheckCircle, FaTasks } from "react-icons/fa";

const stats = [
  { label: "Total Gigs", value: "--", icon: <FaTasks className="text-steelblue text-2xl" />, color: "bg-white" },
  { label: "Active Orders", value: "--", icon: <FaClipboardList className="text-darkblue text-2xl" />, color: "bg-white" },
  { label: "Completed Orders", value: "--", icon: <FaCheckCircle className="text-green-500 text-2xl" />, color: "bg-white" },
  { label: "Total Earnings", value: "₹--", icon: <FaWallet className="text-orange-500 text-2xl" />, color: "bg-white" },
  { label: "Avg Rating", value: "--", icon: <FaStar className="text-yellow-400 text-2xl" />, color: "bg-white" },
];

const SummaryCards = () => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    {stats.slice(0, 3).map((stat) => (
      <div key={stat.label} className={`rounded-xl shadow-lg p-6 flex flex-col items-center ${stat.color} border-b-4 border-steelblue`}>
        <div className="mb-2">{stat.icon}</div>
        <div className="text-3xl font-bold mb-1 text-darkblue">{stat.value}</div>
        <div className="text-sm text-steelblue font-semibold uppercase tracking-wide">{stat.label}</div>
      </div>
    ))}
    <div className="col-span-1 sm:col-span-2 flex gap-4 mt-4 sm:mt-0">
      {stats.slice(3).map((stat) => (
        <div key={stat.label} className={`flex-1 rounded-xl shadow-lg p-6 flex flex-col items-center ${stat.color} border-b-4 border-steelblue`}>
          <div className="mb-2">{stat.icon}</div>
          <div className="text-3xl font-bold mb-1 text-darkblue">{stat.value}</div>
          <div className="text-sm text-steelblue font-semibold uppercase tracking-wide">{stat.label}</div>
        </div>
      ))}
    </div>
  </div>
);

export default SummaryCards; 