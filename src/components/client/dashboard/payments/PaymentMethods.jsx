import React from "react";
import { FaCreditCard, FaTrash, FaStar, FaPlus } from "react-icons/fa";

const PaymentMethods = ({ paymentMethods, onAddPaymentMethod, onRemovePaymentMethod, onSetDefault }) => {
  const getCardIcon = (brand) => {
    const brandColors = {
      visa: "text-blue-600",
      mastercard: "text-red-600",
      amex: "text-green-600"
    };
    return brandColors[brand] || "text-gray-600";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Payment Methods</h3>
          <p className="text-sm text-gray-500">Manage your saved payment methods</p>
        </div>
        <button
          onClick={onAddPaymentMethod}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          <FaPlus className="h-4 w-4 mr-2" />
          Add Payment Method
        </button>
      </div>

      {/* Payment Methods List */}
      <div className="space-y-4">
        {paymentMethods.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <div className="text-gray-400 text-6xl mb-4">💳</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No payment methods</h3>
            <p className="text-gray-600 mb-4">Add a payment method to get started</p>
            <button
              onClick={onAddPaymentMethod}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              <FaPlus className="h-4 w-4 mr-2" />
              Add Payment Method
            </button>
          </div>
        ) : (
          paymentMethods.map((method) => (
            <div key={method.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center ${getCardIcon(method.brand)}`}>
                    <FaCreditCard className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-lg font-medium text-gray-900 capitalize">
                        {method.brand} •••• {method.last4}
                      </h4>
                      {method.isDefault && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <FaStar className="h-3 w-3 mr-1" />
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      Expires {method.expiryMonth}/{method.expiryYear} • {method.name}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {!method.isDefault && (
                    <button
                      onClick={() => onSetDefault(method.id)}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Set as Default
                    </button>
                  )}
                  <button
                    onClick={() => onRemovePaymentMethod(method.id)}
                    className="inline-flex items-center px-3 py-1.5 border border-red-300 shadow-sm text-xs font-medium rounded text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <FaTrash className="h-3 w-3 mr-1" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PaymentMethods; 