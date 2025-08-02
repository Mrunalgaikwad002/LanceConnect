import React, { useState } from "react";
import { FaEnvelope, FaLock, FaUserTimes, FaTrash, FaPalette, FaExclamationTriangle } from "react-icons/fa";

const AccountSettings = () => {
  const [accountData, setAccountData] = useState({
    email: "john.doe@example.com",
    theme: "light",
    accountStatus: "active"
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showChangeEmailModal, setShowChangeEmailModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const handleThemeChange = (theme) => {
    setAccountData(prev => ({ ...prev, theme }));
    // Here you would typically save to backend and apply theme
    console.log("Theme changed to:", theme);
  };

  const handleDeactivateAccount = () => {
    setAccountData(prev => ({ ...prev, accountStatus: "deactivated" }));
    setShowDeactivateModal(false);
    // Here you would typically call backend API
    console.log("Account deactivated");
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(false);
    // Here you would typically call backend API
    console.log("Account deleted");
  };

  return (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold text-gray-900">Account Settings</h4>

      {/* Theme Preference */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h5 className="font-semibold text-gray-900 flex items-center gap-2 mb-4">
          <FaPalette className="text-blue-500" />
          Theme Preference
        </h5>
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleThemeChange("light")}
            className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${
              accountData.theme === "light"
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            Light Mode
          </button>
          <button
            onClick={() => handleThemeChange("dark")}
            className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${
              accountData.theme === "dark"
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            Dark Mode
          </button>
        </div>
      </div>

      {/* Account Actions */}
      <div className="space-y-4">
        <h5 className="font-semibold text-gray-900">Account Actions</h5>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Change Email */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-blue-500" />
                <div>
                  <h6 className="font-medium text-gray-900">Change Email</h6>
                  <p className="text-sm text-gray-600">Update your email address</p>
                </div>
              </div>
              <button
                onClick={() => setShowChangeEmailModal(true)}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Change
              </button>
            </div>
          </div>

          {/* Change Password */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FaLock className="text-blue-500" />
                <div>
                  <h6 className="font-medium text-gray-900">Change Password</h6>
                  <p className="text-sm text-gray-600">Update your password</p>
                </div>
              </div>
              <button
                onClick={() => setShowChangePasswordModal(true)}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Change
              </button>
            </div>
          </div>

          {/* Deactivate Account */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FaUserTimes className="text-orange-500" />
                <div>
                  <h6 className="font-medium text-gray-900">Deactivate Account</h6>
                  <p className="text-sm text-gray-600">Temporarily disable your account</p>
                </div>
              </div>
              <button
                onClick={() => setShowDeactivateModal(true)}
                className="px-3 py-1 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
              >
                Deactivate
              </button>
            </div>
          </div>

          {/* Delete Account */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FaTrash className="text-red-500" />
                <div>
                  <h6 className="font-medium text-gray-900">Delete Account</h6>
                  <p className="text-sm text-gray-600">Permanently delete your account</p>
                </div>
              </div>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Account Status */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h6 className="font-medium text-gray-900">Account Status</h6>
            <p className="text-sm text-gray-600">
              Current status: <span className="font-medium text-green-600">{accountData.accountStatus}</span>
            </p>
          </div>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            accountData.accountStatus === "active" 
              ? "bg-green-100 text-green-700" 
              : "bg-red-100 text-red-700"
          }`}>
            {accountData.accountStatus === "active" ? "Active" : "Deactivated"}
          </span>
        </div>
      </div>

      {/* Modals */}
      {/* Change Email Modal */}
      {showChangeEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Email Address</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Email</label>
                <input
                  type="email"
                  value={accountData.email}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Email</label>
                <input
                  type="email"
                  placeholder="Enter new email address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowChangeEmailModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowChangeEmailModal(false)}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Update Email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowChangePasswordModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowChangePasswordModal(false)}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Deactivate Account Modal */}
      {showDeactivateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <FaExclamationTriangle className="text-orange-500 text-xl" />
              <h3 className="text-lg font-semibold text-gray-900">Deactivate Account</h3>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Your account will be temporarily disabled. You can reactivate it anytime by logging in.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeactivateModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDeactivateAccount}
                className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
              >
                Deactivate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <FaExclamationTriangle className="text-red-500 text-xl" />
              <h3 className="text-lg font-semibold text-gray-900">Delete Account</h3>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              This action cannot be undone. All your data, gigs, and earnings will be permanently deleted.
            </p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-red-700">
                <strong>Warning:</strong> This will permanently delete your account and all associated data.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSettings; 