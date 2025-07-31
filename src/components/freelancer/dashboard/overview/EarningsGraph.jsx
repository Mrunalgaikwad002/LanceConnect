import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", earnings: 8000 },
  { month: "Feb", earnings: 12000 },
  { month: "Mar", earnings: 15000 },
  { month: "Apr", earnings: 11000 },
  { month: "May", earnings: 17000 },
  { month: "Jun", earnings: 14000 },
  { month: "Jul", earnings: 18000 },
];

const EarningsGraph = () => (
  <div className="bg-white rounded-xl shadow-md p-6">
    <h2 className="text-xl font-bold mb-4 text-black">Earnings Over Time</h2>
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
        <XAxis dataKey="month" stroke="#4B6A7D" />
        <YAxis tickFormatter={v => `₹${v / 1000}k`} stroke="#4B6A7D" />
        <Tooltip formatter={v => `₹${v}`} contentStyle={{ background: "#fff", border: "1px solid #4B6A7D" }} />
        <Line type="monotone" dataKey="earnings" stroke="#22c55e" strokeWidth={3} dot={{ r: 5, fill: "#22c55e" }} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default EarningsGraph; 