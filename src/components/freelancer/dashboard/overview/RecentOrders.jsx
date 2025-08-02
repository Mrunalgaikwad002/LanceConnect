import React from "react";

const orders = [
  { client: "John Doe", gig: "Logo Design", status: "In Progress", due: "2 Days Left" },
  { client: "Sara Lee", gig: "SEO Audit", status: "Delivered", due: "Delivered" },
];

const statusColors = {
  "In Progress": "bg-yellow-100 text-yellow-700",
  "Delivered": "bg-green-100 text-green-700",
  "Completed": "bg-blue-100 text-blue-700",
  "Pending": "bg-gray-100 text-gray-700",
};

const RecentOrders = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Orders</h3>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Client</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Gig Title</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Due Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o, i) => (
            <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 px-4 text-sm font-semibold text-gray-700">{o.client}</td>
              <td className="py-3 px-4 text-sm text-gray-700">{o.gig}</td>
              <td className="py-3 px-4">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[o.status] || "bg-gray-100 text-gray-700"}`}>
                  {o.status}
                </span>
              </td>
              <td className="py-3 px-4 text-sm text-gray-700">{o.due}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default RecentOrders; 