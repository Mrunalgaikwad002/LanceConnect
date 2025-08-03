import React from "react";

const RecentOrders = () => {
  const recentOrders = [
    {
      id: "#ORD001",
      gigTitle: "Logo Design",
      freelancer: "John Designer",
      amount: "₹2,500",
      status: "In Progress",
      date: "2 days ago"
    },
    {
      id: "#ORD002",
      gigTitle: "Website Development",
      freelancer: "Sarah Developer",
      amount: "₹8,000",
      status: "Completed",
      date: "1 week ago"
    },
    {
      id: "#ORD003",
      gigTitle: "Content Writing",
      freelancer: "Mike Writer",
      amount: "₹1,500",
      status: "Delivered",
      date: "3 days ago"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Delivered":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          View All
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Order ID</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Gig</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Freelancer</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Amount</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Status</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Date</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-2 text-sm font-medium text-gray-900">{order.id}</td>
                <td className="py-3 px-2 text-sm text-gray-700">{order.gigTitle}</td>
                <td className="py-3 px-2 text-sm text-gray-700">{order.freelancer}</td>
                <td className="py-3 px-2 text-sm font-medium text-gray-900">{order.amount}</td>
                <td className="py-3 px-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-2 text-sm text-gray-500">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders; 