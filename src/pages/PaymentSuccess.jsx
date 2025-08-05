import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaBox, FaClock, FaArrowLeft } from 'react-icons/fa';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleGoToOrders = () => {
    navigate('/client/dashboard?section=myorders');
  };

  const handleGoHome = () => {
    navigate('/client/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full mx-4">
        <div className="text-center">
          {/* Success Icon */}
          <div className="text-green-500 text-6xl mb-4">
            <FaCheckCircle className="mx-auto" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-8">
            Thank you! Your order has been placed successfully.
          </p>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Details</h2>
            <div className="space-y-3 text-left">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-medium text-gray-900">
                  Order completed
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="text-green-600 font-medium">Payment Confirmed</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium text-gray-900">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">What happens next?</h3>
            <div className="space-y-3 text-left">
              <div className="flex items-center">
                <FaBox className="h-5 w-5 text-blue-600 mr-3" />
                <span className="text-blue-800">Your order has been sent to the freelancer</span>
              </div>
              <div className="flex items-center">
                <FaClock className="h-5 w-5 text-blue-600 mr-3" />
                <span className="text-blue-800">You'll receive updates on your order progress</span>
              </div>
              <div className="flex items-center">
                <FaCheckCircle className="h-5 w-5 text-blue-600 mr-3" />
                <span className="text-blue-800">You can track your order in "My Orders"</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleGoToOrders}
              className="flex-1 py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to My Orders
            </button>
            <button
              onClick={handleGoHome}
              className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
            >
              <FaArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess; 