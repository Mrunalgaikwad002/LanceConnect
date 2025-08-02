import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const EarningsGraph = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("30");

  // Mock data for earnings graph
  const earningsData = [
    { month: "Jan", earnings: 12000, withdrawals: 8000 },
    { month: "Feb", earnings: 15000, withdrawals: 10000 },
    { month: "Mar", earnings: 18000, withdrawals: 12000 },
    { month: "Apr", earnings: 14000, withdrawals: 9000 },
    { month: "May", earnings: 22000, withdrawals: 15000 },
    { month: "Jun", earnings: 25000, withdrawals: 18000 },
    { month: "Jul", earnings: 28000, withdrawals: 20000 },
    { month: "Aug", earnings: 32000, withdrawals: 22000 },
    { month: "Sep", earnings: 29000, withdrawals: 19000 },
    { month: "Oct", earnings: 35000, withdrawals: 25000 },
    { month: "Nov", earnings: 38000, withdrawals: 28000 },
    { month: "Dec", earnings: 42000, withdrawals: 30000 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Earnings Overview</h3>
        <div className="flex items-center space-x-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 3 months</option>
            <option value="365">This Year</option>
          </select>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={earningsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#4B6A7D" />
          <YAxis tickFormatter={v => `₹${v / 1000}k`} stroke="#4B6A7D" />
          <Tooltip 
            formatter={v => `₹${v}`} 
            contentStyle={{ background: "#fff", border: "1px solid #4B6A7D" }}
          />
          <Line 
            type="monotone" 
            dataKey="earnings" 
            stroke="#4CAF50" 
            strokeWidth={3} 
            dot={{ r: 5, fill: "#4CAF50" }}
            name="Earnings"
          />
          <Line 
            type="monotone" 
            dataKey="withdrawals" 
            stroke="#FF9800" 
            strokeWidth={3} 
            dot={{ r: 5, fill: "#FF9800" }}
            name="Withdrawals"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EarningsGraph; 