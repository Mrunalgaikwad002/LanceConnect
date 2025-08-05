import React from "react";
import { FaTimes, FaClock, FaCheck, FaStar } from "react-icons/fa";

const GigSummaryModal = ({ gig, isOpen, onClose, onProceedToPayment }) => {
  if (!isOpen || !gig) return null;

  const avatarColors = [
    "bg-red-500",
    "bg-blue-500", 
    "bg-green-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500"
  ];

  const getAvatarColor = (name) => {
    const index = name.charCodeAt(0) % avatarColors.length;
    return avatarColors[index];
  };

  const totalAmount = gig.price;
  const platformFee = Math.round(gig.price * 0.05);
  const finalTotal = totalAmount + platformFee;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Gig Details */}
          <div className="mb-6">
            <div className="flex items-start space-x-4">
              <img
                src={gig.image}
                alt={gig.title}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{gig.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{gig.description}</p>
                
                {/* Freelancer Info */}
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full ${getAvatarColor(gig.freelancer.name)} flex items-center justify-center text-white font-semibold text-xs mr-3`}>
                    {gig.freelancer.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{gig.freelancer.name}</p>
                    <div className="flex items-center">
                      <FaStar className="h-3 w-3 text-yellow-400 mr-1" />
                      <span className="text-xs text-gray-600">
                        {gig.freelancer.rating} ({gig.freelancer.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Order Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <FaClock className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-600">Delivery Time: {gig.deliveryTime}</span>
              </div>
              <div className="flex items-center">
                <FaCheck className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-600">Revisions: {gig.revisions} included</span>
              </div>
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Pricing Breakdown</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Gig Price</span>
                <span className="text-gray-900">₹{totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Platform Fee (5%)</span>
                <span className="text-gray-900">₹{platformFee}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-semibold text-lg">
                  <span className="text-gray-900">Total</span>
                  <span className="text-blue-600">₹{finalTotal}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => onProceedToPayment(gig, finalTotal)}
              className="flex-1 py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Proceed to Payment
            </button>
          </div>

          {/* Security Note */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-800">
              🔒 Your payment is secured by Stripe. We never store your card details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigSummaryModal; 