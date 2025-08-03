import React, { useState } from "react";
import Sidebar from "./dashboard/Sidebar";
import Overview from "./dashboard/overview/Overview";
import MyGigs from "./dashboard/MyGigs";
import Orders from "./dashboard/Orders";
import Messages from "./dashboard/Messages";
import Reviews from "./dashboard/Reviews";
import Earnings from "./dashboard/Earnings";
import Settings from "./dashboard/Settings";

const FreelancerDashboard = () => {
  const [section, setSection] = useState("overview");

  const renderSection = () => {
    switch (section) {
      case "overview":
        return <Overview />;
      case "mygigs":
        return <MyGigs />;
      case "orders":
        return <Orders />;
      case "messages":
        return <Messages />;
      case "reviews":
        return <Reviews />;
      case "earnings":
        return <Earnings />;
      case "settings":
        return <Settings />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="flex min-h-screen bg-offwhite">
      <div className="sticky top-0 h-screen">
        <Sidebar active={section} onSelect={setSection} />
      </div>
      <main className="flex-1 p-8 bg-white overflow-y-auto">
        {renderSection()}
      </main>
    </div>
  );
};

export default FreelancerDashboard; 