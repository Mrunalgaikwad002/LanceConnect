import React, { useState } from "react";
import { FaFile, FaImage, FaVideo, FaFilePdf, FaFileWord, FaFileExcel, FaDownload, FaEye, FaTimes } from "react-icons/fa";

const FileViewer = ({ files, onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  if (!files || files.length === 0) return null;

  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) return <FaImage className="h-5 w-5 text-blue-500" />;
    if (fileType.startsWith('video/')) return <FaVideo className="h-5 w-5 text-purple-500" />;
    if (fileType === 'application/pdf') return <FaFilePdf className="h-5 w-5 text-red-500" />;
    if (fileType.includes('word') || fileType.includes('document')) return <FaFileWord className="h-5 w-5 text-blue-600" />;
    if (fileType.includes('excel') || fileType.includes('spreadsheet')) return <FaFileExcel className="h-5 w-5 text-green-600" />;
    return <FaFile className="h-5 w-5 text-gray-500" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handlePreview = (file) => {
    setSelectedFile(file);
    setShowPreview(true);
  };

  const handleDownload = (file) => {
    // Create a download link
    const url = file.preview || URL.createObjectURL(file.file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    if (!file.preview) {
      URL.revokeObjectURL(url);
    }
  };

  return (
    <>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-900">Shared Files ({files.length})</h3>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FaTimes className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {files.map((file) => (
            <div key={file.id} className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {file.preview ? (
                    <img 
                      src={file.preview} 
                      alt={file.name} 
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                      {getFileIcon(file.type)}
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-2 mt-3">
                {(file.type.startsWith('image/') || file.type.startsWith('video/') || file.type === 'application/pdf') && (
                  <button
                    onClick={() => handlePreview(file)}
                    className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-600 hover:text-blue-700 focus:outline-none"
                  >
                    <FaEye className="h-3 w-3 mr-1" />
                    Preview
                  </button>
                )}
                <button
                  onClick={() => handleDownload(file)}
                  className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-600 hover:text-gray-700 focus:outline-none"
                >
                  <FaDownload className="h-3 w-3 mr-1" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* File Preview Modal */}
      {showPreview && selectedFile && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">{selectedFile.name}</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-4">
              {selectedFile.type.startsWith('image/') && (
                <img 
                  src={selectedFile.preview} 
                  alt={selectedFile.name} 
                  className="max-w-full max-h-96 mx-auto object-contain"
                />
              )}
              
              {selectedFile.type.startsWith('video/') && (
                <video 
                  controls 
                  className="max-w-full max-h-96 mx-auto"
                  src={selectedFile.preview}
                >
                  Your browser does not support the video tag.
                </video>
              )}
              
              {selectedFile.type === 'application/pdf' && (
                <iframe 
                  src={selectedFile.preview} 
                  className="w-full h-96 border-0"
                  title={selectedFile.name}
                />
              )}
            </div>
            
            <div className="flex justify-end p-4 border-t border-gray-200">
              <button
                onClick={() => handleDownload(selectedFile)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                <FaDownload className="h-4 w-4 mr-2" />
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FileViewer; 