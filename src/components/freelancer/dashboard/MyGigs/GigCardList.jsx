import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import GigDetailsModal from "./GigDetailsModal";
import EditGigModal from "./EditGigModal";

const initialGigs = [
  {
    title: "Logo Design",
    category: "Design",
    price: "₹500 - ₹1500",
    status: "Active",
    orders: 12,
    rating: 4.9,
    reviews: 27,
    views: 120,
    description: "Professional logo design for your brand.",
    tags: ["logo", "branding", "design"],
    deliveryTime: "2 days",
    revisions: 3,
    samples: ["https://via.placeholder.com/60", "https://via.placeholder.com/60"]
  },
  {
    title: "SEO Blog Writing",
    category: "Writing",
    price: "₹800 - ₹2000",
    status: "Paused",
    orders: 7,
    rating: 4.7,
    reviews: 15,
    views: 90,
    description: "SEO-optimized blog posts to boost your website.",
    tags: ["seo", "writing", "blog"],
    deliveryTime: "3 days",
    revisions: 2,
    samples: ["https://via.placeholder.com/60"]
  },
  {
    title: "Business Card Design",
    category: "Design",
    price: "₹400 - ₹1000",
    status: "Draft",
    orders: 0,
    rating: 0,
    reviews: 0,
    views: 10,
    description: "Custom business card design for professionals.",
    tags: ["business card", "design"],
    deliveryTime: "1 day",
    revisions: 1,
    samples: []
  },
  {
    title: "Website Development",
    category: "Web Development",
    price: "₹5,000 - ₹15,000",
    status: "Active",
    orders: 5,
    rating: 4.8,
    reviews: 12,
    views: 200,
    description: "Responsive website development with modern tech stack.",
    tags: ["web", "development", "responsive"],
    deliveryTime: "7 days",
    revisions: 2,
    samples: ["https://via.placeholder.com/60"]
  },
  {
    title: "SEO Audit",
    category: "SEO",
    price: "₹1,000 - ₹2,500",
    status: "Active",
    orders: 3,
    rating: 4.6,
    reviews: 8,
    views: 60,
    description: "Comprehensive SEO audit for your website.",
    tags: ["seo", "audit"],
    deliveryTime: "2 days",
    revisions: 1,
    samples: []
  },
  {
    title: "Content Marketing",
    category: "Marketing",
    price: "₹2,000 - ₹5,000",
    status: "Paused",
    orders: 2,
    rating: 4.5,
    reviews: 5,
    views: 40,
    description: "Content marketing strategy and execution.",
    tags: ["content", "marketing"],
    deliveryTime: "5 days",
    revisions: 2,
    samples: []
  },
  {
    title: "Social Media Management",
    category: "Marketing",
    price: "₹3,000 - ₹8,000",
    status: "Active",
    orders: 8,
    rating: 4.9,
    reviews: 18,
    views: 150,
    description: "Complete social media management for your brand.",
    tags: ["social media", "marketing", "management"],
    deliveryTime: "Ongoing",
    revisions: 3,
    samples: ["https://via.placeholder.com/60", "https://via.placeholder.com/60"]
  },
  {
    title: "Mobile App Development",
    category: "Web Development",
    price: "₹15,000 - ₹50,000",
    status: "Active",
    orders: 4,
    rating: 4.7,
    reviews: 10,
    views: 300,
    description: "Native and cross-platform mobile app development.",
    tags: ["mobile", "app", "development"],
    deliveryTime: "14 days",
    revisions: 3,
    samples: ["https://via.placeholder.com/60"]
  },
  {
    title: "Video Editing",
    category: "Video & Animation",
    price: "₹1,500 - ₹4,000",
    status: "Active",
    orders: 6,
    rating: 4.8,
    reviews: 14,
    views: 80,
    description: "Professional video editing and post-production.",
    tags: ["video", "editing", "post-production"],
    deliveryTime: "3 days",
    revisions: 2,
    samples: ["https://via.placeholder.com/60"]
  },
  {
    title: "Data Entry",
    category: "Admin Support",
    price: "₹200 - ₹800",
    status: "Active",
    orders: 15,
    rating: 4.6,
    reviews: 22,
    views: 45,
    description: "Accurate and fast data entry services.",
    tags: ["data entry", "admin", "support"],
    deliveryTime: "1 day",
    revisions: 1,
    samples: []
  },
  {
    title: "Translation Services",
    category: "Translation",
    price: "₹500 - ₹2,000",
    status: "Paused",
    orders: 3,
    rating: 4.9,
    reviews: 7,
    views: 35,
    description: "Professional translation in multiple languages.",
    tags: ["translation", "languages"],
    deliveryTime: "2 days",
    revisions: 1,
    samples: []
  },
  {
    title: "Voice Over",
    category: "Music & Audio",
    price: "₹1,000 - ₹3,000",
    status: "Draft",
    orders: 0,
    rating: 0,
    reviews: 0,
    views: 5,
    description: "Professional voice over for commercials and videos.",
    tags: ["voice over", "audio", "commercial"],
    deliveryTime: "2 days",
    revisions: 2,
    samples: []
  }
];

const statusColors = {
  "Active": "bg-green-100 text-green-700",
  "Paused": "bg-yellow-100 text-yellow-700",
  "Draft": "bg-gray-100 text-gray-700",
};

const GigCardList = ({ newGig, onGigAdded }) => {
  const [gigs, setGigs] = useState(initialGigs);
  const [selectedGig, setSelectedGig] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editGig, setEditGig] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Add new gig when it's created
  React.useEffect(() => {
    if (newGig) {
      setGigs(prevGigs => [newGig, ...prevGigs]);
      onGigAdded && onGigAdded(); // Notify parent that gig was added
    }
  }, [newGig, onGigAdded]);

  const handleViewMore = (gig) => {
    setSelectedGig(gig);
    setModalOpen(true);
  };

  const handleEdit = (gig) => {
    setEditGig(gig);
    setEditOpen(true);
  };

  const handleSaveEdit = (updatedGig) => {
    setGigs(gigs.map(g => (g.title === editGig.title ? { ...g, ...updatedGig } : g)));
    setEditOpen(false);
    setEditGig(null);
  };

  const handleDelete = (gig) => {
    setDeleteConfirm(gig);
  };

  const confirmDelete = () => {
    setGigs(gigs.filter(g => g.title !== deleteConfirm.title));
    setDeleteConfirm(null);
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {gigs.map((gig, i) => (
        <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-900">{gig.title}</h4>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[gig.status] || "bg-gray-100 text-gray-700"}`}>
              {gig.status}
            </span>
          </div>
          <div className="text-sm text-gray-700">{gig.category}</div>
          <div className="text-base font-semibold text-blue-600">{gig.price}</div>
          <div className="flex gap-4 text-sm text-gray-700">
            <span>Orders: <span className="font-semibold">{gig.orders}</span></span>
            <span>⭐ {gig.rating} ({gig.reviews})</span>
            <span>👁️ {gig.views}</span>
          </div>
          <div className="flex gap-2 mt-auto">
            <button 
              className="p-2 rounded hover:bg-blue-50 transition-colors duration-200" 
              title="Edit" 
              onClick={() => handleEdit(gig)}
            >
              <FaEdit className="text-blue-600" />
            </button>
            <button 
              className="p-2 rounded hover:bg-red-50 transition-colors duration-200" 
              title="Delete" 
              onClick={() => handleDelete(gig)}
            >
              <FaTrash className="text-red-600" />
            </button>
            <button
              className="ml-auto px-3 py-1 rounded bg-green-100 text-green-700 font-semibold border border-green-200 hover:bg-green-200 transition-colors duration-200"
              onClick={() => handleViewMore(gig)}
            >
              View More Details
            </button>
          </div>
        </div>
      ))}
      
      {/* Modals */}
      <GigDetailsModal gig={selectedGig} open={modalOpen} onClose={() => setModalOpen(false)} />
      <EditGigModal gig={editGig} open={editOpen} onClose={() => setEditOpen(false)} onSave={handleSaveEdit} />
      
      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Gig</h3>
            <p className="text-sm text-gray-700 mb-6">
              Are you sure you want to delete "{deleteConfirm.title}"? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button 
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 font-semibold"
                onClick={confirmDelete}
              >
                Delete
              </button>
              <button 
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-semibold"
                onClick={cancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GigCardList; 