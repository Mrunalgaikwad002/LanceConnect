import React, { useEffect, useState } from "react";
import GigForm from "./GigForm";

const GigList = () => {
  const [gigs, setGigs] = useState([]);
  const [editingGig, setEditingGig] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch("http://localhost:5000/api/gigs")
      .then(res => res.json())
      .then(data => {
        console.log("Fetched gigs:", data);
        setGigs(data); // <-- Show all gigs, no filter
      });
  }, [user.id]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this gig?")) return;
    await fetch(`http://localhost:5000/api/gigs/${id}`, {
      method: "DELETE",
      headers: { "x-auth-token": token }
    });
    setGigs(gigs.filter(gig => gig._id !== id));
  };

  const handleEdit = (gig) => {
    setEditingGig(gig);
    setShowForm(true);
  };

  const handleFormSuccess = (newGig) => {
    setShowForm(false);
    setEditingGig(null);
    fetch("http://localhost:5000/api/gigs")
      .then(res => res.json())
      .then(data => setGigs(data.filter(gig => {
        return (gig.user && (gig.user._id || gig.user)) === user.id;
      })));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Gigs</h2>
      <button
        className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded"
        onClick={() => { setEditingGig(null); setShowForm(true); }}
      >
        + Create New Gig
      </button>
      {showForm && (
        <GigForm
          gig={editingGig}
          onSuccess={handleFormSuccess}
          onCancel={() => { setShowForm(false); setEditingGig(null); }}
        />
      )}
      <div className="grid gap-4">
        {gigs.map(gig => (
          <div key={gig._id} className="border p-4 rounded shadow flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="font-semibold text-lg">{gig.title}</h3>
              <p className="text-gray-600">{gig.desc}</p>
              <p className="text-indigo-700 font-bold">₹{gig.price}</p>
              <p className="text-sm text-gray-400">Category: {gig.category}</p>
            </div>
            <div className="flex gap-2 mt-2 md:mt-0">
              <button className="px-3 py-1 bg-yellow-400 rounded" onClick={() => handleEdit(gig)}>Edit</button>
              <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={() => handleDelete(gig._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GigList; 