import React from "react";

const RecentMessages = () => {
  const recentMessages = [
    {
      id: 1,
      freelancer: "John Designer",
      gigTitle: "Logo Design",
      message: "I've started working on your logo design. Here's the first draft...",
      time: "2 hours ago",
      unread: true
    },
    {
      id: 2,
      freelancer: "Sarah Developer",
      gigTitle: "Website Development",
      message: "The website is ready for review. Please check the demo link...",
      time: "1 day ago",
      unread: false
    },
    {
      id: 3,
      freelancer: "Mike Writer",
      gigTitle: "Content Writing",
      message: "I've completed the first article. Would you like to see it?",
      time: "2 days ago",
      unread: false
    },
    {
      id: 4,
      freelancer: "Lisa Designer",
      gigTitle: "UI/UX Design",
      message: "I need some clarification on the design requirements...",
      time: "3 days ago",
      unread: true
    }
  ];

  const avatarColors = [
    "bg-red-500",
    "bg-blue-500", 
    "bg-green-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500"
  ];

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Messages</h3>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {recentMessages.map((message, index) => (
          <div key={message.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
            <div className={`w-10 h-10 rounded-full ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-white font-semibold text-sm flex-shrink-0`}>
              {message.freelancer.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {message.freelancer}
                </p>
                <span className="text-xs text-gray-500">{message.time}</span>
              </div>
              <p className="text-xs text-gray-600 mb-1">{message.gigTitle}</p>
              <p className="text-sm text-gray-700 truncate">{message.message}</p>
            </div>
            {message.unread && (
              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentMessages; 