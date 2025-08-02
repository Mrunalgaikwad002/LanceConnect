import React from "react";
import { FaStar, FaSort, FaCalendar } from "react-icons/fa";

const ReviewFilters = ({ filters, setFilters, reviews }) => {
  // Get unique gigs from reviews
  const uniqueGigs = [...new Set(reviews.map(review => review.gigTitle))];

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const renderStarFilter = (stars) => {
    return (
      <button
        key={stars}
        onClick={() => handleFilterChange('rating', filters.rating === stars.toString() ? 'all' : stars.toString())}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors duration-200 ${
          filters.rating === stars.toString()
            ? 'bg-blue-50 border-blue-300 text-blue-700'
            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
        }`}
      >
        <span className="text-sm font-medium">{stars}</span>
        <FaStar className="text-yellow-400 text-sm" />
      </button>
    );
  };

  return (
    <div className="space-y-4">
      <h4 className="text-md font-semibold text-gray-900">Filters & Sorting</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Star Rating Filter */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <FaStar className="text-yellow-400 text-sm" />
            <span className="text-sm font-medium text-gray-700">Star Rating</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleFilterChange('rating', 'all')}
              className={`px-3 py-2 rounded-lg border text-sm transition-colors duration-200 ${
                filters.rating === 'all'
                  ? 'bg-blue-50 border-blue-300 text-blue-700'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              All Ratings
            </button>
            {[5, 4, 3, 2, 1].map(stars => renderStarFilter(stars))}
          </div>
        </div>

        {/* Gig Filter */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <FaSort className="text-gray-400 text-sm" />
            <span className="text-sm font-medium text-gray-700">Filter by Gig</span>
          </div>
          <select
            value={filters.gig}
            onChange={(e) => handleFilterChange('gig', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="all">All Gigs</option>
            {uniqueGigs.map(gig => (
              <option key={gig} value={gig}>{gig}</option>
            ))}
          </select>
        </div>

        {/* Date Sort */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <FaCalendar className="text-gray-400 text-sm" />
            <span className="text-sm font-medium text-gray-700">Sort by Date</span>
          </div>
          <select
            value={filters.dateSort}
            onChange={(e) => handleFilterChange('dateSort', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="recent">Most Recent First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {(filters.rating !== 'all' || filters.gig !== 'all') && (
        <div className="flex items-center space-x-2 pt-2 border-t border-gray-200">
          <span className="text-sm text-gray-600">Active filters:</span>
          {filters.rating !== 'all' && (
            <span className="inline-flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
              <FaStar className="text-yellow-400" />
              <span>{filters.rating} stars</span>
              <button
                onClick={() => handleFilterChange('rating', 'all')}
                className="ml-1 hover:text-blue-900"
              >
                ×
              </button>
            </span>
          )}
          {filters.gig !== 'all' && (
            <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
              <span>{filters.gig}</span>
              <button
                onClick={() => handleFilterChange('gig', 'all')}
                className="ml-1 hover:text-green-900"
              >
                ×
              </button>
            </span>
          )}
          <button
            onClick={() => setFilters({ rating: 'all', gig: 'all', dateSort: 'recent' })}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewFilters; 