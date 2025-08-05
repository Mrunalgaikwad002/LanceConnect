import React, { useState } from "react";
import ProfileSettings from "./ProfileSettings";
import SecuritySettings from "./SecuritySettings";
import NotificationSettings from "./NotificationSettings";
import DeleteAccountModal from "./DeleteAccountModal";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Mock user data - replace with API call
  const [userProfile, setUserProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    profilePic: null,
    phone: "+91 98765 43210",
    bio: "Passionate about finding the best freelancers for my projects.",
    location: "Mumbai, India"
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    orderUpdates: true,
    newMessages: true,
    paymentReminders: true,
    marketingEmails: false,
    pushNotifications: true
  });

  const tabs = [
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "security", label: "Security", icon: "🔒" },
    { id: "notifications", label: "Notifications", icon: "🔔" }
  ];

  const handleProfileUpdate = (updatedProfile) => {
    setUserProfile(updatedProfile);
    // TODO: Send to backend
    alert("Profile updated successfully!");
  };

  const handlePasswordChange = (passwordData) => {
    console.log("Password change requested:", passwordData);
    // TODO: Send to backend
    alert("Password changed successfully!");
  };

  const handleNotificationUpdate = (settings) => {
    setNotificationSettings(settings);
    // TODO: Send to backend
    alert("Notification settings updated!");
  };

  const handleDeleteAccount = (reason) => {
    console.log("Account deletion requested:", reason);
    // TODO: Send to backend
    alert("Account deletion request submitted. We'll contact you within 24 hours.");
    setShowDeleteModal(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Settings</h3>
        <p className="text-gray-600">Manage your account preferences and security settings.</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "profile" && (
          <ProfileSettings 
            profile={userProfile}
            onUpdate={handleProfileUpdate}
          />
        )}
        
        {activeTab === "security" && (
          <SecuritySettings 
            onPasswordChange={handlePasswordChange}
            onDeleteAccount={() => setShowDeleteModal(true)}
          />
        )}
        
        {activeTab === "notifications" && (
          <NotificationSettings 
            settings={notificationSettings}
            onUpdate={handleNotificationUpdate}
          />
        )}
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <DeleteAccountModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onDeleteAccount={handleDeleteAccount}
        />
      )}
    </div>
  );
};

export default Settings; 