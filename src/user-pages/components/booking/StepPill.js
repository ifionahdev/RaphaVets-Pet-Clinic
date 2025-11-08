import React from "react";

export default function StepPill({ number, active, done, children }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
        done ? "bg-[#5EE6FE] text-white" : active ? "bg-[#EAFBFD] text-[#0589a0]" : "bg-white text-gray-600 border border-gray-100"
      }`}>
        {number}
      </div>
      <div className={`text-sm ${active || done ? "text-gray-800" : "text-gray-500"}`}>{children}</div>
    </div>
  );
}
