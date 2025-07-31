import React from "react";

const categories = [
  "All Categories",
  "Web Development",
  "Graphic Design",
  "Writing",
  "SEO",
  "Marketing",
];

const GigFilters = ({ filters, onFilterChange }) => {
  return (
    <div className="flex flex-wrap gap-4 items-center mb-6">
      <input
        type="text"
        placeholder="Search gigs..."
        className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200 min-w-[180px]"
        value={filters.search}
        onChange={e => onFilterChange({ ...filters, search: e.target.value })}
      />
      <select
        className="px-3 py-2 border rounded min-w-[120px]"
        value={filters.status}
        onChange={e => onFilterChange({ ...filters, status: e.target.value })}
      >
        <option value="all">All Status</option>
        <option value="Active">Active</option>
        <option value="Paused">Paused</option>
        <option value="Draft">Draft</option>
      </select>
      <select
        className="px-3 py-2 border rounded min-w-[150px]"
        value={filters.category}
        onChange={e => onFilterChange({ ...filters, category: e.target.value })}
      >
        {categories.map(cat => (
          <option key={cat} value={cat === "All Categories" ? "all" : cat}>{cat}</option>
        ))}
      </select>
      <select
        className="px-3 py-2 border rounded min-w-[140px]"
        value={filters.sort}
        onChange={e => onFilterChange({ ...filters, sort: e.target.value })}
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="rating">Highest Rated</option>
        <option value="orders">Most Orders</option>
        <option value="priceAsc">Price ↑</option>
        <option value="priceDesc">Price ↓</option>
      </select>
    </div>
  );
};

export default GigFilters; 