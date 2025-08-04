import React from "react";
import { FaComments, FaReply, FaPaperclip, FaStar, FaCircle, FaFolder } from "react-icons/fa";

const MessageList = ({ 
  conversations, 
  onOpenChat, 
  onReply, 
  onShareFiles, 
  onViewFiles,
  formatTime 
}) => {
  const avatarColors = [
    "bg-red-500",
    "bg-blue-500", 
    "bg-green-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500"
  ];

  if (conversations.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">💬</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No messages found</h3>
        <p className="text-gray-600">Try adjusting your search terms or status filter.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
      <div className="divide-y divide-gray-200">
        {conversations.map((conversation, index) => (
          <div key={conversation.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-start space-x-4">
              {/* Avatar with Online Status */}
              <div className="relative flex-shrink-0">
                <div className={`w-12 h-12 rounded-full ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-white font-semibold`}>
                  {conversation.freelancer.avatar}
                </div>
                {conversation.freelancer.online && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <FaCircle className="h-2 w-2 text-white" />
                  </div>
                )}
              </div>

              {/* Message Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-medium text-gray-900">
                      {conversation.freelancer.name}
                    </h4>
                    <div className="flex items-center text-xs text-gray-500">
                      <FaStar className="h-3 w-3 text-yellow-400 mr-1" />
                      {conversation.freelancer.rating}
                    </div>
                    {conversation.freelancer.online && (
                      <span className="text-xs text-green-600 font-medium">Online</span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatTime(conversation.lastMessage.timestamp)}
                  </span>
                </div>

                {/* Gig Title */}
                <p className="text-sm text-blue-600 font-medium mb-2">
                  {conversation.gig.title}
                </p>

                                 {/* Last Message Preview */}
                 <div className="flex items-start justify-between">
                   <div className="flex-1 min-w-0">
                     <p className={`text-sm ${conversation.lastMessage.unread ? 'font-semibold text-gray-900' : 'text-gray-600'} truncate`}>
                       {conversation.lastMessage.sender === 'client' && (
                         <span className="text-blue-600 mr-1">You:</span>
                       )}
                       {conversation.lastMessage.text}
                     </p>
                     <div className="flex items-center mt-1 space-x-2">
                       {conversation.lastMessage.unread && (
                         <div className="flex items-center">
                           <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                           <span className="text-xs text-blue-600 font-medium">New message</span>
                         </div>
                       )}
                       {conversation.sharedFiles && conversation.sharedFiles.length > 0 && (
                         <div className="flex items-center">
                           <FaFolder className="h-3 w-3 text-green-500 mr-1" />
                           <span className="text-xs text-green-600 font-medium">
                             {conversation.sharedFiles.length} file{conversation.sharedFiles.length !== 1 ? 's' : ''}
                           </span>
                         </div>
                       )}
                     </div>
                   </div>
                 </div>
              </div>

                             {/* Action Buttons */}
               <div className="flex flex-col space-y-2">
                 {/* Open Chat Button */}
                 <button
                   onClick={() => onOpenChat(conversation.id)}
                   className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                 >
                   <FaComments className="h-3 w-3 mr-1" />
                   Chat
                 </button>

                 {/* Reply Button */}
                 <button
                   onClick={() => onReply(conversation.id)}
                   className="inline-flex items-center px-3 py-1.5 border border-blue-300 shadow-sm text-xs font-medium rounded text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                 >
                   <FaReply className="h-3 w-3 mr-1" />
                   Reply
                 </button>

                 {/* Share Files Button */}
                 <button
                   onClick={() => onShareFiles(conversation.id)}
                   className="inline-flex items-center px-3 py-1.5 border border-green-300 shadow-sm text-xs font-medium rounded text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                 >
                   <FaPaperclip className="h-3 w-3 mr-1" />
                   Files
                 </button>

                 {/* View Files Button - Only show if there are shared files */}
                 {conversation.sharedFiles && conversation.sharedFiles.length > 0 && (
                   <button
                     onClick={() => onViewFiles(conversation.id)}
                     className="inline-flex items-center px-3 py-1.5 border border-purple-300 shadow-sm text-xs font-medium rounded text-purple-700 bg-purple-50 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                   >
                     <FaFolder className="h-3 w-3 mr-1" />
                     View Files
                   </button>
                 )}
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageList; 