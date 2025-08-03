import React from "react";
import { FaShoppingCart, FaCheckCircle, FaClock, FaStar, FaMessage } from "react-icons/fa";

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: "order_placed",
      title: "Order Placed",
      description: "You placed an order for Logo Design",
      time: "2 hours ago",
      icon: FaShoppingCart,
      color: "text-blue-600"
    },
    {
      id: 2,
      type: "order_completed",
      title: "Order Completed",
      description: "Website Development project completed",
      time: "1 day ago",
      icon: FaCheckCircle,
      color: "text-green-600"
    },
    {
      id: 3,
      type: "review_given",
      title: "Review Given",
      description: "You gave a 5-star review to John Designer",
      time: "2 days ago",
      icon: FaStar,
      color: "text-yellow-600"
    },
    {
      id: 4,
      type: "message_received",
      title: "Message Received",
      description: "New message from Sarah Developer",
      time: "3 days ago",
      icon: FaMessage,
      color: "text-purple-600"
    },
    {
      id: 5,
      type: "order_in_progress",
      title: "Order In Progress",
      description: "Content Writing project started",
      time: "4 days ago",
      icon: FaClock,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
            <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0`}>
              <activity.icon className={`w-4 h-4 ${activity.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
              <p className="text-sm text-gray-600">{activity.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity; 