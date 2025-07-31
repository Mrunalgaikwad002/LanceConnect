import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import GigDetailsModal from "./GigDetailsModal";

const gigs = [
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
];

const statusColors = {
  "Active": "bg-green-100 text-green-800",
  "Paused": "bg-yellow-100 text-yellow-800",
  "Draft": "bg-gray-100 text-gray-800",
};

const GigTable = () => {
  const [selectedGig, setSelectedGig] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleViewMore = (gig) => {
    setSelectedGig(gig);
    setModalOpen(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-base font-bold text-black uppercase">
            <th className="py-2">Title</th>
            <th>Category</th>
            <th>Price Range</th>
            <th>Status</th>
            <th>Orders</th>
            <th>Rating</th>
            <th>Views</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {gigs.map((gig, i) => (
            <tr key={i} className="border-t hover:bg-offwhite transition">
              <td className="py-2 font-semibold text-gray-800">{gig.title}</td>
              <td className="text-gray-800">{gig.category}</td>
              <td className="text-gray-800">{gig.price}</td>
              <td><span className={`px-2 py-1 rounded-full text-xs font-bold ${statusColors[gig.status] || "bg-gray-100 text-gray-800"}`}>{gig.status}</span></td>
              <td className="text-gray-800">{gig.orders}</td>
              <td className="text-gray-800">{gig.rating > 0 ? `⭐${gig.rating} (${gig.reviews})` : "-"}</td>
              <td className="text-gray-800">{gig.views}</td>
              <td className="flex gap-2">
                <button className="p-2 rounded hover:bg-blue-100" title="Edit"><FaEdit className="text-blue-600" /></button>
                <button className="p-2 rounded hover:bg-red-100" title="Delete"><FaTrash className="text-red-600" /></button>
                <button
                  className="p-2 rounded hover:bg-green-100 text-green-700 font-semibold border border-green-200"
                  title="View More Details"
                  onClick={() => handleViewMore(gig)}
                >
                  View More Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <GigDetailsModal gig={selectedGig} open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default GigTable; 