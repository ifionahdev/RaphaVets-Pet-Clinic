import React from "react";

export default function TipsCard() {
  return (
    <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm">
      <div className="text-xs sm:text-sm text-gray-500">Tips</div>
      <ul className="mt-2 sm:mt-3 text-[10px] sm:text-xs md:text-sm text-gray-600 space-y-1 sm:space-y-1.5 md:space-y-2">
        <li className="flex items-start gap-1">
          <span className="text-[#5EE6FE]">•</span>
          <span>Arrive 10 minutes early for check-in.</span>
        </li>
        <li className="flex items-start gap-1">
          <span className="text-[#5EE6FE]">•</span>
          <span>Bring vaccination records for vaccines & surgery.</span>
        </li>
        <li className="flex items-start gap-1">
          <span className="text-[#5EE6FE]">•</span>
          <span>For surgeries, follow pre-op fasting guidance if provided.</span>
        </li>
      </ul>
    </div>
  );
}