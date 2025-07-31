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

const RecentMessages = () => (
  <div>
    <h2 className="text-xl font-bold mb-4 text-black">Recent Messages</h2>
    <div className="bg-white rounded-xl shadow-lg p-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-base font-bold text-black uppercase">
            <th className="py-2">Client</th><th>Last Message</th><th>Date</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((m, i) => (
            <tr key={i} className="border-t hover:bg-offwhite transition">
              <td className="flex items-center gap-2 py-2 text-gray-800">
                <span
                  className="inline-flex items-center justify-center h-8 w-8 rounded-full font-bold"
                  style={{ background: "#546E7A", color: "#fff" }}
                >
                  {m.client[0]}
                </span>
                {m.client}
                {!m.read && (
                  <span
                    className="ml-2 h-2 w-2 rounded-full"
                    style={{ background: "#4CAF50", display: "inline-block" }}
                    title="Unread"
                  ></span>
                )}
              </td>
              <td className="italic text-gray-500">"{m.message}"</td>
              <td className="text-gray-500">{m.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default RecentMessages; 