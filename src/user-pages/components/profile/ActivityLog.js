import React from "react";

function ActivityLog() {
  // In the future, you can fetch logs dynamically from your backend
  const logs = [
    {
      id: 1,
      type: "Login",
      description: "Logged in successfully",
      date: "October 25, 2025, 10:23 AM",
      icon: "fa-right-to-bracket",
      color: "#5EE6FE",
    },
    {
      id: 2,
      type: "Pet Added",
      description: "Added a new pet named Bella",
      date: "October 23, 2025, 2:10 PM",
      icon: "fa-paw",
      color: "#F9AE16",
    },
    {
      id: 3,
      type: "Password Change",
      description: "Updated account password",
      date: "October 20, 2025, 8:45 PM",
      icon: "fa-lock",
      color: "#16C47F",
    },
    {
      id: 4,
      type: "Logout",
      description: "Logged out from web app",
      date: "October 18, 2025, 6:02 PM",
      icon: "fa-right-from-bracket",
      color: "#E85D5D",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        Activity Log
      </h2>
      <p className="text-gray-600 text-sm mb-4">
        Track your recent activities and account actions here.
      </p>

      {/* Logs list */}
      <div className="flex flex-col gap-3">
        {logs.map((log) => (
          <div
            key={log.id}
            className="flex items-center justify-between bg-[#F9FBFB] border border-[#E6F5F7] rounded-xl shadow-sm hover:shadow-md p-4 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: log.color }}
              >
                <i className={`fa-solid ${log.icon}`}></i>
              </div>
              <div>
                <p className="text-gray-800 font-medium">{log.type}</p>
                <p className="text-gray-500 text-sm">{log.description}</p>
              </div>
            </div>
            <span className="text-gray-400 text-xs whitespace-nowrap">
              {log.date}
            </span>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {logs.length === 0 && (
        <div className="text-center py-10 text-gray-500 text-sm">
          No activity recorded yet.
        </div>
      )}
    </div>
  );
}

export default ActivityLog;
