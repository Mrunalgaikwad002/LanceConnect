import React from "react";
import SummaryCards from "./overview/SummaryCards";
import RecentOrders from "./overview/RecentOrders";
import RecentMessages from "./overview/RecentMessages";
import EarningsGraph from "./overview/EarningsGraph";

const Overview = () => (
  <div>
    <SummaryCards />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      <RecentOrders />
      <RecentMessages />
    </div>
    <div className="mt-8">
      <EarningsGraph />
    </div>
  </div>
);

export default Overview; 