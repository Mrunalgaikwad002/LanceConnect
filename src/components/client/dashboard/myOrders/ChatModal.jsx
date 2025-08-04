import React, { useState, useEffect, useRef } from "react";
import { FaTimes, FaPaperPlane, FaUser } from "react-icons/fa";

const ChatModal = ({ order, isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Mock messages - replace with API call
  useEffect(() => {
    if (isOpen && order) {
      // Simulate loading existing messages
      const mockMessages = [
        {
          id: 1,
          sender: "freelancer",
          senderName: order.freelancer.name,
          message: "Hi! I've received your order for the logo design. I'll start working on it right away.",
          timestamp: new Date(Date.now() - 3600000), // 1 hour ago
          avatar: order.freelancer.avatar
        },
        {
          id: 2,
          sender: "client",
          senderName: "You",
          message: "Great! I'm looking forward to seeing the design. Can you make sure it's modern and professional?",
          timestamp: new Date(Date.now() - 3000000), // 50 minutes ago
          avatar: "ME"
        },
        {
          id: 3,
          sender: "freelancer",
          senderName: order.freelancer.name,
          message: "Absolutely! I'll create a modern, professional design that matches your brand. I'll send you the first draft within 2 days.",
          timestamp: new Date(Date.now() - 2400000), // 40 minutes ago
          avatar: order.freelancer.avatar
        }
      ];
      setMessages(mockMessages);
    }
  }, [isOpen, order]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      id: Date.now(),
      sender: "client",
      senderName: "You",
      message: newMessage.trim(),
      timestamp: new Date(),
      avatar: "ME"
    };

    setMessages(prev => [...prev, messageData]);
    setNewMessage("");
    setIsTyping(true);

    // Simulate freelancer typing and response
    setTimeout(() => {
      setIsTyping(false);
      const responseData = {
        id: Date.now() + 1,
        sender: "freelancer",
        senderName: order.freelancer.name,
        message: "Thanks for the message! I'll get back to you soon with an update on your order.",
        timestamp: new Date(),
        avatar: order.freelancer.avatar
      };
      setMessages(prev => [...prev, responseData]);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp) => {
    const today = new Date();
    const messageDate = new Date(timestamp);
    
    if (messageDate.toDateString() === today.toDateString()) {
      return "Today";
    } else if (messageDate.toDateString() === new Date(today.getTime() - 86400000).toDateString()) {
      return "Yesterday";
    } else {
      return messageDate.toLocaleDateString();
    }
  };

  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
              {order.freelancer.avatar}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Chat with {order.freelancer.name}
              </h2>
              <p className="text-sm text-gray-500">
                Order: {order.gigTitle} • {order.id}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message, index) => {
            const isClient = message.sender === "client";
            const showDate = index === 0 || 
              formatDate(message.timestamp) !== formatDate(messages[index - 1]?.timestamp);

            return (
              <div key={message.id}>
                {/* Date Separator */}
                {showDate && (
                  <div className="flex justify-center mb-4">
                    <span className="bg-white px-3 py-1 rounded-full text-xs text-gray-500 shadow-sm">
                      {formatDate(message.timestamp)}
                    </span>
                  </div>
                )}

                {/* Message */}
                <div className={`flex ${isClient ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex max-w-xs lg:max-w-md ${isClient ? 'flex-row-reverse' : 'flex-row'}`}>
                    {/* Avatar */}
                    <div className={`flex-shrink-0 ${isClient ? 'ml-2' : 'mr-2'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold ${
                        isClient ? 'bg-green-500' : 'bg-blue-500'
                      }`}>
                        {message.avatar}
                      </div>
                    </div>

                    {/* Message Content */}
                    <div className={`flex flex-col ${isClient ? 'items-end' : 'items-start'}`}>
                      <div className={`px-4 py-2 rounded-lg ${
                        isClient 
                          ? 'bg-blue-500 text-white rounded-br-none' 
                          : 'bg-white text-gray-900 rounded-bl-none shadow-sm'
                      }`}>
                        <p className="text-sm">{message.message}</p>
                      </div>
                      <div className={`flex items-center mt-1 text-xs text-gray-500 ${isClient ? 'flex-row-reverse' : 'flex-row'}`}>
                        <span className={isClient ? 'ml-2' : 'mr-2'}>
                          {message.senderName}
                        </span>
                        <span>{formatTime(message.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex max-w-xs lg:max-w-md">
                <div className="flex-shrink-0 mr-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                    {order.freelancer.avatar}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="bg-white text-gray-900 rounded-lg rounded-bl-none shadow-sm px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                  <div className="flex items-center mt-1 text-xs text-gray-500">
                    <span className="mr-2">{order.freelancer.name}</span>
                    <span>typing...</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                rows="1"
                style={{ minHeight: '44px', maxHeight: '120px' }}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FaPaperPlane className="h-4 w-4" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatModal; 