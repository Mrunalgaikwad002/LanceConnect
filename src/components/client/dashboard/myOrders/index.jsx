import React, { useState, useMemo } from "react";
import OrderFilters from "./OrderFilters";
import OrderList from "./OrderList";
import OrderDetailsModal from "./OrderDetailsModal";
import ChatModal from "./ChatModal";
import CancelOrderModal from "./CancelOrderModal";
import SuccessModal from "./SuccessModal";

const MyOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [cancelledOrderId, setCancelledOrderId] = useState("");

  // Mock data - replace with API call
  const [allOrders, setAllOrders] = useState([
    {
      id: "ORD123456",
      gigTitle: "Professional Logo Design",
      freelancer: {
        name: "John Designer",
        avatar: "JD",
        rating: 4.9
      },
      status: "pending",
      amount: 1500,
      orderDate: "2024-01-15",
      deliveryDate: "2024-01-18",
      canCancel: true,
      canMarkComplete: false
    },
    {
      id: "ORD123457",
      gigTitle: "Website Development",
      freelancer: {
        name: "Sarah Developer",
        avatar: "SD",
        rating: 4.8
      },
      status: "in_progress",
      amount: 5000,
      orderDate: "2024-01-10",
      deliveryDate: "2024-01-17",
      canCancel: false,
      canMarkComplete: false
    },
    {
      id: "ORD123458",
      gigTitle: "Content Writing Services",
      freelancer: {
        name: "Mike Writer",
        avatar: "MW",
        rating: 4.7
      },
      status: "completed",
      amount: 800,
      orderDate: "2024-01-05",
      deliveryDate: "2024-01-07",
      canCancel: false,
      canMarkComplete: false
    },
    {
      id: "ORD123459",
      gigTitle: "UI/UX Design Package",
      freelancer: {
        name: "Emma Creative",
        avatar: "EC",
        rating: 4.8
      },
      status: "pending",
      amount: 2800,
      orderDate: "2024-01-12",
      deliveryDate: "2024-01-15",
      canCancel: true,
      canMarkComplete: false
    }
  ]);

  // Filter orders based on search term and status
  const filteredOrders = useMemo(() => {
    return allOrders.filter(order => {
      const matchesSearch = searchTerm === "" || 
        order.gigTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = selectedStatus === "all" || order.status === selectedStatus;
      
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, selectedStatus]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
  };

  const handleViewOrder = (orderId) => {
    const order = allOrders.find(o => o.id === orderId);
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  const handleChatWithFreelancer = (orderId, freelancerName) => {
    const order = allOrders.find(o => o.id === orderId);
    setSelectedOrder(order);
    setShowChatModal(true);
  };

  const handleMarkAsCompleted = (orderId) => {
    console.log("Marking order as completed:", orderId);
    // TODO: Update order status
  };

  const handleCancelOrder = (orderId) => {
    const order = allOrders.find(o => o.id === orderId);
    setSelectedOrder(order);
    setShowCancelModal(true);
  };

  const handleConfirmCancel = async (orderId, reason) => {
    console.log("Cancelling order:", orderId, "Reason:", reason);
    
    // Update the order status in the mock data
    setAllOrders(prevOrders => {
      return prevOrders.map(order => {
        if (order.id === orderId) {
          return {
            ...order,
            status: "cancelled",
            canCancel: false
          };
        }
        return order;
      });
    });
    
    // Show success modal
    setCancelledOrderId(orderId);
    setShowSuccessModal(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">My Orders</h3>
        <p className="text-gray-600">Track all your purchases and manage your orders.</p>
      </div>
      
      <OrderFilters 
        searchTerm={searchTerm}
        onSearch={handleSearch}
        selectedStatus={selectedStatus}
        onStatusFilter={handleStatusFilter}
      />
      
      <OrderList 
        orders={filteredOrders}
        onViewOrder={handleViewOrder}
        onChatWithFreelancer={handleChatWithFreelancer}
        onMarkAsCompleted={handleMarkAsCompleted}
        onCancelOrder={handleCancelOrder}
      />

      {/* Order Details Modal */}
      {showDetailsModal && selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          isOpen={showDetailsModal}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedOrder(null);
          }}
        />
      )}

      {/* Chat Modal */}
      {showChatModal && selectedOrder && (
        <ChatModal
          order={selectedOrder}
          isOpen={showChatModal}
          onClose={() => {
            setShowChatModal(false);
            setSelectedOrder(null);
          }}
        />
      )}

      {/* Cancel Order Modal */}
      {showCancelModal && selectedOrder && (
        <CancelOrderModal
          order={selectedOrder}
          isOpen={showCancelModal}
          onClose={() => {
            setShowCancelModal(false);
            setSelectedOrder(null);
          }}
          onConfirmCancel={handleConfirmCancel}
        />
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessModal
          isOpen={showSuccessModal}
          onClose={() => {
            setShowSuccessModal(false);
            setCancelledOrderId("");
          }}
          orderId={cancelledOrderId}
        />
      )}
    </div>
  );
};

export default MyOrders; 