import React, { useState, useMemo } from "react";
import { FaTimes } from "react-icons/fa";
import MessageFilters from "./MessageFilters";
import MessageList from "./MessageList";
import ChatModal from "../myOrders/ChatModal";
import FileUploadModal from "./FileUploadModal";
import FileViewer from "./FileViewer";

const Messages = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showFileUploadModal, setShowFileUploadModal] = useState(false);
  const [showFileViewer, setShowFileViewer] = useState(false);

  // Mock data - replace with API call
  const [allConversations, setAllConversations] = useState([
    {
      id: "conv_1",
      freelancer: {
        name: "John Designer",
        avatar: "JD",
        rating: 4.9,
        online: true
      },
      gig: {
        title: "Professional Logo Design",
        id: "gig_1"
      },
      lastMessage: {
        text: "I've sent you the first draft. Please let me know if you'd like any changes.",
        sender: "freelancer",
        timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
        unread: true
      },
      orderId: "ORD123456",
      status: "active"
    },
    {
      id: "conv_2",
      freelancer: {
        name: "Sarah Developer",
        avatar: "SD",
        rating: 4.8,
        online: false
      },
      gig: {
        title: "Website Development",
        id: "gig_2"
      },
      lastMessage: {
        text: "The website is ready for review. I've implemented all the features you requested.",
        sender: "client",
        timestamp: new Date(Date.now() - 7200000), // 2 hours ago
        unread: false
      },
      orderId: "ORD123457",
      status: "active"
    },
    {
      id: "conv_3",
      freelancer: {
        name: "Mike Writer",
        avatar: "MW",
        rating: 4.7,
        online: true
      },
      gig: {
        title: "Content Writing Services",
        id: "gig_3"
      },
      lastMessage: {
        text: "Thanks for the feedback! I'll make those revisions right away.",
        sender: "freelancer",
        timestamp: new Date(Date.now() - 86400000), // 1 day ago
        unread: false
      },
      orderId: "ORD123458",
      status: "completed"
    },
    {
      id: "conv_4",
      freelancer: {
        name: "Emma Creative",
        avatar: "EC",
        rating: 4.8,
        online: false
      },
      gig: {
        title: "UI/UX Design Package",
        id: "gig_4"
      },
      lastMessage: {
        text: "Hi! I'm starting work on your design project. Do you have any specific preferences?",
        sender: "freelancer",
        timestamp: new Date(Date.now() - 172800000), // 2 days ago
        unread: false
      },
      orderId: "ORD123459",
      status: "active"
    },
    {
      id: "conv_5",
      freelancer: {
        name: "Alex Photographer",
        avatar: "AP",
        rating: 4.9,
        online: true
      },
      gig: {
        title: "Product Photography",
        id: "gig_5"
      },
      lastMessage: {
        text: "The photos are uploaded to the shared folder. Please check and let me know if you need any adjustments.",
        sender: "freelancer",
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        unread: true
      },
              orderId: "ORD123460",
        status: "active"
      }
    ]);

  // Filter conversations based on search term and status
  const filteredConversations = useMemo(() => {
    return allConversations.filter(conversation => {
      const matchesSearch = searchTerm === "" || 
        conversation.freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conversation.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSearch;
    });
  }, [searchTerm, allConversations]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
  };

  const handleOpenChat = (conversationId) => {
    const conversation = allConversations.find(c => c.id === conversationId);
    setSelectedConversation(conversation);
    setShowChatModal(true);
  };

  const handleReply = (conversationId) => {
    handleOpenChat(conversationId);
  };

  const handleShareFiles = (conversationId) => {
    const conversation = allConversations.find(c => c.id === conversationId);
    setSelectedConversation(conversation);
    setShowFileUploadModal(true);
  };

  const handleFileUpload = (conversationId, files) => {
    console.log("Files uploaded for conversation:", conversationId, files);
    
    // Update the conversation with the new files
    setAllConversations(prevConversations => {
      return prevConversations.map(conversation => {
        if (conversation.id === conversationId) {
          return {
            ...conversation,
            sharedFiles: [...(conversation.sharedFiles || []), ...files]
          };
        }
        return conversation;
      });
    });
    
    // Show success message
    alert(`Successfully uploaded ${files.length} file(s) to the conversation!`);
  };

  const handleViewFiles = (conversationId) => {
    const conversation = allConversations.find(c => c.id === conversationId);
    setSelectedConversation(conversation);
    setShowFileViewer(true);
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return timestamp.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Messages</h3>
        <p className="text-gray-600">Chat directly with freelancers about your projects.</p>
      </div>
      
      <MessageFilters 
        searchTerm={searchTerm}
        onSearch={handleSearch}
        selectedStatus={selectedStatus}
        onStatusFilter={handleStatusFilter}
      />
      
             <MessageList 
         conversations={filteredConversations}
         onOpenChat={handleOpenChat}
         onReply={handleReply}
         onShareFiles={handleShareFiles}
         onViewFiles={handleViewFiles}
         formatTime={formatTime}
       />

      {/* Chat Modal */}
      {showChatModal && selectedConversation && (
        <ChatModal
          order={{
            id: selectedConversation.orderId,
            gigTitle: selectedConversation.gig.title,
            freelancer: selectedConversation.freelancer
          }}
          isOpen={showChatModal}
          onClose={() => {
            setShowChatModal(false);
            setSelectedConversation(null);
          }}
        />
      )}

      {/* File Upload Modal */}
      {showFileUploadModal && selectedConversation && (
        <FileUploadModal
          isOpen={showFileUploadModal}
          onClose={() => {
            setShowFileUploadModal(false);
            setSelectedConversation(null);
          }}
          conversation={selectedConversation}
          onFileUpload={handleFileUpload}
        />
      )}

      {/* File Viewer Modal */}
      {showFileViewer && selectedConversation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Files Shared with {selectedConversation.freelancer.name}
                </h2>
                <button
                  onClick={() => {
                    setShowFileViewer(false);
                    setSelectedConversation(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimes className="h-6 w-6" />
                </button>
              </div>
              <FileViewer 
                files={selectedConversation.sharedFiles || []} 
                onClose={() => {
                  setShowFileViewer(false);
                  setSelectedConversation(null);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages; 