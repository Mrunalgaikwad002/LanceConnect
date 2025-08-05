import React, { useState, useMemo } from "react";
import PaymentOverview from "./PaymentOverview";
import PaymentHistory from "./PaymentHistory";
import PaymentMethods from "./PaymentMethods";
import AddPaymentMethodModal from "./AddPaymentMethodModal";

const Payments = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);

  // Mock data - replace with API call
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: "pm_1",
      type: "card",
      brand: "visa",
      last4: "4242",
      expiryMonth: "12",
      expiryYear: "2025",
      isDefault: true,
      name: "John Doe"
    },
    {
      id: "pm_2", 
      type: "card",
      brand: "mastercard",
      last4: "5555",
      expiryMonth: "08",
      expiryYear: "2026",
      isDefault: false,
      name: "John Doe"
    }
  ]);

  const [paymentHistory, setPaymentHistory] = useState([
    {
      id: "pay_1",
      orderId: "ORD123456",
      gigTitle: "Professional Logo Design",
      freelancer: "John Designer",
      amount: 1500,
      status: "completed",
      date: new Date(Date.now() - 86400000), // 1 day ago
      paymentMethod: "visa ending in 4242",
      invoiceUrl: "#"
    },
    {
      id: "pay_2",
      orderId: "ORD123457", 
      gigTitle: "Website Development",
      freelancer: "Sarah Developer",
      amount: 5000,
      status: "completed",
      date: new Date(Date.now() - 172800000), // 2 days ago
      paymentMethod: "mastercard ending in 5555",
      invoiceUrl: "#"
    },
    {
      id: "pay_3",
      orderId: "ORD123458",
      gigTitle: "Content Writing Services", 
      freelancer: "Mike Writer",
      amount: 800,
      status: "pending",
      date: new Date(Date.now() - 259200000), // 3 days ago
      paymentMethod: "visa ending in 4242",
      invoiceUrl: "#"
    },
    {
      id: "pay_4",
      orderId: "ORD123459",
      gigTitle: "UI/UX Design Package",
      freelancer: "Emma Creative", 
      amount: 2800,
      status: "completed",
      date: new Date(Date.now() - 345600000), // 4 days ago
      paymentMethod: "visa ending in 4242",
      invoiceUrl: "#"
    }
  ]);

  // Calculate total spent
  const totalSpent = useMemo(() => {
    return paymentHistory
      .filter(payment => payment.status === "completed")
      .reduce((total, payment) => total + payment.amount, 0);
  }, [paymentHistory]);

  // Calculate monthly spending
  const monthlySpent = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    return paymentHistory
      .filter(payment => {
        const paymentDate = new Date(payment.date);
        return payment.status === "completed" && 
               paymentDate.getMonth() === currentMonth &&
               paymentDate.getFullYear() === currentYear;
      })
      .reduce((total, payment) => total + payment.amount, 0);
  }, [paymentHistory]);

  const handleAddPaymentMethod = (paymentData) => {
    const newPaymentMethod = {
      id: `pm_${Date.now()}`,
      ...paymentData,
      isDefault: paymentMethods.length === 0
    };
    
    setPaymentMethods(prev => [...prev, newPaymentMethod]);
    setShowAddPaymentModal(false);
  };

  const handleRemovePaymentMethod = (paymentMethodId) => {
    setPaymentMethods(prev => prev.filter(pm => pm.id !== paymentMethodId));
  };

  const handleSetDefault = (paymentMethodId) => {
    setPaymentMethods(prev => 
      prev.map(pm => ({
        ...pm,
        isDefault: pm.id === paymentMethodId
      }))
    );
  };

  const handleDownloadInvoice = (invoiceUrl, orderId) => {
    console.log("Downloading invoice for order:", orderId);
    // TODO: Implement actual invoice download
    alert(`Downloading invoice for order ${orderId}`);
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "history", label: "Payment History", icon: "📋" },
    { id: "methods", label: "Payment Methods", icon: "💳" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Payments</h3>
        <p className="text-gray-600">Manage your payment methods and view transaction history.</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "overview" && (
          <PaymentOverview 
            totalSpent={totalSpent}
            monthlySpent={monthlySpent}
            paymentHistory={paymentHistory}
            onDownloadInvoice={handleDownloadInvoice}
          />
        )}
        
        {activeTab === "history" && (
          <PaymentHistory 
            payments={paymentHistory}
            onDownloadInvoice={handleDownloadInvoice}
          />
        )}
        
        {activeTab === "methods" && (
          <PaymentMethods 
            paymentMethods={paymentMethods}
            onAddPaymentMethod={() => setShowAddPaymentModal(true)}
            onRemovePaymentMethod={handleRemovePaymentMethod}
            onSetDefault={handleSetDefault}
          />
        )}
      </div>

      {/* Add Payment Method Modal */}
      {showAddPaymentModal && (
        <AddPaymentMethodModal
          isOpen={showAddPaymentModal}
          onClose={() => setShowAddPaymentModal(false)}
          onAddPaymentMethod={handleAddPaymentMethod}
        />
      )}
    </div>
  );
};

export default Payments; 