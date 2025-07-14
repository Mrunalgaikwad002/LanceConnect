import React from "react";

const messages = [
  { client: "John Doe", message: "Thanks for the update.", date: "Today" },
  { client: "Sara Lee", message: "Can you revise this?", date: "Yesterday" },
];

const avatarColors = ["bg-steelblue", "bg-darkblue"];

const RecentMessages = () => (
  <div>
    <h2 className="font-semibold mb-2">Recent Messages</h2>
    <div className="bg-white rounded-xl shadow-lg p-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-steelblue uppercase text-xs">
            <th className="py-2">Client</th><th>Last Message</th><th>Date</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((m, i) => (
            <tr key={i} className="border-t hover:bg-offwhite transition">
              <td className="flex items-center gap-2 py-2">
                <span className={`inline-flex items-center justify-center h-8 w-8 rounded-full text-white font-bold ${avatarColors[i % avatarColors.length]}`}>{m.client[0]}</span>
                {m.client}
              </td>
              <td>"{m.message}"</td>
              <td>{m.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default RecentMessages; 