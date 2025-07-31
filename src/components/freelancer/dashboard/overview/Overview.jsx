import React from "react";
import SummaryCards from "./SummaryCards";
import RecentOrders from "./RecentOrders";
import RecentMessages from "./RecentMessages";
import EarningsGraph from "./EarningsGraph";
import RecentActivity from "./RecentActivity";

const Overview = () => (
  <div>
    <SummaryCards />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      <RecentActivity />
      <RecentMessages />
    </div>
    <div className="mt-8">
      <RecentOrders />
    </div>
    <div className="mt-8">
      <EarningsGraph />
    </div>
  </div>
);

export default Overview;