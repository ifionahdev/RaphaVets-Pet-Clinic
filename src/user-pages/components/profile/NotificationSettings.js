import React, { useState } from "react";

function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    appointments: true,
    health: false,
    promotions: true,
    clinicNews: false,
  });

  const toggle = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold text-[#5EE6FE] mb-2">
        Manage Notifications
      </h2>
      <p className="text-sm text-gray-600">
        Choose how you’d like to receive updates from RaphaVet Pets Clinic.
      </p>

      <div className="flex flex-col gap-4">
        {[
          { label: "Appointment Reminders", key: "appointments" },
          { label: "Pet Health Updates", key: "health" },
          { label: "Promotional Emails", key: "promotions" },
          { label: "Clinic Announcements", key: "clinicNews" },
        ].map((item) => (
          <div
            key={item.key}
            className="flex justify-between items-center bg-[#F8FBFB] p-3 rounded-lg border border-[#E6F5F7] hover:shadow-md transition-all duration-200"
          >
            <span className="text-gray-700 font-medium">{item.label}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications[item.key]}
                onChange={() => toggle(item.key)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-[#5EE6FE] transition-all"></div>
              <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-5"></div>
            </label>
          </div>
        ))}
      </div>

      <div className="text-right">
        <button className="px-6 py-2 bg-[#5EE6FE] text-white rounded-lg font-semibold hover:bg-[#47c0d7] transition-all duration-300">
          Save Preferences
        </button>
      </div>
    </div>
  );
}

export default NotificationSettings;
