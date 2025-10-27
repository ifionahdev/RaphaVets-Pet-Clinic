import React from "react";

function ConnectedDevices() {
  const sessions = [
    { device: "Chrome on Windows", location: "Philippines", time: "Now" },
    { device: "Mobile App", location: "Manila", time: "2 hours ago" },
  ];

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold text-[#5EE6FE] mb-2">Active Sessions</h2>
      <p className="text-sm text-gray-600 mb-3">
        Manage devices currently logged in to your account.
      </p>

      <div className="flex flex-col gap-3">
        {sessions.map((session, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center bg-[#F8FBFB] p-3 rounded-lg border border-[#E6F5F7]"
          >
            <div>
              <p className="text-gray-800 font-medium">{session.device}</p>
              <p className="text-gray-500 text-sm">
                {session.location} • {session.time}
              </p>
            </div>
            <button className="text-[#5EE6FE] hover:text-[#47c0d7] text-sm font-semibold">
              Log out
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConnectedDevices;
