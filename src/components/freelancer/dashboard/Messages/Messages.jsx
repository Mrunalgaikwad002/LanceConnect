import React, { useState, useEffect } from "react";
import { FaSearch, FaUser } from "react-icons/fa";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredChats, setFilteredChats] = useState([]);

  // Mock data for chats
  const [chats] = useState([
    {
      id: 1,
      clientName: "Riya Sharma",
      clientEmail: "riya.sharma@email.com",
      profilePicture: null,
      gigTitle: "Logo Design for Startup",
      lastMessage: "Can you revise the logo? I want it more modern.",
      timestamp: "2h ago",
      unreadCount: 2,
      isPinned: true,
      isMuted: false,
      messages: [
        {
          id: 1,
          sender: "client",
          text: "Hi! I need a logo for my startup",
          timestamp: "2024-01-15T10:00:00",
          status: "seen",
          attachments: []
        },
        {
          id: 2,
          sender: "freelancer",
          text: "Sure! I'd love to help. Can you tell me more about your startup?",
          timestamp: "2024-01-15T10:05:00",
          status: "seen",
          attachments: []
        },
        {
          id: 3,
          sender: "client",
          text: "It's a tech company focused on AI solutions",
          timestamp: "2024-01-15T10:10:00",
          status: "seen",
          attachments: []
        },
        {
          id: 4,
          sender: "freelancer",
          text: "Great! I'll create some initial concepts for you",
          timestamp: "2024-01-15T10:15:00",
          status: "seen",
          attachments: [
            { name: "concept1.pdf", type: "pdf", size: "2.1 MB" }
          ]
        },
        {
          id: 5,
          sender: "client",
          text: "Can you revise the logo? I want it more modern.",
          timestamp: "2024-01-15T12:00:00",
          status: "delivered",
          attachments: []
        }
      ]
    },
    {
      id: 2,
      clientName: "Amit Patel",
      clientEmail: "amit.patel@email.com",
      profilePicture: null,
      gigTitle: "Website Development",
      lastMessage: "The website looks great! When can you deliver?",
      timestamp: "1d ago",
      unreadCount: 0,
      isPinned: false,
      isMuted: false,
      messages: [
        {
          id: 1,
          sender: "client",
          text: "I need a website for my business",
          timestamp: "2024-01-14T09:00:00",
          status: "seen",
          attachments: []
        },
        {
          id: 2,
          sender: "freelancer",
          text: "I can help with that! What type of business?",
          timestamp: "2024-01-14T09:05:00",
          status: "seen",
          attachments: []
        },
        {
          id: 3,
          sender: "client",
          text: "It's a restaurant. I need online ordering",
          timestamp: "2024-01-14T09:10:00",
          status: "seen",
          attachments: []
        },
        {
          id: 4,
          sender: "freelancer",
          text: "Perfect! Here's the initial design",
          timestamp: "2024-01-14T15:00:00",
          status: "seen",
          attachments: [
            { name: "website-mockup.png", type: "image", size: "1.5 MB" }
          ]
        },
        {
          id: 5,
          sender: "client",
          text: "The website looks great! When can you deliver?",
          timestamp: "2024-01-14T16:00:00",
          status: "seen",
          attachments: []
        }
      ]
    },
    {
      id: 3,
      clientName: "Priya Singh",
      clientEmail: "priya.singh@email.com",
      profilePicture: null,
      gigTitle: "Content Writing",
      lastMessage: "Thanks for the article! It's exactly what I needed.",
      timestamp: "3d ago",
      unreadCount: 0,
      isPinned: false,
      isMuted: true,
      messages: [
        {
          id: 1,
          sender: "client",
          text: "I need content for my blog",
          timestamp: "2024-01-12T11:00:00",
          status: "seen",
          attachments: []
        },
        {
          id: 2,
          sender: "freelancer",
          text: "What topic would you like me to write about?",
          timestamp: "2024-01-12T11:05:00",
          status: "seen",
          attachments: []
        },
        {
          id: 3,
          sender: "client",
          text: "Digital marketing tips for small businesses",
          timestamp: "2024-01-12T11:10:00",
          status: "seen",
          attachments: []
        },
        {
          id: 4,
          sender: "freelancer",
          text: "Here's your article on digital marketing",
          timestamp: "2024-01-12T14:00:00",
          status: "seen",
          attachments: [
            { name: "digital-marketing-article.docx", type: "document", size: "45 KB" }
          ]
        },
        {
          id: 5,
          sender: "client",
          text: "Thanks for the article! It's exactly what I needed.",
          timestamp: "2024-01-12T15:00:00",
          status: "seen",
          attachments: []
        }
      ]
    }
  ]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredChats(chats);
    } else {
      const filtered = chats.filter(chat =>
        chat.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.gigTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredChats(filtered);
    }
  }, [searchQuery, chats]);

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  const handleSendMessage = (messageText, attachments = []) => {
    if (!selectedChat || !messageText.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: "freelancer",
      text: messageText,
      timestamp: new Date().toISOString(),
      status: "sent",
      attachments
    };

    // Update the selected chat with new message
    const updatedChat = {
      ...selectedChat,
      messages: [...selectedChat.messages, newMessage],
      lastMessage: messageText,
      timestamp: "Just now",
      unreadCount: 0
    };

    setSelectedChat(updatedChat);

    // Update the chat in the main list
    // const updatedChats = chats.map(chat =>
    //   chat.id === selectedChat.id ? updatedChat : chat
    // );
    // In a real app, you'd update the state here
  };

  const handlePinChat = (chatId) => {
    // const updatedChats = chats.map(chat =>
    //   chat.id === chatId ? { ...chat, isPinned: !chat.isPinned } : chat
    // );
    // In a real app, you'd update the state here
  };

  const handleMuteChat = (chatId) => {
    // const updatedChats = chats.map(chat =>
    //   chat.id === chatId ? { ...chat, isMuted: !chat.isMuted } : chat
    // );
    // In a real app, you'd update the state here
  };

  const handleDeleteChat = (chatId) => {
    // const updatedChats = chats.filter(chat => chat.id !== chatId);
    if (selectedChat?.id === chatId) {
      setSelectedChat(null);
    }
    // In a real app, you'd update the state here
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Messages</h3>
          <p className="text-sm text-gray-600 mt-1">
            {filteredChats.length} conversation{filteredChats.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-64"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat List */}
        <div className="w-full md:w-1/3 border-r border-gray-200 flex flex-col">
          <ChatList
            chats={filteredChats}
            selectedChat={selectedChat}
            onChatSelect={handleChatSelect}
            onPinChat={handlePinChat}
            onMuteChat={handleMuteChat}
            onDeleteChat={handleDeleteChat}
          />
        </div>

        {/* Chat Window */}
        <div className="hidden md:flex flex-1 flex-col">
          {selectedChat ? (
            <ChatWindow
              chat={selectedChat}
              onSendMessage={handleSendMessage}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUser className="text-gray-400 text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-sm text-gray-600">
                  Choose a chat from the list to start messaging
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Chat Window */}
        {selectedChat && (
          <div className="md:hidden absolute inset-0 bg-white z-10">
            <ChatWindow
              chat={selectedChat}
              onSendMessage={handleSendMessage}
              onBack={() => setSelectedChat(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages; 