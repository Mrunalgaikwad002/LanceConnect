import React, { useState } from "react";
import { FaBell, FaEnvelope, FaMobile, FaToggleOn, FaToggleOff } from "react-icons/fa";

const NotificationSettings = ({ settings, onUpdate }) => {
  const [notificationSettings, setNotificationSettings] = useState(settings);

  const handleToggle = (setting) => {
    const updatedSettings = {
      ...notificationSettings,
      [setting]: !notificationSettings[setting]
    };
    setNotificationSettings(updatedSettings);
    onUpdate(updatedSettings);
  };

  const notificationOptions = [
    {
      key: "emailNotifications",
      title: "Email Notifications",
      description: "Receive notifications via email",
      icon: FaEnvelope,
      category: "General"
    },
    {
      key: "orderUpdates",
      title: "Order Updates",
      description: "Get notified about order status changes",
      icon: FaBell,
      category: "Orders"
    },
    {
      key: "newMessages",
      title: "New Messages",
      description: "Receive notifications for new messages from freelancers",
      icon: FaBell,
      category: "Communication"
    },
    {
      key: "paymentReminders",
      title: "Payment Reminders",
      description: "Get reminders for pending payments",
      icon: FaBell,
      category: "Payments"
    },
    {
      key: "marketingEmails",
      title: "Marketing Emails",
      description: "Receive promotional emails and updates",
      icon: FaEnvelope,
      category: "Marketing"
    },
    {
      key: "pushNotifications",
      title: "Push Notifications",
      description: "Receive notifications on your device",
      icon: FaMobile,
      category: "General"
    }
  ];

  const groupedNotifications = notificationOptions.reduce((acc, option) => {
    if (!acc[option.category]) {
      acc[option.category] = [];
    }
    acc[option.category].push(option);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <FaBell className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">Notification Preferences</h3>
            <p className="text-sm text-gray-500">Manage how you receive notifications</p>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="space-y-6">
        {Object.entries(groupedNotifications).map(([category, options]) => (
          <div key={category} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h4 className="text-md font-medium text-gray-900 mb-4">{category}</h4>
            <div className="space-y-4">
              {options.map((option) => {
                const Icon = option.icon;
                const isEnabled = notificationSettings[option.key];
                
                return (
                  <div key={option.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Icon className="h-4 w-4 text-gray-600" />
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-gray-900">{option.title}</h5>
                        <p className="text-xs text-gray-500">{option.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggle(option.key)}
                      className="flex items-center space-x-2"
                    >
                      {isEnabled ? (
                        <FaToggleOn className="h-6 w-6 text-blue-600" />
                      ) : (
                        <FaToggleOff className="h-6 w-6 text-gray-400" />
                      )}
                      <span className="text-xs font-medium text-gray-500">
                        {isEnabled ? 'On' : 'Off'}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Notification Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <FaBell className="h-3 w-3 text-blue-600" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-blue-900">Notification Summary</h4>
            <p className="text-xs text-blue-700 mt-1">
              You have {Object.values(notificationSettings).filter(Boolean).length} out of {Object.keys(notificationSettings).length} notification types enabled.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">Quick Actions</h4>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => {
              const allEnabled = Object.keys(notificationSettings).reduce((acc, key) => {
                acc[key] = true;
                return acc;
              }, {});
              setNotificationSettings(allEnabled);
              onUpdate(allEnabled);
            }}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Enable All
          </button>
          <button
            onClick={() => {
              const allDisabled = Object.keys(notificationSettings).reduce((acc, key) => {
                acc[key] = false;
                return acc;
              }, {});
              setNotificationSettings(allDisabled);
              onUpdate(allDisabled);
            }}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Disable All
          </button>
          <button
            onClick={() => {
              const defaultSettings = {
                emailNotifications: true,
                orderUpdates: true,
                newMessages: true,
                paymentReminders: true,
                marketingEmails: false,
                pushNotifications: true
              };
              setNotificationSettings(defaultSettings);
              onUpdate(defaultSettings);
            }}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Reset to Default
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings; 