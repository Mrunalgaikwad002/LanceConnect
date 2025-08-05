import React from "react";
import { FaEye, FaComments, FaCheck, FaTimes, FaStar, FaDownload } from "react-icons/fa";

const OrderList = ({ 
  orders, 
  onViewOrder, 
  onChatWithFreelancer, 
  onMarkAsCompleted, 
  onCancelOrder,
  onViewDeliverables
}) => {
  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
      in_progress: { color: "bg-blue-100 text-blue-800", label: "In Progress" },
      completed: { color: "bg-green-100 text-green-800", label: "Completed" },
      cancelled: { color: "bg-red-100 text-red-800", label: "Cancelled" }
    };

    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const avatarColors = [
    "bg-red-500",
    "bg-blue-500", 
    "bg-green-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500"
  ];

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📦</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
        <p className="text-gray-600">Try adjusting your search terms or status filter.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Freelancer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order, index) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <div className="text-sm font-medium text-gray-900">
                      {order.gigTitle}
                    </div>
                    <div className="text-sm text-gray-500">
                      Order ID: {order.id}
                    </div>
                    <div className="text-xs text-gray-400">
                      Ordered: {new Date(order.orderDate).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-400">
                      Delivery: {new Date(order.deliveryDate).toLocaleDateString()}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-white font-semibold text-xs mr-3`}>
                      {order.freelancer.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {order.freelancer.name}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <FaStar className="h-3 w-3 text-yellow-400 mr-1" />
                        {order.freelancer.rating}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(order.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ₹{order.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    {/* View Order Button */}
                    <button
                      onClick={() => onViewOrder(order.id)}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <FaEye className="h-3 w-3 mr-1" />
                      View
                    </button>

                    {/* View Deliverables Button - Only for completed orders */}
                    {order.status === "completed" && (
                      <button
                        onClick={() => onViewDeliverables(order.id)}
                        className="inline-flex items-center px-3 py-1.5 border border-green-300 shadow-sm text-xs font-medium rounded text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <FaDownload className="h-3 w-3 mr-1" />
                        {order.isRated ? 'View Work' : 'Rate & View'}
                      </button>
                    )}

                    {/* Chat Button */}
                    <button
                      onClick={() => onChatWithFreelancer(order.id, order.freelancer.name)}
                      className="inline-flex items-center px-3 py-1.5 border border-blue-300 shadow-sm text-xs font-medium rounded text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <FaComments className="h-3 w-3 mr-1" />
                      Chat
                    </button>

                    {/* Mark as Completed Button */}
                    {order.canMarkComplete && (
                      <button
                        onClick={() => onMarkAsCompleted(order.id)}
                        className="inline-flex items-center px-3 py-1.5 border border-green-300 shadow-sm text-xs font-medium rounded text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <FaCheck className="h-3 w-3 mr-1" />
                        Complete
                      </button>
                    )}

                    {/* Cancel Button */}
                    {order.canCancel && (
                      <button
                        onClick={() => onCancelOrder(order.id)}
                        className="inline-flex items-center px-3 py-1.5 border border-red-300 shadow-sm text-xs font-medium rounded text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <FaTimes className="h-3 w-3 mr-1" />
                        Cancel
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList; 