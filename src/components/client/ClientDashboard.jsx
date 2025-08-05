import React, { useState } from "react";
import Sidebar from "./dashboard/Sidebar";
import Overview from "./dashboard/overview/Overview";
import BrowseGigs from "./dashboard/browseGigs";
import MyOrders from "./dashboard/myOrders";
import Messages from "./dashboard/messages";
// import Reviews from "./dashboard/Reviews";
import Payments from "./dashboard/payments";
import Settings from "./dashboard/settings";

const ClientDashboard = () => {
  const [section, setSection] = useState("overview");

  const renderSection = () => {
    switch (section) {
      case "overview":
        return <Overview />;
      case "browsegigs":
        return <BrowseGigs />;
      case "myorders":
        return <MyOrders />;
      case "messages":
        return <Messages />;
    //   case "reviews":
    //     return <Reviews />;
      case "payments":
        return <Payments />;
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

export default ClientDashboard; 