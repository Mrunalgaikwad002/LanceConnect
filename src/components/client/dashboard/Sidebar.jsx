import React from "react";

const menu = [
  { key: "overview", label: "Overview" },
  { key: "browsegigs", label: "Browse Gigs" },
  { key: "myorders", label: "My Orders" },
  { key: "messages", label: "Messages" },
 
  { key: "payments", label: "Payments" },
  { key: "settings", label: "Settings" },
  { key: "logout", label: "Logout" },
];

const Sidebar = ({ active, onSelect }) => {
  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    // Redirect to login page
    window.location.href = "/login";
  };

  return (
    <div className="w-64 bg-darkblue text-offwhite flex flex-col py-8 px-4 sticky top-0 h-screen">
      <h2 className="text-2xl font-bold mb-8 text-center">Client</h2>
      <nav className="flex-1">
        {menu.map(item => (
          <button
            key={item.key}
            className={`w-full text-left px-4 py-2 rounded mb-2 transition ${
              active === item.key ? "bg-steelblue text-offwhite font-semibold" : "hover:bg-lightsteel hover:text-darkblue"
            }`}
            onClick={() => {
              if (item.key === "logout") {
                handleLogout();
              } else {
                onSelect(item.key);
              }
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar; 