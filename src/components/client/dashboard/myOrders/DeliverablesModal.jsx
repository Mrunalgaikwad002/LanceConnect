import React, { useState } from "react";
import { FaTimes, FaDownload, FaEye, FaStar, FaFile, FaImage, FaVideo, FaFilePdf } from "react-icons/fa";

const DeliverablesModal = ({ order, isOpen, onClose, onRateFreelancer }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  if (!isOpen || !order) return null;

  const handleRateFreelancer = () => {
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }
    onRateFreelancer(order.id, { rating, review });
    setShowRatingForm(false);
    setRating(0);
    setReview("");
    setShowSuccessMessage(true);
    
    // Auto-hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const getFileIcon = (fileType) => {
    if (fileType.includes('image')) return <FaImage className="h-4 w-4" />;
    if (fileType.includes('video')) return <FaVideo className="h-4 w-4" />;
    if (fileType.includes('pdf')) return <FaFilePdf className="h-4 w-4" />;
    return <FaFile className="h-4 w-4" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Delivered Work</h2>
            <p className="text-sm text-gray-500">Order: {order.gigTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Success Message */}
          {showSuccessMessage && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-green-800">Review Submitted Successfully!</h4>
                  <p className="text-sm text-green-700">Thank you for your feedback.</p>
                </div>
              </div>
            </div>
          )}

          {/* Freelancer Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {order.freelancer.avatar}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{order.freelancer.name}</h4>
                  <p className="text-sm text-gray-500">Freelancer</p>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="text-yellow-400 mr-1">★</span>
                    {order.freelancer.rating} rating
                  </div>
                </div>
              </div>
              {!order.isRated && (
                <button
                  onClick={() => setShowRatingForm(true)}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  <FaStar className="h-4 w-4 mr-2" />
                  Rate & Review
                </button>
              )}
            </div>
          </div>

          {/* Deliverables */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Delivered Files</h3>
            <div className="space-y-3">
              {order.deliverables?.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                      {getFileIcon(file.type)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{file.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => window.open(file.url, '_blank')}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <FaEye className="h-3 w-3 mr-1" />
                      View
                    </button>
                    <button
                      onClick={() => window.open(file.url, '_blank')}
                      className="inline-flex items-center px-3 py-1.5 border border-blue-300 shadow-sm text-xs font-medium rounded text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <FaDownload className="h-3 w-3 mr-1" />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Message */}
          {order.deliveryMessage && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Delivery Message</h4>
              <p className="text-sm text-blue-800">{order.deliveryMessage}</p>
            </div>
          )}

          {/* Rating Form */}
          {showRatingForm && (
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Rate & Review</h3>
              <div className="space-y-4">
                {/* Star Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating
                  </label>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="text-2xl focus:outline-none"
                      >
                        <FaStar 
                          className={`h-6 w-6 ${
                            star <= rating 
                              ? 'text-yellow-400' 
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {rating > 0 && `${rating} out of 5`}
                    </span>
                  </div>
                </div>

                {/* Review Text */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Review (optional)
                  </label>
                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    rows={4}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Share your experience with this freelancer..."
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowRatingForm(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRateFreelancer}
                    className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Already Rated */}
          {order.isRated && order.review && (
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Your Review</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar 
                      key={star}
                      className={`h-4 w-4 ${
                        star <= order.review.rating 
                          ? 'text-yellow-400' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600">
                    {order.review.rating} out of 5
                  </span>
                </div>
                {order.review.comment && (
                  <p className="text-sm text-gray-700">{order.review.comment}</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliverablesModal; 