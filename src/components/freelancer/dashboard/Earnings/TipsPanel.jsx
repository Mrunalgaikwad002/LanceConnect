import React from "react";

const TipsPanel = () => {
  return (
    <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
      <h4 className="font-semibold text-blue-900 mb-3">💡 Important Information</h4>
      <div className="space-y-2 text-sm text-blue-800">
        <p>• Funds are held for 14 days after order completion for security</p>
        <p>• Add your bank details to enable withdrawals</p>
        <p>• Minimum withdrawal amount is ₹500</p>
        <p>• Withdrawals are processed on business days only</p>
      </div>
    </div>
  );
};

export default TipsPanel; 