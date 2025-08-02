import React, { useState } from "react";
import { FaBell, FaToggleOn, FaToggleOff } from "react-icons/fa";

const NotificationSettings = () => {
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    messageNotifications: true,
    gigStatusChanges: true,
    earningsAlerts: true,
    marketingEmails: false
  });

  const handleToggle = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold text-gray-900">Notification Settings</h4>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, enabled]) => (
            <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div>
                <h6 className="font-medium text-gray-900 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </h6>
                <p className="text-sm text-gray-600">
                  {key === 'orderUpdates' && 'Get notified about order status changes'}
                  {key === 'messageNotifications' && 'Receive notifications for new messages'}
                  {key === 'gigStatusChanges' && 'Get alerts when your gig status changes'}
                  {key === 'earningsAlerts' && 'Receive notifications about earnings and payouts'}
                  {key === 'marketingEmails' && 'Receive promotional emails and tips'}
                </p>
              </div>
              <button
                onClick={() => handleToggle(key)}
                className="text-2xl transition-colors duration-200"
              >
                {enabled ? (
                  <FaToggleOn className="text-blue-500" />
                ) : (
                  <FaToggleOff className="text-gray-400" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h6 className="font-medium text-blue-900 mb-2">Notification Tips</h6>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Keep important notifications enabled to stay updated</li>
          <li>• You can customize these settings anytime</li>
          <li>• Critical account notifications cannot be disabled</li>
        </ul>
      </div>
    </div>
  );
};

export default NotificationSettings; 