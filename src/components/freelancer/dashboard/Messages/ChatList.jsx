import React, { useState } from "react";
import { FaUser, FaThumbtack, FaBell, FaBellSlash, FaTrash, FaEllipsisV } from "react-icons/fa";

const ChatList = ({ chats, selectedChat, onChatSelect, onPinChat, onMuteChat, onDeleteChat }) => {
  const [showMenu, setShowMenu] = useState(null);

  const formatTime = (timestamp) => {
    return timestamp;
  };

  // const getFileIcon = (fileType) => {
  //   if (fileType === 'pdf') return '📄';
  //   if (fileType === 'image') return '🖼️';
  //   if (fileType === 'document') return '📝';
  //   return '📎';
  // };

  const handleMenuToggle = (chatId, e) => {
    e.stopPropagation();
    setShowMenu(showMenu === chatId ? null : chatId);
  };

  const handleAction = (action, chatId, e) => {
    e.stopPropagation();
    setShowMenu(null);
    
    switch (action) {
      case 'pin':
        onPinChat(chatId);
        break;
      case 'mute':
        onMuteChat(chatId);
        break;
      case 'delete':
        if (window.confirm('Are you sure you want to delete this conversation?')) {
          onDeleteChat(chatId);
        }
        break;
      default:
        break;
    }
  };

  // Sort chats: pinned first, then by timestamp
  const sortedChats = [...chats].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.timestamp) - new Date(a.timestamp);
  });

  return (
    <div className="flex-1 overflow-y-auto">
      {sortedChats.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FaUser className="text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm">No conversations found</p>
          </div>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {sortedChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => onChatSelect(chat)}
              className={`relative p-4 cursor-pointer transition-colors duration-200 hover:bg-gray-50 ${
                selectedChat?.id === chat.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
              }`}
            >
              {/* Pin indicator */}
              {chat.isPinned && (
                <div className="absolute top-2 left-2">
                  <FaThumbtack className="text-blue-500 text-xs" />
                </div>
              )}

              <div className="flex items-start space-x-3">
                {/* Profile Picture */}
                <div className="flex-shrink-0">
                  {chat.profilePicture ? (
                    <img
                      src={chat.profilePicture}
                      alt={chat.clientName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {chat.clientName.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Chat Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-sm font-semibold truncate ${
                      chat.unreadCount > 0 ? 'text-gray-900' : 'text-gray-700'
                    }`}>
                      {chat.clientName}
                    </h3>
                    <div className="flex items-center space-x-1">
                      {chat.isMuted && (
                        <FaBellSlash className="text-gray-400 text-xs" />
                      )}
                      <span className="text-xs text-gray-500">
                        {formatTime(chat.timestamp)}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-600 mt-1 truncate">
                    {chat.gigTitle}
                  </p>
                  
                  <div className="flex items-center justify-between mt-1">
                    <p className={`text-sm truncate flex-1 ${
                      chat.unreadCount > 0 ? 'font-semibold text-gray-900' : 'text-gray-600'
                    }`}>
                      {chat.lastMessage}
                    </p>
                    
                    {/* Unread indicator */}
                    {chat.unreadCount > 0 && (
                      <div className="flex-shrink-0 ml-2">
                        <span className="inline-flex items-center justify-center w-5 h-5 bg-blue-500 text-white text-xs font-bold rounded-full">
                          {chat.unreadCount > 9 ? '9+' : chat.unreadCount}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Menu */}
                <div className="flex-shrink-0 relative">
                  <button
                    onClick={(e) => handleMenuToggle(chat.id, e)}
                    className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
                  >
                    <FaEllipsisV className="text-gray-400 text-xs" />
                  </button>

                  {showMenu === chat.id && (
                    <div className="absolute right-0 top-8 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                      <div className="py-1">
                        <button
                          onClick={(e) => handleAction('pin', chat.id, e)}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center space-x-2"
                        >
                          <FaThumbtack className={`text-xs ${chat.isPinned ? 'text-blue-500' : 'text-gray-400'}`} />
                          <span>{chat.isPinned ? 'Unpin' : 'Pin'}</span>
                        </button>
                        
                        <button
                          onClick={(e) => handleAction('mute', chat.id, e)}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center space-x-2"
                        >
                          {chat.isMuted ? (
                            <>
                              <FaBell className="text-xs text-gray-400" />
                              <span>Unmute</span>
                            </>
                          ) : (
                            <>
                              <FaBellSlash className="text-xs text-gray-400" />
                              <span>Mute</span>
                            </>
                          )}
                        </button>
                        
                        <hr className="my-1" />
                        
                        <button
                          onClick={(e) => handleAction('delete', chat.id, e)}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-red-600 flex items-center space-x-2"
                        >
                          <FaTrash className="text-xs" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Click outside to close menu */}
      {showMenu && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowMenu(null)}
        />
      )}
    </div>
  );
};

export default ChatList; 