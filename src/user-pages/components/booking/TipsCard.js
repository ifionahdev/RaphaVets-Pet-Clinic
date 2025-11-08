import React from "react";

export default function TipsCard() {
  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
      <div className="text-sm text-gray-500">Tips</div>
      <ul className="mt-3 text-sm text-gray-600 space-y-2">
        <li>• Arrive 10 minutes early for check-in.</li>
        <li>• Bring vaccination records for vaccines & surgery.</li>
        <li>• For surgeries, follow pre-op fasting guidance if provided.</li>
      </ul>
    </div>
  );
}
