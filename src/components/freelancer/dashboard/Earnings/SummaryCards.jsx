import React from "react";
import { FaRupeeSign, FaCheck, FaClock, FaDownload, FaCalendar } from "react-icons/fa";

const SummaryCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-green-700">Total Earnings</p>
            <p className="text-2xl font-bold text-green-900">₹1,25,000</p>
          </div>
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
            <FaRupeeSign className="text-white text-xl" />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-blue-700">Available for Withdrawal</p>
            <p className="text-2xl font-bold text-blue-900">₹30,000</p>
          </div>
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
            <FaCheck className="text-white text-xl" />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-yellow-700">Pending Clearance</p>
            <p className="text-2xl font-bold text-yellow-900">₹10,000</p>
            <p className="text-xs text-yellow-600">14-day hold</p>
          </div>
          <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
            <FaClock className="text-white text-xl" />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-purple-700">Withdrawn</p>
            <p className="text-2xl font-bold text-purple-900">₹85,000</p>
          </div>
          <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
            <FaDownload className="text-white text-xl" />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-orange-700">This Month</p>
            <p className="text-2xl font-bold text-orange-900">₹15,000</p>
          </div>
          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
            <FaCalendar className="text-white text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards; 