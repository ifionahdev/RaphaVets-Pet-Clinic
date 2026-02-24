import React from "react";

const StatsCard = ({ title, value, subText, icon, color }) => {
  return (
    <div
      className={`flex items-center justify-between p-4 rounded-2xl shadow bg-gradient-to-r ${color}`}
    >
      <div>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {title}
        </p>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {value}
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">{subText}</p>
      </div>
      <div className="text-gray-400 dark:text-gray-500">{icon}</div>
    </div>
  );
};

export default StatsCard;