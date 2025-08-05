import React, { useState, useRef } from "react";
import { FaUpload, FaCheck, FaPlay, FaTimes, FaDownload, FaSpinner, FaTrash } from "react-icons/fa";

const statusColors = {
  "Pending": "bg-yellow-100 text-yellow-800 border-yellow-200",
  "In Progress": "bg-blue-100 text-blue-800 border-blue-200",
  "Delivered": "bg-orange-100 text-orange-800 border-orange-200",
  "Completed": "bg-green-100 text-green-800 border-green-200",
  "Cancelled": "bg-red-100 text-red-800 border-red-200",
};

const progressSteps = ["Pending", "In Progress", "Delivered", "Completed"];

const OrderDetailsModal = ({ order, open, onClose, onStatusChange }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef(null);

  if (!open || !order) return null;

  const getCurrentStep = () => {
    return progressSteps.indexOf(order.status);
  };

  const validateFile = (file) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/zip',
      'application/x-zip-compressed',
      'image/jpeg',
      'image/png',
      'image/gif',
      'text/plain'
    ];

    if (file.size > maxSize) {
      return { valid: false, error: "File size must be less than 10MB" };
    }

    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: "File type not supported. Please upload PDF, DOC, DOCX, ZIP, or image files" };
    }

    return { valid: true };
  };

  const handleFileSelect = (files) => {
    setUploadError("");
    const newFiles = Array.from(files);
    
    for (let i = 0; i < newFiles.length; i++) {
      const validation = validateFile(newFiles[i]);
      if (!validation.valid) {
        setUploadError(validation.error);
        return;
      }
    }

    setSelectedFiles(prev => [...prev, ...newFiles]);
  };

  const handleFileUpload = (fileType) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = fileType === 'image' ? 'image/*' : '.pdf,.doc,.docx';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        // Handle file upload logic here
        console.log('File uploaded:', file.name);
      }
    };
    input.click();
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileSelect(files);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('word') || fileType.includes('document')) return '📝';
    if (fileType.includes('zip') || fileType.includes('compressed')) return '📦';
    if (fileType.includes('image')) return '🖼️';
    return '📎';
  };

  const handleDeliver = async () => {
    if (selectedFiles.length === 0) {
      setUploadError("Please select at least one file to deliver");
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(0);
    setUploadError("");
    
    try {
      // Simulate file upload progress for each file
      const totalFiles = selectedFiles.length;
      
      for (let i = 0; i < selectedFiles.length; i++) {
        // Simulate individual file upload with proper closure
        await new Promise((resolve) => {
          const interval = setInterval(() => {
            setUploadProgress(prev => {
              const newProgress = prev + (90 / totalFiles);
              if (newProgress >= (i + 1) * (90 / totalFiles)) {
                clearInterval(interval);
                resolve();
                return newProgress;
              }
              return newProgress;
            });
          }, 200);
        });

        // Simulate API call for each file
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // Complete upload
      setUploadProgress(100);
      
      // Simulate final processing
      setTimeout(() => {
        setIsSubmitting(false);
        setUploadProgress(0);
        setSelectedFiles([]);
        setUploadError("");
        onStatusChange && onStatusChange(order.id, "Delivered");
        onClose();
      }, 500);

    } catch (error) {
      setUploadError("Upload failed. Please try again.");
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  const handleStatusChange = (newStatus) => {
    onStatusChange && onStatusChange(order.id, newStatus);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h3 className="text-xl font-bold text-black">Order Details</h3>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-sm font-semibold text-gray-800">{order.id}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-bold border ${statusColors[order.status] || "bg-gray-100 text-gray-800 border-gray-200"}`}>
                {order.status}
              </span>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-black text-xl font-bold transition-colors duration-200"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            {/* Left Column - Order Info & Progress */}
            <div className="lg:col-span-2 space-y-4">
              {/* Progress Bar */}
              <div>
                <h4 className="text-sm font-bold text-black mb-3">Order Progress</h4>
                <div className="flex items-center">
                  {progressSteps.map((step, index) => (
                    <div key={step} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                        index <= getCurrentStep() 
                          ? 'bg-blue-600 text-white shadow-lg' 
                          : 'bg-gray-200 text-gray-500'
                      }`}>
                        {index + 1}
                      </div>
                      <span className={`ml-2 text-xs font-semibold transition-colors duration-300 ${
                        index <= getCurrentStep() ? 'text-blue-600' : 'text-gray-500'
                      }`}>
                        {step}
                      </span>
                      {index < progressSteps.length - 1 && (
                        <div className={`w-8 h-1 mx-2 transition-all duration-300 ${
                          index < getCurrentStep() ? 'bg-blue-600' : 'bg-gray-200'
                        }`}></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Order & Client Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-bold text-black mb-2">Order Information</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">Order Date:</span>
                      <span className="text-gray-900">{new Date(order.orderDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">Delivery Deadline:</span>
                      <span className="text-gray-900">{new Date(order.deliveryDeadline).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">Amount:</span>
                      <span className="text-blue-600 font-bold">₹{order.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">Time Left:</span>
                      <span className={`font-medium ${order.timeLeft === "Expired" || order.timeLeft === "Completed" || order.timeLeft === "Cancelled" ? "text-gray-500" : "text-gray-900"}`}>
                        {order.timeLeft}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-bold text-black mb-2">Client Information</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">Name:</span>
                      <span className="text-gray-900">{order.clientName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">Email:</span>
                      <span className="text-gray-900">{order.clientEmail}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gig Information */}
              <div>
                <h4 className="text-sm font-bold text-black mb-2">Gig Information</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm font-semibold text-gray-800">{order.gigTitle}</div>
                </div>
              </div>

              {/* Client Instructions */}
              <div>
                <h4 className="text-sm font-bold text-black mb-2">Client Instructions</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-700 leading-relaxed">{order.clientInstructions}</p>
                </div>
              </div>
            </div>

            {/* Right Column - Deliverables & Upload */}
            <div className="space-y-4">
              {/* Deliverables */}
              <div>
                <h4 className="text-sm font-bold text-black mb-2">Deliverables</h4>
                {order.deliverables.length > 0 ? (
                  <div className="space-y-2">
                    {order.deliverables.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <span className="text-xs text-gray-700 font-medium truncate">{file}</span>
                        <button className="p-1 rounded hover:bg-blue-100 transition-colors duration-200">
                          <FaDownload className="text-blue-600 text-xs" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-500 italic bg-gray-50 p-4 rounded-lg text-center text-xs">
                    No deliverables uploaded yet.
                  </div>
                )}
              </div>

              {/* Upload Section */}
              {(order.status === "In Progress" || order.status === "Pending") && (
                <div>
                  <h4 className="text-sm font-bold text-black mb-2">Upload Deliverables</h4>
                  
                  {/* Drag & Drop Area */}
                  <div 
                    className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors duration-200 ${
                      dragActive 
                        ? 'border-blue-400 bg-blue-50' 
                        : 'border-gray-300 hover:border-blue-400'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFileUpload}
                      disabled={isSubmitting}
                      accept=".pdf,.doc,.docx,.zip,.jpg,.jpeg,.png,.gif,.txt"
                    />
                    <div className={`cursor-pointer ${isSubmitting ? 'pointer-events-none opacity-50' : ''}`}>
                      <FaUpload className="mx-auto text-2xl text-gray-400 mb-2" />
                      <p className="text-xs text-gray-600 mb-1">
                        {dragActive ? "Drop files here" : "Click to upload or drag & drop"}
                      </p>
                      <p className="text-xs text-gray-500">PDF, DOC, DOCX, ZIP, images (Max 10MB each)</p>
                    </div>
                  </div>

                  {/* Error Message */}
                  {uploadError && (
                    <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-600">
                      {uploadError}
                    </div>
                  )}

                  {/* Test Upload Button */}
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-2 w-full px-3 py-2 bg-blue-100 text-blue-700 rounded border border-blue-300 hover:bg-blue-200 transition-colors duration-200 text-xs font-medium"
                    disabled={isSubmitting}
                  >
                    📁 Browse Files
                  </button>

                  {/* Selected Files */}
                  {selectedFiles.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <h5 className="text-xs font-semibold text-gray-700">Selected Files:</h5>
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-blue-50 p-2 rounded border border-blue-200">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <span className="text-sm">{getFileIcon(file.type)}</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-blue-800 font-medium truncate">{file.name}</p>
                              <p className="text-xs text-blue-600">{formatFileSize(file.size)}</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => removeFile(index)}
                            className="p-1 rounded hover:bg-red-100 transition-colors duration-200"
                            disabled={isSubmitting}
                          >
                            <FaTrash className="text-red-600 text-xs" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Upload Progress */}
                  {isSubmitting && (
                    <div className="mt-3">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <FaSpinner className="animate-spin text-blue-600 text-xs" />
                        <span className="text-blue-600 font-medium text-xs">Uploading {selectedFiles.length} file(s)...</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div 
                          className="bg-blue-600 h-1 rounded-full transition-all duration-300" 
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{uploadProgress}% complete</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end p-6 border-t border-gray-200">
          {order.status === "Pending" && (
            <>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center gap-1 text-sm"
                onClick={() => handleStatusChange("In Progress")}
              >
                <FaPlay className="text-xs" /> Start Order
              </button>
              <button 
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200 flex items-center gap-1 text-sm"
                onClick={() => handleStatusChange("Cancelled")}
              >
                <FaTimes className="text-xs" /> Cancel Order
              </button>
            </>
          )}
          {order.status === "In Progress" && (
            <>
              <button 
                className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-1 text-sm ${
                  isSubmitting || selectedFiles.length === 0
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                    : 'bg-orange-600 text-white hover:bg-orange-700'
                }`}
                onClick={handleDeliver}
                disabled={isSubmitting || selectedFiles.length === 0}
              >
                {isSubmitting ? <FaSpinner className="animate-spin text-xs" /> : <FaUpload className="text-xs" />}
                {isSubmitting ? 'Uploading...' : `Deliver Work (${selectedFiles.length} files)`}
              </button>
              <button 
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200 flex items-center gap-1 text-sm"
                onClick={() => handleStatusChange("Cancelled")}
                disabled={isSubmitting}
              >
                <FaTimes className="text-xs" /> Cancel Order
              </button>
            </>
          )}
          {order.status === "Delivered" && (
            <button 
              className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center gap-1 text-sm"
              onClick={() => handleStatusChange("Completed")}
            >
              <FaCheck className="text-xs" /> Mark as Completed
            </button>
          )}
          <button 
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200 text-sm" 
            onClick={onClose}
            disabled={isSubmitting}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal; 