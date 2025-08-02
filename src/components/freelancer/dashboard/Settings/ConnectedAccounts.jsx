import React, { useState } from "react";
import { FaGoogle, FaGithub, FaLinkedin, FaTwitter, FaLink, FaUnlink } from "react-icons/fa";

const ConnectedAccounts = () => {
  const [connectedAccounts, setConnectedAccounts] = useState({
    google: { connected: true, email: "john.doe@gmail.com" },
    github: { connected: false, username: null },
    linkedin: { connected: false, profile: null },
    twitter: { connected: false, handle: null }
  });

  const [socialLinks, setSocialLinks] = useState({
    portfolio: "https://johndoe.dev",
    linkedin: "https://linkedin.com/in/johndoe",
    twitter: "https://twitter.com/johndoe",
    github: "https://github.com/johndoe"
  });

  const handleConnect = (platform) => {
    setConnectedAccounts(prev => ({
      ...prev,
      [platform]: { ...prev[platform], connected: true }
    }));
  };

  const handleDisconnect = (platform) => {
    setConnectedAccounts(prev => ({
      ...prev,
      [platform]: { ...prev[platform], connected: false }
    }));
  };

  const handleSocialLinkChange = (platform, value) => {
    setSocialLinks(prev => ({
      ...prev,
      [platform]: value
    }));
  };

  return (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold text-gray-900">Connected Accounts</h4>

      {/* Connected Accounts */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h5 className="font-semibold text-gray-900 mb-4">External Accounts</h5>
        <div className="space-y-4">
          {Object.entries(connectedAccounts).map(([platform, account]) => (
            <div key={platform} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
              <div className="flex items-center gap-3">
                {platform === 'google' && <FaGoogle className="text-red-500 text-xl" />}
                {platform === 'github' && <FaGithub className="text-gray-800 text-xl" />}
                {platform === 'linkedin' && <FaLinkedin className="text-blue-600 text-xl" />}
                {platform === 'twitter' && <FaTwitter className="text-blue-400 text-xl" />}
                <div>
                  <h6 className="font-medium text-gray-900 capitalize">{platform}</h6>
                  <p className="text-sm text-gray-600">
                    {account.connected 
                      ? `Connected as ${account.email || account.username || account.profile || account.handle}`
                      : 'Not connected'
                    }
                  </p>
                </div>
              </div>
              <button
                onClick={() => account.connected ? handleDisconnect(platform) : handleConnect(platform)}
                className={`px-3 py-1 text-sm rounded-lg transition-colors duration-200 ${
                  account.connected
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {account.connected ? (
                  <span className="flex items-center gap-1">
                    <FaUnlink className="text-xs" />
                    Disconnect
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <FaLink className="text-xs" />
                    Connect
                  </span>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Social Media Links */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h5 className="font-semibold text-gray-900 mb-4">Social Media Links</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(socialLinks).map(([platform, link]) => (
            <div key={platform}>
              <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                {platform} URL
              </label>
              <input
                type="url"
                value={link}
                onChange={(e) => handleSocialLinkChange(platform, e.target.value)}
                placeholder={`https://${platform}.com/yourusername`}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h6 className="font-medium text-blue-900 mb-2">Connected Accounts Tips</h6>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Connect your accounts for easier login and profile verification</li>
          <li>• Social media links help clients learn more about you</li>
          <li>• You can disconnect accounts anytime</li>
        </ul>
      </div>
    </div>
  );
};

export default ConnectedAccounts; 