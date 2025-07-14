import React from "react";

const orders = [
  { client: "John Doe", gig: "Logo Design", status: "In Progress", due: "2 Days Left" },
  { client: "Sara Lee", gig: "SEO Audit", status: "Delivered", due: "Delivered" },
];

const statusColors = {
  "In Progress": "bg-yellow-100 text-yellow-800",
  "Delivered": "bg-green-100 text-green-800",
  "Completed": "bg-blue-100 text-blue-800",
  "Pending": "bg-gray-100 text-gray-800",
};

const RecentOrders = () => (
  <div>
    <h2 className="font-semibold mb-2">Recent Orders</h2>
    <div className="bg-white rounded-xl shadow-lg p-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-steelblue uppercase text-xs">
            <th className="py-2">Client</th><th>Gig Title</th><th>Status</th><th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o, i) => (
            <tr key={i} className="border-t hover:bg-offwhite transition">
              <td className="py-2 font-semibold">{o.client}</td>
              <td>{o.gig}</td>
              <td><span className={`px-2 py-1 rounded-full text-xs font-bold ${statusColors[o.status] || "bg-gray-100 text-gray-800"}`}>{o.status}</span></td>
              <td>{o.due}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default RecentOrders; 