import React from "react";
import { FaBriefcase, FaClock, FaCheckCircle, FaRupeeSign, FaStar } from "react-icons/fa";

const SummaryCards = () => {
  const stats = [
    {
      label: "Total Gigs",
      value: "7",
      color: "purple",
      icon: FaBriefcase,
      gradient: "from-purple-50 to-purple-100",
      borderColor: "border-purple-200",
      textColor: "text-purple-700",
      valueColor: "text-purple-900",
      iconBg: "bg-purple-500"
    },
    {
      label: "Active Orders",
      value: "3",
      color: "orange",
      icon: FaClock,
      gradient: "from-orange-50 to-orange-100",
      borderColor: "border-orange-200",
      textColor: "text-orange-700",
      valueColor: "text-orange-900",
      iconBg: "bg-orange-500"
    },
    {
      label: "Completed Orders",
      value: "15",
      color: "green",
      icon: FaCheckCircle,
      gradient: "from-green-50 to-green-100",
      borderColor: "border-green-200",
      textColor: "text-green-700",
      valueColor: "text-green-900",
      iconBg: "bg-green-500"
    },
    {
      label: "Total Earnings",
      value: "₹42,500",
      color: "blue",
      icon: FaRupeeSign,
      gradient: "from-blue-50 to-blue-100",
      borderColor: "border-blue-200",
      textColor: "text-blue-700",
      valueColor: "text-blue-900",
      iconBg: "bg-blue-500"
    },
    {
      label: "Avg Rating",
      value: "4.8",
      color: "yellow",
      icon: FaStar,
      gradient: "from-yellow-50 to-yellow-100",
      borderColor: "border-yellow-200",
      textColor: "text-yellow-700",
      valueColor: "text-yellow-900",
      iconBg: "bg-yellow-500"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {stats.map((stat) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={stat.label}
            className={`bg-gradient-to-br ${stat.gradient} rounded-xl p-6 border ${stat.borderColor}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${stat.textColor}`}>{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.valueColor}`}>{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.iconBg} rounded-full flex items-center justify-center`}>
                <IconComponent className="text-white text-xl" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards; 