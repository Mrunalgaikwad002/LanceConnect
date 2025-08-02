import React, { useState } from "react";
import GigCardList from "./GigCardList";
import CreateGigModal from "./CreateGigModal";

const MyGigs = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newGig, setNewGig] = useState(null);

  const handleCreateGig = (newGigData) => {
    setNewGig(newGigData);
    setCreateModalOpen(false);
  };

  const handleGigAdded = () => {
    setNewGig(null); // Reset after gig is added to list
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">My Gigs</h3>
        <button 
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-semibold"
          onClick={() => setCreateModalOpen(true)}
        >
          <span className="text-lg">&#43;</span>
          <span>Create New Gig</span>
        </button>
      </div>
      <GigCardList newGig={newGig} onGigAdded={handleGigAdded} />
      <CreateGigModal 
        open={createModalOpen} 
        onClose={() => setCreateModalOpen(false)} 
        onSave={handleCreateGig}
      />
    </div>
  );
};

export default MyGigs; 