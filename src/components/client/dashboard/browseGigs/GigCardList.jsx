import React, { useState } from "react";
import { FaStar, FaEye, FaHeart } from "react-icons/fa";
import GigDetailsModal from "./GigDetailsModal";
import GigSummaryModal from "./GigSummaryModal";
import { createCheckoutSession, redirectToCheckout } from "../../../../services/stripeService";

const GigCardList = ({ filteredGigs }) => {
  const [selectedGig, setSelectedGig] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  const handleViewDetails = (gig) => {
    setSelectedGig(gig);
    setShowDetailsModal(true);
  };

  const handlePurchase = (gig) => {
    setSelectedGig(gig);
    setShowSummaryModal(true);
  };

  const handleProceedToPayment = async (gig, totalAmount) => {
    try {
      // Check if user is authenticated
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      
      if (!token || !user) {
        alert('Please log in to make a purchase');
        return;
      }
      
      console.log('User authenticated:', JSON.parse(user));
      console.log('Token available:', !!token);
      
      // Create checkout session
      const { url } = await createCheckoutSession(gig, totalAmount);
      
      // Close summary modal
      setShowSummaryModal(false);
      
      // Redirect to Stripe checkout
      redirectToCheckout(url);
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    }
  };

  const avatarColors = [
    "bg-red-500",
    "bg-blue-500", 
    "bg-green-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500"
  ];

  return (
    <div>
      {filteredGigs.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No gigs found</h3>
          <p className="text-gray-600">Try adjusting your search terms or category filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGigs.map((gig, index) => (
            <div key={gig.id} className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              {/* Gig Image */}
              <div className="relative h-48 bg-gray-200">
                <img
                  src={gig.image}
                  alt={gig.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <button className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50">
                    <FaHeart className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Gig Content */}
              <div className="p-6">
                {/* Category */}
                <div className="mb-2">
                  <span className="inline-block px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
                    {gig.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {gig.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {gig.description}
                </p>

                {/* Freelancer Info */}
                <div className="flex items-center mb-4">
                  <div className={`w-8 h-8 rounded-full ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-white font-semibold text-xs mr-3`}>
                    {gig.freelancer.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{gig.freelancer.name}</p>
                    <div className="flex items-center">
                      <FaStar className="h-3 w-3 text-yellow-400 mr-1" />
                      <span className="text-xs text-gray-600">
                        {gig.freelancer.rating} ({gig.freelancer.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price and Actions */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">₹{gig.price}</span>
                    <span className="text-sm text-gray-500 ml-1">starting at</span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewDetails(gig)}
                      className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <FaEye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handlePurchase(gig)}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Purchase
                    </button>
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Delivery: {gig.deliveryTime}</span>
                    <span>Revisions: {gig.revisions}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Gig Details Modal */}
      {showDetailsModal && selectedGig && (
        <GigDetailsModal
          gig={selectedGig}
          isOpen={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          onPurchase={handlePurchase}
        />
      )}

      {/* Gig Summary Modal */}
      {showSummaryModal && selectedGig && (
        <GigSummaryModal
          gig={selectedGig}
          isOpen={showSummaryModal}
          onClose={() => setShowSummaryModal(false)}
          onProceedToPayment={handleProceedToPayment}
        />
      )}
    </div>
  );
};

export default GigCardList; 