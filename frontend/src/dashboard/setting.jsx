import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";

const SettingsSection = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    promotions: true
  });

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications({ ...notifications, [name]: checked });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h2>
      
      <div className="space-y-8">
        {/* Notification Preferences */}

        {/* Password Update */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input
                type="password"
                id="current-password"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                id="new-password"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                id="confirm-password"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium">
              Update Password
            </button>
          </div>
        </div>

        {/* Account Actions */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Account Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 flex justify-between items-center">
              <span className="text-gray-700">Download Personal Data</span>
              <FiChevronRight className="text-gray-400" />
            </button>
            <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 flex justify-between items-center">
              <span className="text-gray-700">Request Account Deletion</span>
              <FiChevronRight className="text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsSection