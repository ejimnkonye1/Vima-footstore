import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import axios from "axios";
import { useSelector } from "react-redux";
import { Toaster, toast } from 'react-hot-toast';
const SettingsSection = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user);

  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }
    return null;
  };

const handlePasswordChange = async (e) => {
  e.preventDefault();
  setError(null);

  // Validate passwords
  const passwordError = validatePassword(newPassword);
  if (passwordError) {
    setError(passwordError);
    return;
  }

  if (newPassword !== confirmPassword) {
    setError("New passwords don't match");
    return;
  }

  try {
    setLoading(true);
    const response = await apiClient.request(
      `${import.meta.env.VITE_SERVER_URL}/api/updateuser/${user._id}/password`,
      {
        method: 'PUT',
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to update password');
    }

    toast.success("Password updated successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  } catch (err) {
    setError(
      err.message || "Failed to update password. Please try again."
    );
    toast.error(err.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
       <Toaster position="top-center" />
      <h2 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h2>

      <div className="space-y-8">
        {/* Password Update */}
        <form onSubmit={handlePasswordChange}>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Change Password
            </h3>
        
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="current-password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  id="current-password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="new-password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  New Password (min 6 characters)
                </label>
                <input
                  type="password"
                  id="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                  minLength={6}
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                  minLength={6}
                />
              </div>
        <button
  type="submit"
  disabled={loading}
  className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
>
  {loading ? (
    <>
      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Updating...
    </>
  ) : (
    "Update Password"
  )}
</button>
            </div>
          </div>
        </form>

        {/* Account Actions */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Account Actions
          </h3>
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

export default SettingsSection;