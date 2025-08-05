import React, { useState, useMemo } from "react";
import OrderFilters from "./OrderFilters";
import OrderList from "./OrderList";
import OrderDetailsModal from "./OrderDetailsModal";
import ChatModal from "./ChatModal";
import CancelOrderModal from "./CancelOrderModal";
import SuccessModal from "./SuccessModal";
import DeliverablesModal from "./DeliverablesModal";

const MyOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDeliverablesModal, setShowDeliverablesModal] = useState(false);
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
       canMarkComplete: false,
       isRated: false,
       deliverables: [
         {
           name: "content_article.pdf",
           type: "application/pdf",
           size: 245760,
           url: "#"
         },
         {
           name: "research_notes.docx",
           type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
           size: 51200,
           url: "#"
         }
       ],
       deliveryMessage: "Hi! I've completed your content writing project. The article is well-researched and optimized for SEO. I've also included my research notes for your reference. Please let me know if you need any revisions!"
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
        order.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.freelancer.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = selectedStatus === "all" || order.status === selectedStatus;
      
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, selectedStatus, allOrders]);

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

  const handleViewDeliverables = (orderId) => {
    const order = allOrders.find(o => o.id === orderId);
    setSelectedOrder(order);
    setShowDeliverablesModal(true);
  };

  const handleRateFreelancer = (orderId, reviewData) => {
    console.log("Rating freelancer for order:", orderId, reviewData);
    
    // Update the order with rating and review
    setAllOrders(prevOrders => {
      return prevOrders.map(order => {
        if (order.id === orderId) {
          return {
            ...order,
            isRated: true,
            review: {
              rating: reviewData.rating,
              comment: reviewData.review
            }
          };
        }
        return order;
      });
    });
    
    // Close the deliverables modal after rating
    setShowDeliverablesModal(false);
    setSelectedOrder(null);
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
         onViewDeliverables={handleViewDeliverables}
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

       {/* Deliverables Modal */}
       {showDeliverablesModal && selectedOrder && (
         <DeliverablesModal
           order={selectedOrder}
           isOpen={showDeliverablesModal}
           onClose={() => {
             setShowDeliverablesModal(false);
             setSelectedOrder(null);
           }}
           onRateFreelancer={handleRateFreelancer}
         />
       )}
    </div>
  );
};

export default MyOrders; 