import React from "react";

function SecurityPrivacy() {
  const fields = [
    { label: "Current Password", placeholder: "Enter current password" },
    { label: "New Password", placeholder: "Enter new password" },
    { label: "Confirm New Password", placeholder: "Re-enter new password" },
  ];

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold text-[#5EE6FE] mb-2">Security Options</h2>
      <div className="space-y-4">
        {fields.map((item, i) => (
          <div key={i}>
            <label className="block text-gray-600 text-sm mb-1">{item.label}</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-[#5EE6FE] focus:border-[#5EE6FE]"
              placeholder={item.placeholder}
            />
          </div>
        ))}
      </div>

      <div className="text-right">
        <button className="px-6 py-2 bg-[#5EE6FE] text-white rounded-lg font-semibold hover:bg-[#47c0d7] transition-all duration-300">
          Update Password
        </button>
      </div>
    </div>
  );
}

export default SecurityPrivacy;
