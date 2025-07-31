import React, { useState, useRef, useEffect } from "react";
import { FaPaperclip, FaPaperPlane, FaDownload, FaCheck, FaCheckDouble } from "react-icons/fa";

const ChatWindow = ({ chat, onSendMessage, onBack }) => {
  const [messageText, setMessageText] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [chat.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'sent':
        return <FaCheck className="text-gray-400 text-xs" />;
      case 'delivered':
        return <FaCheckDouble className="text-gray-400 text-xs" />;
      case 'seen':
        return <FaCheckDouble className="text-blue-500 text-xs" />;
      default:
        return null;
    }
  };

  const getFileIcon = (fileType) => {
    if (fileType === 'pdf') return '📄';
    if (fileType === 'image') return '🖼️';
    if (fileType === 'document') return '📝';
    return '📎';
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSend = () => {
    if (!messageText.trim() && selectedFiles.length === 0) return;

    const attachments = selectedFiles.map(file => ({
      name: file.name,
      type: file.type.includes('pdf') ? 'pdf' : 
            file.type.includes('image') ? 'image' : 'document',
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`
    }));

    onSendMessage(messageText, attachments);
    setMessageText("");
    setSelectedFiles([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-3">
          {onBack && (
            <button
              onClick={onBack}
              className="md:hidden p-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          {chat.profilePicture ? (
            <img
              src={chat.profilePicture}
              alt={chat.clientName}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {chat.clientName.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            </div>
          )}
          <div>
            <h3 className="font-semibold text-gray-900">{chat.clientName}</h3>
            <p className="text-sm text-gray-600">{chat.gigTitle}</p>
          </div>
        </div>
        <div className="text-xs text-gray-500">
          Started {new Date(chat.messages[0]?.timestamp).toLocaleDateString()}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chat.messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'freelancer' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md ${message.sender === 'freelancer' ? 'order-2' : 'order-1'}`}>
              {/* Message Bubble */}
              <div
                className={`rounded-lg px-4 py-2 ${
                  message.sender === 'freelancer'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                
                {/* Attachments */}
                {message.attachments && message.attachments.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {message.attachments.map((attachment, index) => (
                      <div
                        key={index}
                        className={`flex items-center space-x-2 p-2 rounded ${
                          message.sender === 'freelancer'
                            ? 'bg-blue-400 text-white'
                            : 'bg-white text-gray-700'
                        }`}
                      >
                        <span className="text-sm">{getFileIcon(attachment.type)}</span>
                        <span className="text-xs truncate">{attachment.name}</span>
                        <span className="text-xs opacity-75">({attachment.size})</span>
                        <button className="ml-auto">
                          <FaDownload className="text-xs" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Message Info */}
              <div className={`flex items-center space-x-2 mt-1 ${
                message.sender === 'freelancer' ? 'justify-end' : 'justify-start'
              }`}>
                <span className="text-xs text-gray-500">
                  {formatTime(message.timestamp)}
                </span>
                {message.sender === 'freelancer' && getStatusIcon(message.status)}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-200 p-4">
        {/* Selected Files Preview */}
        {selectedFiles.length > 0 && (
          <div className="mb-3 p-2 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-700">Attachments:</span>
              <button
                onClick={() => setSelectedFiles([])}
                className="text-xs text-red-500 hover:text-red-700"
              >
                Clear all
              </button>
            </div>
            <div className="space-y-1">
              {selectedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">{getFileIcon(file.type)}</span>
                    <span className="text-xs truncate">{file.name}</span>
                    <span className="text-xs text-gray-500">({formatFileSize(file.size)})</span>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700 text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="flex items-end space-x-2">
          <div className="flex-1">
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows="1"
              style={{ minHeight: '40px', maxHeight: '120px' }}
            />
          </div>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <FaPaperclip className="text-lg" />
            </button>
            <button
              onClick={handleSend}
              disabled={!messageText.trim() && selectedFiles.length === 0}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                messageText.trim() || selectedFiles.length > 0
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <FaPaperPlane className="text-sm" />
            </button>
          </div>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileSelect}
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.txt"
        />
      </div>
    </div>
  );
};

export default ChatWindow; 