import React, { useState, useEffect } from "react";

const categories = [
  "Web Development",
  "Graphic Design",
  "Writing",
  "SEO",
  "Marketing",
];

const statuses = ["Active", "Paused", "Draft"];

const EditGigModal = ({ gig, open, onClose, onSave }) => {
  const [form, setForm] = useState(gig || {});

  useEffect(() => {
    setForm(gig || {});
  }, [gig]);

  if (!open || !gig) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl font-bold">&times;</button>
        <h3 className="text-2xl font-bold mb-4 text-black">Edit Gig</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            className="border rounded px-3 py-2"
            placeholder="Title"
            value={form.title || ""}
            onChange={handleChange}
            required
          />
          <select
            name="category"
            className="border rounded px-3 py-2"
            value={form.category || ""}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <input
            type="text"
            name="price"
            className="border rounded px-3 py-2"
            placeholder="Price Range"
            value={form.price || ""}
            onChange={handleChange}
            required
          />
          <select
            name="status"
            className="border rounded px-3 py-2"
            value={form.status || ""}
            onChange={handleChange}
            required
          >
            <option value="">Select Status</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <textarea
            name="description"
            className="border rounded px-3 py-2"
            placeholder="Description"
            value={form.description || ""}
            onChange={handleChange}
            rows={3}
            required
          />
          <div className="flex gap-2 mt-4">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700">Save</button>
            <button type="button" className="px-4 py-2 bg-gray-200 rounded font-semibold" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditGigModal; 