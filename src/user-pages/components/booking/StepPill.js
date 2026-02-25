import React from "react";

export default function StepPill({ number, active, done, children }) {
  return (
    <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
      <div className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold flex-shrink-0 ${
        done ? "bg-[#5EE6FE] text-white" : active ? "bg-[#EAFBFD] text-[#0589a0]" : "bg-white text-gray-600 border border-gray-100"
      }`}>
        {number}
      </div>
      <div className={`text-[10px] sm:text-xs md:text-sm whitespace-nowrap ${active || done ? "text-gray-800" : "text-gray-500"}`}>
        {children}
      </div>
    </div>
  );
}