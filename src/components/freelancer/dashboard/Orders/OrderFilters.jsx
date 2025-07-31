import React from "react";

const OrderFilters = ({ filters, onFilterChange }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[280px]">
          <input 
            type="text" 
            placeholder="Search by Order ID, Gig Title, or Client Name..." 
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all duration-200"
            value={filters.search}
            onChange={e => onFilterChange({ ...filters, search: e.target.value })}
          />
        </div>
        
        <div className="flex gap-3">
          <select 
            className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all duration-200 min-w-[160px]"
            value={filters.status}
            onChange={e => onFilterChange({ ...filters, status: e.target.value })}
          >
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Delivered">Delivered</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          
          <select 
            className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all duration-200 min-w-[180px]"
            value={filters.sort}
            onChange={e => onFilterChange({ ...filters, sort: e.target.value })}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Value</option>
            <option value="delivery">Delivery Time</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default OrderFilters; 