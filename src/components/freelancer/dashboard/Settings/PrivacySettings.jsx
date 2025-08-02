import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaUser, FaToggleOn, FaToggleOff } from "react-icons/fa";

const PrivacySettings = () => {
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    gigVisibility: "all",
    showOnlineStatus: true
  });

  const handleToggle = (key) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSelect = (key, value) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold text-gray-900">Privacy Settings</h4>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="space-y-6">
          {/* Profile Visibility */}
          <div>
            <h5 className="font-semibold text-gray-900 flex items-center gap-2 mb-3">
              <FaUser className="text-blue-500" />
              Profile Visibility
            </h5>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="profileVisibility"
                  value="public"
                  checked={privacySettings.profileVisibility === "public"}
                  onChange={(e) => handleSelect("profileVisibility", e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Public - Anyone can view your profile</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="profileVisibility"
                  value="private"
                  checked={privacySettings.profileVisibility === "private"}
                  onChange={(e) => handleSelect("profileVisibility", e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Private - Only clients you work with can view</span>
              </label>
            </div>
          </div>

          {/* Gig Visibility */}
          <div>
            <h5 className="font-semibold text-gray-900 flex items-center gap-2 mb-3">
              <FaEye className="text-blue-500" />
              Gig Visibility
            </h5>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gigVisibility"
                  value="all"
                  checked={privacySettings.gigVisibility === "all"}
                  onChange={(e) => handleSelect("gigVisibility", e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">All - Show all gigs to everyone</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gigVisibility"
                  value="clients"
                  checked={privacySettings.gigVisibility === "clients"}
                  onChange={(e) => handleSelect("gigVisibility", e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Clients Only - Show gigs only to your clients</span>
              </label>
            </div>
          </div>

          {/* Online Status */}
          <div className="flex items-center justify-between py-3 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <FaEyeSlash className="text-blue-500" />
              <div>
                <h6 className="font-medium text-gray-900">Show Online Status</h6>
                <p className="text-sm text-gray-600">Let others see when you're online</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle("showOnlineStatus")}
              className="text-2xl transition-colors duration-200"
            >
              {privacySettings.showOnlineStatus ? (
                <FaToggleOn className="text-blue-500" />
              ) : (
                <FaToggleOff className="text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h6 className="font-medium text-blue-900 mb-2">Privacy Tips</h6>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Public profiles help you get more clients</li>
          <li>• You can change these settings anytime</li>
          <li>• Private settings may limit your visibility to potential clients</li>
        </ul>
      </div>
    </div>
  );
};

export default PrivacySettings; 