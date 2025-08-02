import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaCheck, FaTimes, FaSave } from "react-icons/fa";

const ContactSettings = () => {
  const [contactData, setContactData] = useState({
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    country: "India",
    location: "Mumbai, Maharashtra",
    timezone: "Asia/Kolkata",
    emailVerified: true
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);
  const [showVerificationSent, setShowVerificationSent] = useState(false);

  const handleInputChange = (field, value) => {
    setContactData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log("Saving contact data:", contactData);
    setIsEditing(false);
    setShowSaveConfirmation(true);
    setTimeout(() => setShowSaveConfirmation(false), 3000);
  };

  const handleResendVerification = () => {
    setShowVerificationSent(true);
    setTimeout(() => setShowVerificationSent(false), 3000);
  };

  const timezones = [
    { value: "Asia/Kolkata", label: "Asia/Kolkata (UTC +5:30)" },
    { value: "Asia/Dubai", label: "Asia/Dubai (UTC +4:00)" },
    { value: "America/New_York", label: "America/New_York (UTC -5:00)" },
    { value: "Europe/London", label: "Europe/London (UTC +0:00)" },
    { value: "Asia/Tokyo", label: "Asia/Tokyo (UTC +9:00)" },
    { value: "Australia/Sydney", label: "Australia/Sydney (UTC +10:00)" },
  ];

  const countries = [
    "India", "United States", "United Kingdom", "Canada", "Australia", 
    "Germany", "France", "Japan", "Singapore", "United Arab Emirates"
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-gray-900">Contact Information</h4>
        <div className="flex gap-3">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                <FaSave className="text-sm" />
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              Edit Contact Info
            </button>
          )}
        </div>
      </div>

      {showSaveConfirmation && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <FaSave className="text-green-500 mr-2" />
            <span className="text-green-700 font-medium">Contact information updated successfully!</span>
          </div>
        </div>
      )}

      {showVerificationSent && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <FaEnvelope className="text-blue-500 mr-2" />
            <span className="text-blue-700 font-medium">Verification email sent! Please check your inbox.</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Email Section */}
        <div className="space-y-4">
          <h5 className="font-semibold text-gray-900 flex items-center gap-2">
            <FaEnvelope className="text-blue-500" />
            Email Address
          </h5>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="flex items-center gap-3">
              <input
                type="email"
                value={contactData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={!isEditing}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
              />
              {contactData.emailVerified ? (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  <FaCheck className="mr-1" />
                  Verified
                </span>
              ) : (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                  <FaTimes className="mr-1" />
                  Unverified
                </span>
              )}
            </div>
            {!contactData.emailVerified && (
              <button
                onClick={handleResendVerification}
                className="mt-2 text-sm text-blue-600 hover:text-blue-800 underline"
              >
                Resend verification email
              </button>
            )}
          </div>
        </div>

        {/* Phone Section */}
        <div className="space-y-4">
          <h5 className="font-semibold text-gray-900 flex items-center gap-2">
            <FaPhone className="text-blue-500" />
            Phone Number
          </h5>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              value={contactData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              disabled={!isEditing}
              placeholder="+91 98765 43210"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>
        </div>

        {/* Location Section */}
        <div className="space-y-4">
          <h5 className="font-semibold text-gray-900 flex items-center gap-2">
            <FaMapMarkerAlt className="text-blue-500" />
            Location
          </h5>
          
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
              <select
                value={contactData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
              >
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City/State</label>
              <input
                type="text"
                value={contactData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                disabled={!isEditing}
                placeholder="Mumbai, Maharashtra"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
              />
            </div>
          </div>
        </div>

        {/* Timezone Section */}
        <div className="space-y-4">
          <h5 className="font-semibold text-gray-900 flex items-center gap-2">
            <FaClock className="text-blue-500" />
            Time Zone
          </h5>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
            <select
              value={contactData.timezone}
              onChange={(e) => handleInputChange('timezone', e.target.value)}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            >
              {timezones.map(tz => (
                <option key={tz.value} value={tz.value}>{tz.label}</option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              This helps clients know your availability
            </p>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h6 className="font-medium text-gray-900 mb-2">Contact Information Tips</h6>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Keep your email and phone number up to date for order notifications</li>
          <li>• Verify your email to receive important account updates</li>
          <li>• Set your correct timezone to help clients understand your availability</li>
          <li>• Your location helps clients find local freelancers if needed</li>
        </ul>
      </div>
    </div>
  );
};

export default ContactSettings; 