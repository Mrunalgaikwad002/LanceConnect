import React, { useState } from "react";
import { FaBuilding } from "react-icons/fa";

const WithdrawalSection = () => {
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState("");

  const handleWithdrawal = () => {
    if (withdrawalAmount && parseFloat(withdrawalAmount) > 0) {
      // Handle withdrawal logic here
      console.log(`Withdrawing ₹${withdrawalAmount}`);
      setShowWithdrawalModal(false);
      setWithdrawalAmount("");
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Withdraw Earnings</h3>
          <button
            onClick={() => setShowWithdrawalModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            <FaBuilding className="text-sm" />
            <span>Withdraw Now</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Available for Withdrawal</h4>
            <p className="text-2xl font-bold text-green-600">₹30,000</p>
            <p className="text-sm text-gray-600 mt-1">Ready to transfer to your bank account</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Payment Method</h4>
            <div className="flex items-center space-x-2">
              <FaBuilding className="text-blue-500" />
              <span className="text-sm text-gray-700">HDFC Bank - ****1234</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">Withdrawals take 1-3 business days</p>
          </div>
        </div>
      </div>

      {/* Withdrawal Modal */}
      {showWithdrawalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Withdraw Funds</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Amount: ₹30,000
              </label>
              <input
                type="number"
                placeholder="Enter amount to withdraw"
                value={withdrawalAmount}
                onChange={(e) => setWithdrawalAmount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                max="30000"
                min="500"
              />
            </div>
            
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Payment Method:</strong> HDFC Bank - ****1234
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Processing Time:</strong> 1-3 business days
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleWithdrawal}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Confirm Withdrawal
              </button>
              <button
                onClick={() => setShowWithdrawalModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WithdrawalSection; 