import React from "react";
import { FaCheck, FaClock, FaFilter, FaDownload } from "react-icons/fa";

const PaymentHistory = () => {
  // Mock payment history data
  const paymentHistory = [
    {
      id: 1,
      date: "2024-01-15",
      type: "Gig Completed",
      gigName: "UI Design for Mobile App",
      amount: 2500,
      status: "Cleared"
    },
    {
      id: 2,
      date: "2024-01-14",
      type: "Withdrawal",
      gigName: "Bank Transfer",
      amount: 5000,
      status: "Completed"
    },
    {
      id: 3,
      date: "2024-01-12",
      type: "Gig Completed",
      gigName: "Logo Design for Clothing Brand",
      amount: 1500,
      status: "Pending"
    },
    {
      id: 4,
      date: "2024-01-10",
      type: "Gig Completed",
      gigName: "Website Development",
      amount: 8000,
      status: "Cleared"
    },
    {
      id: 5,
      date: "2024-01-08",
      type: "Withdrawal",
      gigName: "PayPal Transfer",
      amount: 3000,
      status: "Completed"
    },
    {
      id: 6,
      date: "2024-01-05",
      type: "Gig Completed",
      gigName: "Content Writing Services",
      amount: 1200,
      status: "Pending"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Cleared':
      case 'Completed':
        return 'bg-green-100 text-green-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Cleared':
      case 'Completed':
        return <FaCheck className="text-green-600" />;
      case 'Pending':
        return <FaClock className="text-yellow-600" />;
      default:
        return <FaClock className="text-gray-600" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Payment History</h3>
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <FaFilter className="text-gray-400 text-sm" />
            <span className="text-sm text-gray-700">Filter</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <FaDownload className="text-gray-400 text-sm" />
            <span className="text-sm text-gray-700">Export</span>
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Gig Name</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount (₹)</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((payment) => (
              <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-700">{formatDate(payment.date)}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{payment.type}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{payment.gigName}</td>
                <td className="py-3 px-4 text-sm font-semibold text-green-600">₹{payment.amount.toLocaleString()}</td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                    {getStatusIcon(payment.status)}
                    <span>{payment.status}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory; 