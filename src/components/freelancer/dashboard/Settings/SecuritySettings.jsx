import React, { useState } from "react";
import { FaShieldAlt, FaDesktop, FaMapMarkerAlt, FaClock, FaSignOutAlt } from "react-icons/fa";

const SecuritySettings = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loginActivity] = useState([
    {
      id: 1,
      device: "Chrome on Windows",
      location: "Mumbai, India",
      time: "2 hours ago",
      current: true
    },
    {
      id: 2,
      device: "Safari on iPhone",
      location: "Mumbai, India", 
      time: "1 day ago",
      current: false
    }
  ]);

  return (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold text-gray-900">Security Settings</h4>

      {/* Two-Factor Authentication */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaShieldAlt className="text-blue-500 text-xl" />
            <div>
              <h5 className="font-semibold text-gray-900">Two-Factor Authentication</h5>
              <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
            </div>
          </div>
          <button
            onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              twoFactorEnabled
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-500 text-white hover:bg-gray-600"
            }`}
          >
            {twoFactorEnabled ? "Enabled" : "Enable"}
          </button>
        </div>
        {twoFactorEnabled && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-700">
              Two-factor authentication is now enabled. You'll need to enter a code from your authenticator app when signing in.
            </p>
          </div>
        )}
      </div>

      {/* Recent Login Activity */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h5 className="font-semibold text-gray-900 mb-4">Recent Login Activity</h5>
        <div className="space-y-3">
          {loginActivity.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
              <div className="flex items-center gap-3">
                <FaDesktop className="text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">{session.device}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <FaMapMarkerAlt className="text-xs" />
                      {session.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaClock className="text-xs" />
                      {session.time}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {session.current && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    Current
                  </span>
                )}
                {!session.current && (
                  <button className="flex items-center gap-1 px-2 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors duration-200">
                    <FaSignOutAlt className="text-xs" />
                    Logout
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h6 className="font-medium text-blue-900 mb-2">Security Tips</h6>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Enable two-factor authentication for enhanced security</li>
          <li>• Use a strong, unique password</li>
          <li>• Regularly review your login activity</li>
          <li>• Log out from devices you don't recognize</li>
        </ul>
      </div>
    </div>
  );
};

export default SecuritySettings; 