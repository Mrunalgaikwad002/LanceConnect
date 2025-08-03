import React from "react";
import { FaShoppingCart, FaCheckCircle, FaClock, FaDollarSign } from "react-icons/fa";

const SummaryCards = () => {
  const stats = [
    {
      title: "Total Orders",
      value: "12",
      change: "+2",
      changeType: "positive",
      icon: FaShoppingCart,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Completed Orders",
      value: "8",
      change: "+1",
      changeType: "positive",
      icon: FaCheckCircle,
      color: "from-green-500 to-green-600"
    },
    {
      title: "Active Orders",
      value: "3",
      change: "+1",
      changeType: "positive",
      icon: FaClock,
      color: "from-yellow-500 to-yellow-600"
    },
    {
      title: "Total Spent",
      value: "₹24,500",
      change: "+₹3,200",
      changeType: "positive",
      icon: FaDollarSign,
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`bg-gradient-to-r ${stat.color} text-white rounded-lg p-6 shadow-lg`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm font-medium">{stat.title}</p>
              <p className="text-3xl font-bold mt-1">{stat.value}</p>
              <div className="flex items-center mt-2">
                <span className="text-white/80 text-sm">
                  {stat.change} from last month
                </span>
              </div>
            </div>
            <div className="text-white/80">
              <stat.icon className="text-4xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards; 