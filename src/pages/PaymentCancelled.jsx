import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimesCircle, FaArrowLeft, FaCreditCard } from 'react-icons/fa';

const PaymentCancelled = () => {
  const navigate = useNavigate();

  const handleTryAgain = () => {
    navigate('/client/dashboard?section=browsegigs');
  };

  const handleGoHome = () => {
    navigate('/client/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
        <div className="text-center">
          {/* Cancelled Icon */}
          <div className="text-red-500 text-6xl mb-4">
            <FaTimesCircle className="mx-auto" />
          </div>

          {/* Cancelled Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Cancelled
          </h1>
          <p className="text-gray-600 mb-8">
            Your payment was cancelled. No charges were made to your account.
          </p>

          {/* Information */}
          <div className="bg-yellow-50 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-center mb-3">
              <FaCreditCard className="h-5 w-5 text-yellow-600 mr-2" />
              <h3 className="text-lg font-semibold text-yellow-900">Payment Information</h3>
            </div>
            <div className="space-y-2 text-sm text-yellow-800">
              <p>• No money was deducted from your account</p>
              <p>• Your order was not placed</p>
              <p>• You can try the payment again anytime</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleTryAgain}
              className="flex-1 py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={handleGoHome}
              className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
            >
              <FaArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </button>
          </div>

          {/* Help Text */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              Having trouble with payment? Contact our support team for assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelled; 