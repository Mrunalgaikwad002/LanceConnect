import React from "react";
import SummaryCards from "./SummaryCards";
import EarningsGraph from "./EarningsGraph";
import PaymentHistory from "./PaymentHistory";
import WithdrawalSection from "./WithdrawalSection";
import TipsPanel from "./TipsPanel";

const Earnings = () => {
  return (
    <div className="space-y-6">
      <SummaryCards />
      <EarningsGraph />
      <PaymentHistory />
      <WithdrawalSection />
      <TipsPanel />
    </div>
  );
};

export default Earnings; 