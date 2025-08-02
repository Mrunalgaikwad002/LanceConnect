import React from "react";

const activities = [
  { desc: "You received a new order for 'Logo Design'", time: "1 hour ago" },
  { desc: "Order #1234 marked as Delivered", time: "3 hours ago" },
  { desc: "Client Sara Lee left a 5-star review on 'SEO Audit'", time: "5 hours ago" },
  { desc: "Payment of ₹2,500 received for 'Website Banner'", time: "Yesterday" },
  { desc: "New message from John Doe", time: "2 days ago" },
  { desc: "Your gig 'Business Card Design' was published", time: "3 days ago" },
];

const RecentActivity = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
    {activities.map((a, i) => (
      <div key={i} className={i !== activities.length - 1 ? "mb-4 pb-4 border-b border-gray-100" : ""}>
        <div className="text-sm font-semibold text-gray-700">{a.desc}</div>
        <div className="text-xs text-gray-500 mt-1">{a.time}</div>
      </div>
    ))}
  </div>
);

export default RecentActivity; 