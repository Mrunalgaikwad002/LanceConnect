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
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-black">My Gigs</h2>
        <button 
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 font-semibold"
          onClick={() => setCreateModalOpen(true)}
        >
          <span className="text-lg">&#43;</span> Create New Gig
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