import React from "react";
import { FaDownload, FaRupeeSign, FaCalendarAlt, FaChartLine } from "react-icons/fa";

const PaymentOverview = ({ totalSpent, monthlySpent, paymentHistory, onDownloadInvoice }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { color: "bg-green-100 text-green-800", label: "Completed" },
      pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
      failed: { color: "bg-red-100 text-red-800", label: "Failed" }
    };

    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const recentPayments = paymentHistory.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Spending Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Spent */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <FaRupeeSign className="h-4 w-4 text-blue-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalSpent)}</p>
            </div>
          </div>
        </div>

        {/* Monthly Spent */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <FaCalendarAlt className="h-4 w-4 text-green-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">This Month</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(monthlySpent)}</p>
            </div>
          </div>
        </div>

        {/* Average Order Value */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <FaChartLine className="h-4 w-4 text-purple-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Avg. Order Value</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(paymentHistory.length > 0 ? totalSpent / paymentHistory.length : 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Transactions</h3>
        </div>
        
        <div className="overflow-hidden">
          {recentPayments.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 text-4xl mb-2">💳</div>
              <p className="text-gray-500">No transactions yet</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {recentPayments.map((payment) => (
                <div key={payment.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {payment.gigTitle}
                        </h4>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(payment.status)}
                          <button
                            onClick={() => onDownloadInvoice(payment.invoiceUrl, payment.orderId)}
                            className="text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            <FaDownload className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <span>{payment.freelancer}</span>
                          <span>•</span>
                          <span>{payment.paymentMethod}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span>{formatDate(payment.date)}</span>
                          <span className="font-medium text-gray-900">
                            {formatCurrency(payment.amount)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {recentPayments.length > 0 && (
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View all transactions →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentOverview; 