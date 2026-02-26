import React from "react";

function HelpCard() {
  return (
    <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm text-xs sm:text-sm text-gray-600">
      <div className="font-semibold mb-1 sm:mb-2">Need help?</div>
      <div className="text-gray-500 text-[10px] sm:text-xs">
        Contact our clinic for adjustments and special requests.
      </div>
    </div>
  );
}

export default HelpCard;