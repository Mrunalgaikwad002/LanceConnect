import React from "react";

const mockClient = {
  name: "John Doe",
  email: "john.doe@email.com",
  joined: "Jan 2022",
  orders: 5,
  rating: 4.8,
};

const GigDetailsModal = ({ gig, open, onClose }) => {
  if (!open || !gig) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl font-bold">&times;</button>
        <h3 className="text-2xl font-bold mb-2 text-black">{gig.title}</h3>
        <div className="mb-2 text-gray-600">{gig.description} <br /><span className="block mt-2 text-gray-500">This project involves creating a unique, professional logo that reflects the client's brand identity. The client expects multiple concepts, color options, and a final delivery in various formats. Please ensure the design is modern, scalable, and suitable for both print and digital use. Communication with the client is key for feedback and revisions.</span></div>
        <div className="mb-4 p-3 bg-offwhite rounded">
          <div className="font-semibold text-gray-700 mb-1">Client Details</div>
          <div className="text-sm text-gray-800">Name: {mockClient.name}</div>
          <div className="text-sm text-gray-800">Email: {mockClient.email}</div>
          <div className="text-sm text-gray-800">Joined: {mockClient.joined}</div>
          <div className="text-sm text-gray-800">Total Orders: {mockClient.orders}</div>
          <div className="text-sm text-gray-800">Rating: ⭐{mockClient.rating}</div>
        </div>
        <div className="mb-2">
          <span className="font-semibold text-gray-700">Category:</span> {gig.category}
        </div>
        <div className="mb-2">
          <span className="font-semibold text-gray-700">Tags:</span> {gig.tags && gig.tags.length ? gig.tags.join(", ") : "-"}
        </div>
        <div className="mb-2">
          <span className="font-semibold text-gray-700">Delivery Time:</span> {gig.deliveryTime || "3 days"}
        </div>
        <div className="mb-2">
          <span className="font-semibold text-gray-700">Revisions Included:</span> {gig.revisions || 2}
        </div>
        <div className="mb-2">
          <span className="font-semibold text-gray-700">Samples:</span>
          <div className="flex gap-2 mt-2">
            {(gig.samples || ["https://via.placeholder.com/60", "https://via.placeholder.com/60"]).map((img, i) => (
              <img key={i} src={img} alt="Sample" className="w-16 h-16 rounded object-cover border" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigDetailsModal; 