import React, { useState } from "react";
import { FaTimes, FaExclamationTriangle, FaTrash } from "react-icons/fa";

const DeleteAccountModal = ({ isOpen, onClose, onDeleteAccount }) => {
  const [reason, setReason] = useState("");
  const [confirmation, setConfirmation] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (confirmation !== "DELETE") {
      alert("Please type DELETE to confirm account deletion");
      return;
    }
    onDeleteAccount(reason);
  };

  const handleClose = () => {
    setReason("");
    setConfirmation("");
    onClose();
  };

  const reasons = [
    "No longer need the service",
    "Found a better alternative",
    "Privacy concerns",
    "Too expensive",
    "Poor user experience",
    "Other"
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <FaExclamationTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Delete Account</h2>
              <p className="text-sm text-gray-500">This action cannot be undone</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </div>

        {/* Warning */}
        <div className="p-6 border-b border-gray-200">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <FaExclamationTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-red-800">Warning</h3>
                <p className="text-sm text-red-700 mt-1">
                  Deleting your account will permanently remove all your data including:
                </p>
                <ul className="text-sm text-red-700 mt-2 space-y-1">
                  <li>• All orders and payment history</li>
                  <li>• Messages and conversations</li>
                  <li>• Profile information</li>
                  <li>• Account settings</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Reason for Deletion */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason for leaving (optional)
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">Select a reason</option>
              {reasons.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* Additional Comments */}
          {reason === "Other" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Please specify
              </label>
              <textarea
                value={reason === "Other" ? "" : reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Tell us why you're leaving..."
              />
            </div>
          )}

          {/* Confirmation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type "DELETE" to confirm
            </label>
            <input
              type="text"
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="DELETE"
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            >
              <FaTrash className="h-4 w-4 mr-2" />
              Delete Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteAccountModal; 