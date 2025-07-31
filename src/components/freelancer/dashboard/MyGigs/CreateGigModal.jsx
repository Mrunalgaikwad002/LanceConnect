import React, { useState } from "react";

const categories = [
  "Web Development",
  "Graphic Design",
  "Writing",
  "SEO",
  "Marketing",
  "Video & Animation",
  "Admin Support",
  "Translation",
  "Music & Audio",
];

const CreateGigModal = ({ open, onClose, onSave }) => {
  const [form, setForm] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
    deliveryTime: "",
    revisions: "",
    tags: "",
  });

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newGig = {
      ...form,
      tags: form.tags.split(",").map(tag => tag.trim()),
      status: "Draft",
      orders: 0,
      rating: 0,
      reviews: 0,
      views: 0,
      samples: [],
    };
    onSave(newGig);
    setForm({
      title: "",
      category: "",
      price: "",
      description: "",
      deliveryTime: "",
      revisions: "",
      tags: "",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl font-bold">&times;</button>
        <h3 className="text-2xl font-bold mb-4 text-black">Create New Gig</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            className="border rounded px-3 py-2"
            placeholder="Gig Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <select
            name="category"
            className="border rounded px-3 py-2"
            value={form.category}
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
            placeholder="Price Range (e.g., ₹500 - ₹1500)"
            value={form.price}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            className="border rounded px-3 py-2"
            placeholder="Gig Description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            required
          />
          <input
            type="text"
            name="deliveryTime"
            className="border rounded px-3 py-2"
            placeholder="Delivery Time (e.g., 2 days)"
            value={form.deliveryTime}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="revisions"
            className="border rounded px-3 py-2"
            placeholder="Number of Revisions (e.g., 3)"
            value={form.revisions}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="tags"
            className="border rounded px-3 py-2"
            placeholder="Tags (comma separated, e.g., logo, design, branding)"
            value={form.tags}
            onChange={handleChange}
            required
          />
          <div className="flex gap-2 mt-4">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700">Create Gig</button>
            <button type="button" className="px-4 py-2 bg-gray-200 rounded font-semibold" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGigModal; 