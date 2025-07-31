import React, { useState, useMemo } from "react";
import { FaEye, FaUpload, FaCheck, FaPlay, FaTimes } from "react-icons/fa";
import OrderFilters from "./OrderFilters";
import OrderDetailsModal from "./OrderDetailsModal";

const initialOrders = [
  {
    id: "ORD00492",
    gigTitle: "Logo Design",
    clientName: "Ananya Sharma",
    clientEmail: "ananya@example.com",
    orderDate: "2024-01-15",
    deliveryDeadline: "2024-01-20",
    amount: 2500,
    status: "In Progress",
    clientInstructions: "Need a modern logo for my tech startup. Prefer blue and white colors. Should be scalable and work well on both light and dark backgrounds.",
    deliverables: [],
    timeLeft: "2d 5h"
  },
  {
    id: "ORD00491",
    gigTitle: "Website Development",
    clientName: "Harsh321",
    clientEmail: "harsh@example.com",
    orderDate: "2024-01-14",
    deliveryDeadline: "2024-01-25",
    amount: 15000,
    status: "Pending",
    clientInstructions: "E-commerce website for electronics store. Need payment integration and admin panel.",
    deliverables: [],
    timeLeft: "8d 12h"
  },
  {
    id: "ORD00490",
    gigTitle: "Content Writing",
    clientName: "Priya Patel",
    clientEmail: "priya@example.com",
    orderDate: "2024-01-13",
    deliveryDeadline: "2024-01-18",
    amount: 1800,
    status: "Delivered",
    clientInstructions: "Blog post about digital marketing trends. 1500 words with SEO optimization.",
    deliverables: ["blog_post_final.docx"],
    timeLeft: "Expired"
  },
  {
    id: "ORD00489",
    gigTitle: "SEO Audit",
    clientName: "Rahul Kumar",
    clientEmail: "rahul@example.com",
    orderDate: "2024-01-12",
    deliveryDeadline: "2024-01-17",
    amount: 3200,
    status: "Completed",
    clientInstructions: "Complete SEO audit for my restaurant website. Include keyword research and technical recommendations.",
    deliverables: ["seo_audit_report.pdf", "keyword_research.xlsx"],
    timeLeft: "Completed"
  },
  {
    id: "ORD00488",
    gigTitle: "Video Editing",
    clientName: "Sonia Singh",
    clientEmail: "sonia@example.com",
    orderDate: "2024-01-11",
    deliveryDeadline: "2024-01-16",
    amount: 4000,
    status: "Cancelled",
    clientInstructions: "Edit promotional video for my business. Add background music and transitions.",
    deliverables: [],
    timeLeft: "Cancelled"
  },
  {
    id: "ORD00487",
    gigTitle: "Social Media Management",
    clientName: "Vikram Mehta",
    clientEmail: "vikram@example.com",
    orderDate: "2024-01-10",
    deliveryDeadline: "2024-01-15",
    amount: 5000,
    status: "In Progress",
    clientInstructions: "Manage Instagram and Facebook accounts for my fitness brand. Post daily content and engage with followers.",
    deliverables: ["content_calendar.pdf"],
    timeLeft: "1d 8h"
  }
];

const statusColors = {
  "Pending": "bg-yellow-100 text-yellow-800 border-yellow-200",
  "In Progress": "bg-blue-100 text-blue-800 border-blue-200",
  "Delivered": "bg-orange-100 text-orange-800 border-orange-200",
  "Completed": "bg-green-100 text-green-800 border-green-200",
  "Cancelled": "bg-red-100 text-red-800 border-red-200",
};

const OrdersList = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    sort: "newest",
  });

  const filteredOrders = useMemo(() => {
    let result = orders.filter(order => {
      const matchesSearch = 
        order.id.toLowerCase().includes(filters.search.toLowerCase()) ||
        order.gigTitle.toLowerCase().includes(filters.search.toLowerCase()) ||
        order.clientName.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStatus = filters.status === "all" || order.status === filters.status;
      return matchesSearch && matchesStatus;
    });

    // Sorting
    switch (filters.sort) {
      case "newest":
        result = result.slice().sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
        break;
      case "oldest":
        result = result.slice().sort((a, b) => new Date(a.orderDate) - new Date(b.orderDate));
        break;
      case "highest":
        result = result.slice().sort((a, b) => b.amount - a.amount);
        break;
      case "delivery":
        result = result.slice().sort((a, b) => {
          if (a.timeLeft === "Expired" || a.timeLeft === "Completed" || a.timeLeft === "Cancelled") return 1;
          if (b.timeLeft === "Expired" || b.timeLeft === "Completed" || b.timeLeft === "Cancelled") return -1;
          return a.timeLeft.localeCompare(b.timeLeft);
        });
        break;
      default:
        break;
    }
    return result;
  }, [filters, orders]);

  const handleViewMore = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const getActionButtons = (order) => {
    switch (order.status) {
      case "Pending":
        return (
          <div className="flex gap-2">
            <button 
              className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center gap-1"
              onClick={() => handleStatusChange(order.id, "In Progress")}
            >
              <FaPlay className="text-xs" /> Start
            </button>
            <button 
              className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors duration-200 flex items-center gap-1"
              onClick={() => handleStatusChange(order.id, "Cancelled")}
            >
              <FaTimes className="text-xs" /> Cancel
            </button>
          </div>
        );
      case "In Progress":
        return (
          <div className="flex gap-2">
            <button 
              className="px-3 py-1.5 bg-orange-600 text-white rounded-lg text-sm font-semibold hover:bg-orange-700 transition-colors duration-200 flex items-center gap-1"
              onClick={() => handleStatusChange(order.id, "Delivered")}
            >
              <FaUpload className="text-xs" /> Deliver
            </button>
            <button 
              className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors duration-200 flex items-center gap-1"
              onClick={() => handleStatusChange(order.id, "Cancelled")}
            >
              <FaTimes className="text-xs" /> Cancel
            </button>
          </div>
        );
      case "Delivered":
        return (
          <button 
            className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center gap-1"
            onClick={() => handleStatusChange(order.id, "Completed")}
          >
            <FaCheck className="text-xs" /> Complete
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <OrderFilters filters={filters} onFilterChange={setFilters} />
      
      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-4 px-6 text-left text-sm font-bold text-black uppercase tracking-wider">Order ID</th>
                <th className="py-4 px-6 text-left text-sm font-bold text-black uppercase tracking-wider">Gig</th>
                <th className="py-4 px-6 text-left text-sm font-bold text-black uppercase tracking-wider">Client</th>
                <th className="py-4 px-6 text-left text-sm font-bold text-black uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-left text-sm font-bold text-black uppercase tracking-wider">Time Left</th>
                <th className="py-4 px-6 text-left text-sm font-bold text-black uppercase tracking-wider">Amount</th>
                <th className="py-4 px-6 text-left text-sm font-bold text-black uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="py-4 px-6">
                    <span className="font-semibold text-gray-900">{order.id}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-900">{order.gigTitle}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-900">{order.clientName}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColors[order.status] || "bg-gray-100 text-gray-800 border-gray-200"}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`text-sm ${order.timeLeft === "Expired" || order.timeLeft === "Completed" || order.timeLeft === "Cancelled" ? "text-gray-500" : "text-gray-900"}`}>
                      {order.timeLeft}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-blue-600">₹{order.amount.toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <button 
                        className="p-2 rounded-lg hover:bg-blue-100 transition-colors duration-200" 
                        title="View Details"
                        onClick={() => handleViewMore(order)}
                      >
                        <FaEye className="text-blue-600 text-sm" />
                      </button>
                      {getActionButtons(order)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredOrders.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            <div className="text-lg font-medium mb-2">No orders found</div>
            <div className="text-sm">Try adjusting your search or filter criteria</div>
          </div>
        )}
      </div>
      
      <OrderDetailsModal 
        order={selectedOrder} 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default OrdersList; 