import React from "react";

const messages = [
  { client: "John Doe", message: "Thanks for the update.", date: "Today", read: false },
  { client: "Sara Lee", message: "Can you revise this?", date: "Yesterday", read: true },
  { client: "Ravi Kumar", message: "Payment sent for the last order.", date: "2 days ago", read: false },
  { client: "Priya Singh", message: "Great work on the logo!", date: "3 days ago", read: true },
  { client: "Amit Patel", message: "When can you deliver?", date: "4 days ago", read: true },
  { client: "Nina Brown", message: "Please check the new requirements.", date: "5 days ago", read: false },
  { client: "Vikas Sharma", message: "Looking forward to the delivery.", date: "6 days ago", read: true },
];

// Color array for consistent avatar colors
const avatarColors = [
  "bg-blue-500",
  "bg-green-500", 
  "bg-purple-500",
  "bg-orange-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-red-500"
];

const RecentMessages = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Messages</h3>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Client</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Last Message</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((m, i) => (
            <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="flex items-center gap-2 py-3 px-4 text-sm text-gray-700">
                <span
                  className={`inline-flex items-center justify-center h-8 w-8 rounded-full font-bold text-white ${avatarColors[i % avatarColors.length]}`}
                >
                  {m.client[0]}
                </span>
                <span className="font-semibold">{m.client}</span>
                {!m.read && (
                  <span
                    className="ml-2 h-2 w-2 rounded-full"
                    style={{ background: "#4CAF50", display: "inline-block" }}
                    title="Unread"
                  ></span>
                )}
              </td>
              <td className="py-3 px-4 text-sm text-gray-700 italic">"{m.message}"</td>
              <td className="py-3 px-4 text-sm text-gray-700">{m.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default RecentMessages; 