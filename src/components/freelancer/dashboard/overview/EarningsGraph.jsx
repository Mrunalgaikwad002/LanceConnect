import React from "react";

const earnings = [
  { month: "June", amount: 12000 },
  { month: "July", amount: 18000 },
];

const EarningsGraph = () => (
  <div>
    <h2 className="font-semibold mb-2">Earnings Graph</h2>
    <div className="bg-white rounded shadow p-4">
      <div className="flex items-end gap-4 h-32">
        {earnings.map((e, i) => (
          <div key={i} className="flex flex-col items-center flex-1">
            <div
              className="bg-steelblue w-8 rounded-t"
              style={{ height: `${e.amount / 200}px` }}
              title={`₹${e.amount}`}
            ></div>
            <div className="mt-2 text-xs text-gray-500">{e.month}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default EarningsGraph; 