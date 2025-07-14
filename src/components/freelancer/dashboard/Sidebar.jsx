import React from "react";

const menu = [
  { label: "Overview", key: "overview" },
  { label: "My Gigs", key: "gigs" },
  { label: "Orders", key: "orders" },
  { label: "Messages", key: "messages" },
  { label: "Reviews", key: "reviews" },
  { label: "Earnings", key: "earnings" },
  { label: "Settings", key: "settings" },
  { label: "Logout", key: "logout" },
];

const Sidebar = ({ active, onSelect }) => (
  <div className="w-64 min-h-screen bg-darkblue text-offwhite flex flex-col py-8 px-4">
    <h2 className="text-2xl font-bold mb-8 text-center">Freelancer</h2>
    <nav className="flex-1">
      {menu.map(item => (
        <button
          key={item.key}
          className={`w-full text-left px-4 py-2 rounded mb-2 transition ${
            active === item.key ? "bg-steelblue text-offwhite font-semibold" : "hover:bg-lightsteel hover:text-darkblue"
          }`}
          onClick={() => onSelect(item.key)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  </div>
);

export default Sidebar; 