"use client";
import React, { useState } from "react";

const SettingsPage = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
  });
  const [document, setDocument] = useState<File | null>(null);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotificationSettings((prev) => ({ ...prev, [name]: checked }));
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocument(e.target.files[0]);
    }
  };

  const handleSubmitProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile update
    console.log("Profile updated:", profile);
  };

  const handleSubmitPasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (profile.newPassword === profile.confirmNewPassword) {
      // Handle password change
      console.log("Password changed");
    } else {
      console.error("Passwords do not match");
    }
  };

  const handleSubmitNotificationSettings = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle notification settings update
    console.log("Notification settings updated:", notificationSettings);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-blue-600">Settings</h1>
        <p className="text-gray-600 mt-2">
          Update your profile information, change your password, and manage your
          notification settings here.
        </p>
      </header>

      <main>
        {/* Profile Information */}
        <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Profile Information
          </h2>
          <form onSubmit={handleSubmitProfile}>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={profile.name}
                onChange={handleProfileChange}
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={profile.email}
                onChange={handleProfileChange}
                required
              />
            </div>

            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Update Profile
              </button>
            </div>
          </form>
        </section>

        {/* Change Password */}
        <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Change Password
          </h2>
          <form onSubmit={handleSubmitPasswordChange}>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="password"
              >
                Current Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={profile.password}
                onChange={handleProfileChange}
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="newPassword"
              >
                New Password
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={profile.newPassword}
                onChange={handleProfileChange}
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="confirmNewPassword"
              >
                Confirm New Password
              </label>
              <input
                id="confirmNewPassword"
                name="confirmNewPassword"
                type="password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={profile.confirmNewPassword}
                onChange={handleProfileChange}
                required
              />
            </div>

            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Change Password
              </button>
            </div>
          </form>
        </section>

        {/* Notification Settings */}
        <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Notification Settings
          </h2>
          <form onSubmit={handleSubmitNotificationSettings}>
            <div className="mb-4 flex items-center">
              <input
                id="emailNotifications"
                name="emailNotifications"
                type="checkbox"
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={notificationSettings.emailNotifications}
                onChange={handleNotificationChange}
              />
              <label
                htmlFor="emailNotifications"
                className="ml-2 text-gray-700 font-semibold"
              >
                Email Notifications
              </label>
            </div>

            <div className="mb-4 flex items-center">
              <input
                id="smsNotifications"
                name="smsNotifications"
                type="checkbox"
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={notificationSettings.smsNotifications}
                onChange={handleNotificationChange}
              />
              <label
                htmlFor="smsNotifications"
                className="ml-2 text-gray-700 font-semibold"
              >
                SMS Notifications
              </label>
            </div>

            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save Notification Settings
              </button>
            </div>
          </form>
        </section>

        {/* Document Upload */}
        <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Upload Profile Picture
          </h2>
          <form>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="document"
              >
                Upload Document
              </label>
              <input
                id="document"
                type="file"
                className="w-full  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleDocumentUpload}
              />
              {document && (
                <p className="mt-2 text-gray-600">Uploaded: {document.name}</p>
              )}
            </div>
          </form>
        </section>

        {/* Account Deactivation */}
        <section className="bg-red-50 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Deactivate Account
          </h2>
          <p className="text-gray-600 mb-4">
            If you wish to deactivate your account, please proceed with caution.
            This action cannot be undone.
          </p>
          <button
            onClick={() => console.log("Account deactivated")}
            className="w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Deactivate Account
          </button>
        </section>
      </main>
    </div>
  );
};

export default SettingsPage;
