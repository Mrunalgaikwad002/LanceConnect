import React from "react";
import { FaStar, FaCalendar, FaReply, FaThumbsUp, FaPaperclip, FaTimes, FaCheck } from "react-icons/fa";

const ReviewCard = ({ 
  review, 
  formatDate, 
  renderStars,
  isReplying,
  replyText,
  onReplyTextChange,
  onReplySubmit,
  onReplyCancel,
  onReplyClick
}) => {
  const {
    clientName,
    profilePicture,
    gigTitle,
    rating,
    reviewText,
    datePosted,
    attachments,
    freelancerReply,
    replyDate
  } = review;

  const getRatingColor = (rating) => {
    if (rating >= 4) return "text-green-600";
    if (rating >= 3) return "text-yellow-600";
    return "text-red-600";
  };

  const getRatingBg = (rating) => {
    if (rating >= 4) return "bg-green-50 border-green-200";
    if (rating >= 3) return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {/* Profile Picture */}
          {profilePicture ? (
            <img
              src={profilePicture}
              alt={clientName}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {clientName.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            </div>
          )}
          
          {/* Client Info */}
          <div>
            <h4 className="font-semibold text-gray-900">{clientName}</h4>
            <p className="text-sm text-gray-600">{gigTitle}</p>
          </div>
        </div>

        {/* Rating Badge */}
        <div className={`flex items-center space-x-1 px-3 py-1 rounded-full border ${getRatingBg(rating)}`}>
          <FaStar className={`text-sm ${getRatingColor(rating)}`} />
          <span className={`text-sm font-semibold ${getRatingColor(rating)}`}>
            {rating}.0
          </span>
        </div>
      </div>

      {/* Stars */}
      <div className="flex items-center space-x-1 mb-3">
        {renderStars(rating)}
        <span className="text-sm text-gray-600 ml-2">
          {rating} out of 5 stars
        </span>
      </div>

      {/* Review Text */}
      <div className="mb-4">
        <p className="text-gray-700 leading-relaxed">{reviewText}</p>
      </div>

      {/* Attachments */}
      {attachments && attachments.length > 0 && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <FaPaperclip className="text-gray-400 text-sm" />
            <span className="text-sm font-medium text-gray-700">Attachments</span>
          </div>
          <div className="space-y-1">
            {attachments.map((attachment, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                <span>📎</span>
                <span>{attachment.name}</span>
                <span className="text-xs">({attachment.size})</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Freelancer Reply */}
      {freelancerReply && (
        <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-2 mb-2">
            <FaReply className="text-blue-500 text-sm" />
            <span className="text-sm font-medium text-blue-700">Your Reply</span>
            <span className="text-xs text-blue-600">
              {replyDate && (() => {
                const date = new Date(replyDate);
                const now = new Date();
                const diffInMinutes = Math.floor((now - date) / (1000 * 60));
                
                if (diffInMinutes < 1) return 'Just now';
                if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
                if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
                return date.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                });
              })()}
            </span>
          </div>
          <p className="text-blue-800 text-sm leading-relaxed">{freelancerReply}</p>
        </div>
      )}

      {/* Reply Input Section */}
      {isReplying && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-2 mb-3">
            <FaReply className="text-blue-500 text-sm" />
            <span className="text-sm font-medium text-gray-700">Write a Reply</span>
          </div>
          <textarea
            value={replyText}
            onChange={(e) => onReplyTextChange(e.target.value)}
            placeholder="Write your reply to this review..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows="3"
            maxLength="500"
          />
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-gray-500">
              {replyText.length}/500 characters
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={onReplyCancel}
                className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                <FaTimes className="text-sm" />
                <span>Cancel</span>
              </button>
              <button
                onClick={onReplySubmit}
                disabled={!replyText.trim()}
                className={`flex items-center space-x-1 px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${
                  replyText.trim()
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <FaCheck className="text-sm" />
                <span>Submit Reply</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <FaCalendar className="text-gray-400" />
          <span>{formatDate(datePosted)}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200">
            <FaThumbsUp className="text-sm" />
            <span>Helpful</span>
          </button>
          {!freelancerReply && !isReplying && (
            <button 
              onClick={onReplyClick}
              className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              <FaReply className="text-sm" />
              <span>Reply</span>
            </button>
          )}
          {!freelancerReply && isReplying && (
            <button 
              onClick={onReplyCancel}
              className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <FaTimes className="text-sm" />
              <span>Cancel</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard; 