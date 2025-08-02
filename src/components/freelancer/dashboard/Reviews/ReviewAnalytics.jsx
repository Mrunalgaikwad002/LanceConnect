import React from "react";
import { FaStar, FaFire, FaExclamationTriangle, FaLightbulb, FaArrowUp, FaArrowDown } from "react-icons/fa";

const ReviewAnalytics = ({ reviews }) => {
  // Calculate analytics
  const calculateAnalytics = () => {
    if (reviews.length === 0) return null;

    // Group reviews by gig
    const gigStats = {};
    reviews.forEach(review => {
      if (!gigStats[review.gigTitle]) {
        gigStats[review.gigTitle] = {
          total: 0,
          ratings: [],
          averageRating: 0
        };
      }
      gigStats[review.gigTitle].total++;
      gigStats[review.gigTitle].ratings.push(review.rating);
    });

    // Calculate average ratings for each gig
    Object.keys(gigStats).forEach(gig => {
      const ratings = gigStats[gig].ratings;
      gigStats[gig].averageRating = (ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length).toFixed(1);
    });

    // Find top and lowest rated gigs
    const gigsArray = Object.entries(gigStats).map(([gig, stats]) => ({
      gig,
      ...stats
    }));

    const topRatedGig = gigsArray.reduce((max, gig) => 
      parseFloat(gig.averageRating) > parseFloat(max.averageRating) ? gig : max
    );

    const lowestRatedGig = gigsArray.reduce((min, gig) => 
      parseFloat(gig.averageRating) < parseFloat(min.averageRating) ? gig : min
    );

    // Calculate overall stats
    const allRatings = reviews.map(r => r.rating);
    const averageRating = (allRatings.reduce((sum, rating) => sum + rating, 0) / allRatings.length).toFixed(1);
    const fiveStarReviews = reviews.filter(r => r.rating === 5).length;
    const fiveStarPercentage = ((fiveStarReviews / reviews.length) * 100).toFixed(1);

    // Generate insights
    const insights = [];
    
    if (parseFloat(averageRating) >= 4.5) {
      insights.push({
        type: 'positive',
        icon: FaArrowUp,
        title: 'Excellent Performance!',
        message: `You're maintaining a high average rating of ${averageRating}/5. Keep up the great work!`
      });
    }

    if (parseFloat(fiveStarPercentage) >= 70) {
      insights.push({
        type: 'positive',
        icon: FaStar,
        title: 'High 5-Star Rate',
        message: `${fiveStarPercentage}% of your reviews are 5-star ratings. Clients love your work!`
      });
    }

    if (parseFloat(averageRating) < 4.0) {
      insights.push({
        type: 'warning',
        icon: FaExclamationTriangle,
        title: 'Room for Improvement',
        message: 'Consider focusing on communication and delivery speed to improve your ratings.'
      });
    }

    // Add gig-specific insights
    if (topRatedGig && parseFloat(topRatedGig.averageRating) >= 4.5) {
      insights.push({
        type: 'positive',
        icon: FaFire,
        title: 'Top Performing Gig',
        message: `"${topRatedGig.gig}" is your highest-rated service with ${topRatedGig.averageRating}/5 stars.`
      });
    }

    if (lowestRatedGig && parseFloat(lowestRatedGig.averageRating) < 4.0) {
      insights.push({
        type: 'warning',
        icon: FaArrowDown,
        title: 'Needs Attention',
        message: `"${lowestRatedGig.gig}" has the lowest rating (${lowestRatedGig.averageRating}/5). Consider improving this service.`
      });
    }

    return {
      topRatedGig,
      lowestRatedGig,
      averageRating,
      fiveStarPercentage,
      insights
    };
  };

  const analytics = calculateAnalytics();

  if (!analytics) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaStar className="text-gray-400 text-xl" />
        </div>
        <p className="text-gray-600">No reviews yet to analyze</p>
      </div>
    );
  }

  const { topRatedGig, lowestRatedGig, averageRating, fiveStarPercentage, insights } = analytics;

  const getInsightColor = (type) => {
    return type === 'positive' ? 'text-green-600' : 'text-yellow-600';
  };

  const getInsightBg = (type) => {
    return type === 'positive' ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200';
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Analytics & Insights</h3>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Rated Gig */}
        {topRatedGig && (
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <FaFire className="text-green-600 text-lg" />
                  <h4 className="font-semibold text-green-800">Top Rated Gig</h4>
                </div>
                <p className="text-green-700 font-medium mb-1">{topRatedGig.gig}</p>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <FaStar
                        key={i}
                        className={`text-sm ${
                          i < Math.floor(parseFloat(topRatedGig.averageRating))
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-green-700 font-semibold">
                    {topRatedGig.averageRating}/5
                  </span>
                </div>
                <p className="text-green-600 text-sm mt-1">
                  {topRatedGig.total} review{topRatedGig.total !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Lowest Rated Gig */}
        {lowestRatedGig && parseFloat(lowestRatedGig.averageRating) < 4.5 && (
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <FaExclamationTriangle className="text-yellow-600 text-lg" />
                  <h4 className="font-semibold text-yellow-800">Needs Improvement</h4>
                </div>
                <p className="text-yellow-700 font-medium mb-1">{lowestRatedGig.gig}</p>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <FaStar
                        key={i}
                        className={`text-sm ${
                          i < Math.floor(parseFloat(lowestRatedGig.averageRating))
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-yellow-700 font-semibold">
                    {lowestRatedGig.averageRating}/5
                  </span>
                </div>
                <p className="text-yellow-600 text-sm mt-1">
                  {lowestRatedGig.total} review{lowestRatedGig.total !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Insights */}
      {insights.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <FaLightbulb className="text-blue-500 text-lg" />
            <h4 className="font-semibold text-gray-900">Insights & Suggestions</h4>
          </div>
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <div
                key={index}
                className={`flex items-start space-x-3 p-4 rounded-lg border ${getInsightBg(insight.type)}`}
              >
                <insight.icon className={`text-lg mt-0.5 ${getInsightColor(insight.type)}`} />
                <div>
                  <h5 className={`font-medium ${getInsightColor(insight.type)}`}>
                    {insight.title}
                  </h5>
                  <p className="text-sm text-gray-700 mt-1">{insight.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
          <div className="text-2xl font-bold text-blue-600">{averageRating}</div>
          <div className="text-sm text-gray-600">Average Rating</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
          <div className="text-2xl font-bold text-green-600">{fiveStarPercentage}%</div>
          <div className="text-sm text-gray-600">5-Star Reviews</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
          <div className="text-2xl font-bold text-purple-600">{reviews.length}</div>
          <div className="text-sm text-gray-600">Total Reviews</div>
        </div>
      </div>
    </div>
  );
};

export default ReviewAnalytics; 