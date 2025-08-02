import React from "react";
import { FaStar, FaUser, FaBriefcase } from "react-icons/fa";

const ReviewSummary = ({ summary }) => {
  const { averageRating, totalClients, totalGigs, ratingDistribution } = summary;
  
  const totalReviews = Object.values(ratingDistribution).reduce((sum, count) => sum + count, 0);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`text-sm ${
          index < Math.floor(rating)
            ? "text-yellow-400"
            : index < rating
            ? "text-yellow-400 opacity-50"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const renderRatingBar = (stars, count) => {
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    return (
      <div key={stars} className="flex items-center space-x-3">
        <div className="flex items-center space-x-1 w-16">
          <span className="text-sm font-medium text-gray-700">{stars}</span>
          <FaStar className="text-yellow-400 text-sm" />
        </div>
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div
            className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-sm text-gray-600 w-12 text-right">
          {count}
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Overall Summary</h3>
      
      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Average Rating */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-700">Average Rating</p>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-3xl font-bold text-blue-900">{averageRating}</span>
                <span className="text-lg text-blue-600">/ 5</span>
              </div>
              <div className="flex items-center space-x-1 mt-2">
                {renderStars(parseFloat(averageRating))}
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <FaStar className="text-white text-xl" />
            </div>
          </div>
        </div>

        {/* Total Clients */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-700">Total Clients</p>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-3xl font-bold text-green-900">{totalClients}</span>
                <span className="text-lg text-green-600">clients</span>
              </div>
              <p className="text-sm text-green-600 mt-1">Reviewed your work</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <FaUser className="text-white text-xl" />
            </div>
          </div>
        </div>

        {/* Gigs Reviewed */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-700">Gigs Reviewed</p>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-3xl font-bold text-purple-900">{totalGigs}</span>
                <span className="text-lg text-purple-600">gigs</span>
              </div>
              <p className="text-sm text-purple-600 mt-1">Received feedback</p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
              <FaBriefcase className="text-white text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h4 className="text-md font-semibold text-gray-900 mb-4">Rating Distribution</h4>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map(stars => 
            renderRatingBar(stars, ratingDistribution[stars] || 0)
          )}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Total Reviews: {totalReviews}</span>
            <span>Average: {averageRating}/5</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSummary; 