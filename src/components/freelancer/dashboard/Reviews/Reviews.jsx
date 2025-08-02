import React, { useState, useEffect } from "react";
import { FaSearch, FaStar, FaFilter, FaSort, FaChevronDown, FaChevronUp } from "react-icons/fa";
import ReviewSummary from "./ReviewSummary";
import ReviewFilters from "./ReviewFilters";
import ReviewList from "./ReviewList";
import ReviewAnalytics from "./ReviewAnalytics";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    rating: "all",
    gig: "all",
    dateSort: "recent"
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const reviewsPerPage = 8;

  // Mock data for reviews
  const [mockReviews] = useState([
    {
      id: 1,
      clientName: "Ankita Sharma",
      clientEmail: "ankita.sharma@email.com",
      profilePicture: null,
      gigTitle: "Logo Design for Fashion Brand",
      rating: 5,
      reviewText: "Absolutely amazing work! The logo perfectly captures our brand's essence. Communication was excellent throughout the project. Highly recommend!",
      datePosted: "2024-01-15T10:00:00",
      attachments: [],
      freelancerReply: "Thank you so much, Ankita! It was a pleasure working with you. Your vision for the brand really helped create something special. 😊",
      replyDate: "2024-01-15T14:30:00"
    },
    {
      id: 2,
      clientName: "Rahul Patel",
      clientEmail: "rahul.patel@email.com",
      profilePicture: null,
      gigTitle: "Website Development for Restaurant",
      rating: 4,
      reviewText: "Great website design and functionality. The online ordering system works perfectly. Minor delays in delivery but overall satisfied.",
      datePosted: "2024-01-14T09:00:00",
      attachments: [],
      freelancerReply: null
    },
    {
      id: 3,
      clientName: "Priya Singh",
      clientEmail: "priya.singh@email.com",
      profilePicture: null,
      gigTitle: "Content Writing for Blog",
      rating: 5,
      reviewText: "Exceptional content quality! The articles are engaging and well-researched. Will definitely hire again for future projects.",
      datePosted: "2024-01-13T16:00:00",
      attachments: [],
      freelancerReply: "Thank you, Priya! I'm glad you loved the content. Looking forward to working together again! ✨"
    },
    {
      id: 4,
      clientName: "Amit Kumar",
      clientEmail: "amit.kumar@email.com",
      profilePicture: null,
      gigTitle: "Mobile App Development",
      rating: 3,
      reviewText: "The app works but there were some bugs that took time to fix. Communication could have been better. Average experience.",
      datePosted: "2024-01-12T11:00:00",
      attachments: [],
      freelancerReply: "I apologize for the issues you faced. I've learned from this experience and will improve my communication and testing process."
    },
    {
      id: 5,
      clientName: "Neha Gupta",
      clientEmail: "neha.gupta@email.com",
      profilePicture: null,
      gigTitle: "Social Media Design",
      rating: 5,
      reviewText: "Stunning designs! The social media posts are eye-catching and perfectly aligned with our brand. Quick turnaround time too!",
      datePosted: "2024-01-11T14:00:00",
      attachments: [],
      freelancerReply: "Thank you, Neha! Your brand guidelines were so clear, it made the design process smooth and enjoyable! 🎨"
    },
    {
      id: 6,
      clientName: "Vikram Malhotra",
      clientEmail: "vikram.malhotra@email.com",
      profilePicture: null,
      gigTitle: "Logo Design for Startup",
      rating: 4,
      reviewText: "Good logo design, modern and professional. The freelancer was responsive and made revisions as requested.",
      datePosted: "2024-01-10T13:00:00",
      attachments: [],
      freelancerReply: "Thanks, Vikram! I'm glad the logo meets your expectations. Best of luck with your startup! 🚀"
    },
    {
      id: 7,
      clientName: "Sneha Reddy",
      clientEmail: "sneha.reddy@email.com",
      profilePicture: null,
      gigTitle: "E-commerce Website",
      rating: 5,
      reviewText: "Outstanding work! The website is fast, user-friendly, and looks professional. The payment integration works flawlessly.",
      datePosted: "2024-01-09T10:00:00",
      attachments: [],
      freelancerReply: "Thank you, Sneha! Your feedback means a lot. The e-commerce features were fun to implement! 💻"
    },
    {
      id: 8,
      clientName: "Arjun Mehta",
      clientEmail: "arjun.mehta@email.com",
      profilePicture: null,
      gigTitle: "Brand Identity Design",
      rating: 4,
      reviewText: "Great brand identity package. The logo, color scheme, and typography work well together. Minor tweaks needed but overall satisfied.",
      datePosted: "2024-01-08T15:00:00",
      attachments: [],
      freelancerReply: "Thanks, Arjun! I'm happy the brand identity resonates with your vision. Let me know if you need any adjustments!"
    },
    {
      id: 9,
      clientName: "Kavya Iyer",
      clientEmail: "kavya.iyer@email.com",
      profilePicture: null,
      gigTitle: "UI/UX Design",
      rating: 5,
      reviewText: "Exceptional UI/UX design! The user flow is intuitive and the interface is beautiful. Exceeded my expectations!",
      datePosted: "2024-01-07T12:00:00",
      attachments: [],
      freelancerReply: "Thank you, Kavya! Your project was so interesting to work on. The user experience was my top priority! 🎯"
    },
    {
      id: 10,
      clientName: "Rohan Sharma",
      clientEmail: "rohan.sharma@email.com",
      profilePicture: null,
      gigTitle: "Video Editing",
      rating: 3,
      reviewText: "Decent video editing but took longer than expected. The final result was good but communication could improve.",
      datePosted: "2024-01-06T09:00:00",
      attachments: [],
      freelancerReply: "I apologize for the delays, Rohan. I'm working on improving my project management and communication skills."
    }
  ]);

  // Handle reply submission
  const handleReplySubmit = (reviewId) => {
    if (!replyText.trim()) return;

    const updatedReviews = reviews.map(review => {
      if (review.id === reviewId) {
        return {
          ...review,
          freelancerReply: replyText.trim(),
          replyDate: new Date().toISOString()
        };
      }
      return review;
    });

    setReviews(updatedReviews);
    setReplyingTo(null);
    setReplyText("");
  };

  // Handle reply cancellation
  const handleReplyCancel = () => {
    setReplyingTo(null);
    setReplyText("");
  };

  // Handle reply button click
  const handleReplyClick = (reviewId) => {
    setReplyingTo(reviewId);
    setReplyText("");
  };

  // Calculate summary metrics
  const calculateSummary = () => {
    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0 
      ? (reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1)
      : 0;
    
    const uniqueClients = new Set(reviews.map(review => review.clientEmail)).size;
    const uniqueGigs = new Set(reviews.map(review => review.gigTitle)).size;
    
    const ratingDistribution = {
      5: reviews.filter(r => r.rating === 5).length,
      4: reviews.filter(r => r.rating === 4).length,
      3: reviews.filter(r => r.rating === 3).length,
      2: reviews.filter(r => r.rating === 2).length,
      1: reviews.filter(r => r.rating === 1).length
    };

    return {
      averageRating,
      totalClients: uniqueClients,
      totalGigs: uniqueGigs,
      ratingDistribution
    };
  };

  // Filter and sort reviews
  useEffect(() => {
    let filtered = [...mockReviews];

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(review =>
        review.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.gigTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.reviewText.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Rating filter
    if (filters.rating !== "all") {
      filtered = filtered.filter(review => review.rating === parseInt(filters.rating));
    }

    // Gig filter
    if (filters.gig !== "all") {
      filtered = filtered.filter(review => review.gigTitle === filters.gig);
    }

    // Date sort
    filtered.sort((a, b) => {
      const dateA = new Date(a.datePosted);
      const dateB = new Date(b.datePosted);
      return filters.dateSort === "recent" ? dateB - dateA : dateA - dateB;
    });

    setReviews(filtered);
    setCurrentPage(1);
  }, [searchQuery, filters, mockReviews]);

  // Pagination
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const summary = calculateSummary();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Reviews</h2>
          <p className="text-sm text-gray-600 mt-1">
            {reviews.length} review{reviews.length !== 1 ? 's' : ''} from {summary.totalClients} client{summary.totalClients !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-64"
            />
          </div>
          
          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <FaFilter className="text-gray-400 text-sm" />
            <span className="text-sm text-gray-700">Filters</span>
            {showFilters ? <FaChevronUp className="text-gray-400 text-xs" /> : <FaChevronDown className="text-gray-400 text-xs" />}
          </button>
        </div>
      </div>

      {/* Filters Section */}
      {showFilters && (
        <div className="border-b border-gray-200 p-4">
          <ReviewFilters
            filters={filters}
            setFilters={setFilters}
            reviews={mockReviews}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Summary Section */}
        <div className="p-6 border-b border-gray-200">
          <ReviewSummary summary={summary} />
        </div>

        {/* Analytics Section */}
        <div className="p-6 border-b border-gray-200">
          <ReviewAnalytics reviews={reviews} />
        </div>

        {/* Reviews List */}
        <div className="flex-1 overflow-y-auto p-6">
          <ReviewList 
            reviews={currentReviews}
            currentPage={currentPage}
            totalPages={totalPages}
            totalReviews={reviews.length}
            onPageChange={handlePageChange}
            onLoadMore={handleLoadMore}
            hasMorePages={currentPage < totalPages}
            replyingTo={replyingTo}
            replyText={replyText}
            onReplyTextChange={setReplyText}
            onReplySubmit={handleReplySubmit}
            onReplyCancel={handleReplyCancel}
            onReplyClick={handleReplyClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Reviews; 