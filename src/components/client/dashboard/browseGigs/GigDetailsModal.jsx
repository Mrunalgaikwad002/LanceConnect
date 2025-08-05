import React from "react";
import { FaTimes, FaStar, FaClock, FaCheck,  FaHeart } from "react-icons/fa";

const GigDetailsModal = ({ gig, isOpen, onClose, onPurchase }) => {
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Gig Details</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Gig Info */}
            <div>
              {/* Gig Image */}
              <div className="mb-6">
                <img
                  src={gig.image}
                  alt={gig.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>

              {/* Gig Title and Category */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full mb-2">
                  {gig.category}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{gig.title}</h3>
                <p className="text-gray-600">{gig.description}</p>
              </div>

              {/* What's Included */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">What's Included</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <FaCheck className="h-4 w-4 text-green-500 mr-3" />
                    <span className="text-gray-700">Professional quality work</span>
                  </div>
                  <div className="flex items-center">
                    <FaCheck className="h-4 w-4 text-green-500 mr-3" />
                    <span className="text-gray-700">{gig.revisions} revisions included</span>
                  </div>
                  <div className="flex items-center">
                    <FaCheck className="h-4 w-4 text-green-500 mr-3" />
                    <span className="text-gray-700">Source files included</span>
                  </div>
                  <div className="flex items-center">
                    <FaCheck className="h-4 w-4 text-green-500 mr-3" />
                    <span className="text-gray-700">Fast delivery</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Freelancer & Purchase */}
            <div>
              {/* Freelancer Info */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">About the Freelancer</h4>
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-full ${getAvatarColor(gig.freelancer.name)} flex items-center justify-center text-white font-semibold text-lg mr-4`}>
                    {gig.freelancer.avatar}
                  </div>
                  <div>
                    <h5 className="text-lg font-semibold text-gray-900">{gig.freelancer.name}</h5>
                    <div className="flex items-center">
                      <FaStar className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-gray-600">
                        {gig.freelancer.rating} ({gig.freelancer.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <FaClock className="h-4 w-4 mr-2" />
                    <span>Delivery in {gig.deliveryTime}</span>
                  </div>
                  <div className="flex items-center">
                    <FaCheck className="h-4 w-4 mr-2" />
                    <span>{gig.revisions} revisions included</span>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <div className="text-center mb-4">
                  <span className="text-3xl font-bold text-gray-900">₹{gig.price}</span>
                  <span className="text-gray-500 ml-2">starting at</span>
                </div>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Base price</span>
                    <span>₹{gig.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform fee</span>
                    <span>₹{Math.round(gig.price * 0.05)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-semibold text-gray-900">
                      <span>Total</span>
                      <span>₹{Math.round(gig.price * 1.05)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => onPurchase(gig)}
                  className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Purchase Now
                </button>
                <button className="w-full py-3 px-6 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                  <FaHeart className="h-4 w-4 inline mr-2" />
                  Save for Later
                </button>
              </div>

              {/* Additional Info */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h5 className="font-semibold text-blue-900 mb-2">Why choose this gig?</h5>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• High-quality work guaranteed</li>
                  <li>• Fast delivery time</li>
                  <li>• Multiple revisions included</li>
                  <li>• Professional freelancer</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigDetailsModal; 