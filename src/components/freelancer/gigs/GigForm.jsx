import React, { useState } from "react";

const GigForm = ({ gig, onSuccess, onCancel }) => {
  const [form, setForm] = useState(
    gig || { title: "", desc: "", price: "", category: "", images: [] }
  );
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const method = gig ? "PUT" : "POST";
    const url = gig
      ? `http://localhost:5000/api/gigs/${gig._id}`
      : "http://localhost:5000/api/gigs";
    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token
        },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        onSuccess(await res.json());
      } else {
        const data = await res.json();
        setError(data.msg || "Error saving gig");
      }
    } catch {
      setError("Server error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded mb-4">
      <div className="mb-2">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full px-3 py-2 border rounded"
          value={form.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-2">
        <textarea
          name="desc"
          placeholder="Description"
          className="w-full px-3 py-2 border rounded"
          value={form.desc}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-2">
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="w-full px-3 py-2 border rounded"
          value={form.price}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-2">
        <input
          type="text"
          name="category"
          placeholder="Category"
          className="w-full px-3 py-2 border rounded"
          value={form.category}
          onChange={handleChange}
          required
        />
      </div>
      {/* For simplicity, images as comma-separated URLs */}
      <div className="mb-2">
        <input
          type="text"
          name="images"
          placeholder="Image URLs (comma separated)"
          className="w-full px-3 py-2 border rounded"
          value={form.images}
          onChange={e => setForm({ ...form, images: e.target.value.split(",") })}
        />
      </div>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="flex gap-2">
        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">
          {gig ? "Update" : "Create"}
        </button>
        <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default GigForm; 