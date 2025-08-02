import React from "react";
import SummaryCards from "./SummaryCards";
import RecentOrders from "./RecentOrders";
import RecentMessages from "./RecentMessages";
import EarningsGraph from "./EarningsGraph";
import RecentActivity from "./RecentActivity";

const Overview = () => (
  <div className="space-y-6">
    <SummaryCards />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <RecentActivity />
      <RecentMessages />
    </div>
    <RecentOrders />
    <EarningsGraph />
  </div>
);

export default Overview;