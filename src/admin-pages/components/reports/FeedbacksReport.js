import React from "react";
import { Bar } from "react-chartjs-2";

const FeedbacksReport = ({ data }) => {
  const ratingsCount = [1, 2, 3, 4, 5].map(
    (rating) => data.filter((f) => f.rating === rating).length
  );

  const chartData = {
    labels: ["1⭐", "2⭐", "3⭐", "4⭐", "5⭐"],
    datasets: [
      {
        label: "Ratings",
        data: ratingsCount,
        backgroundColor: "#5EE6FE",
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="grid grid-cols-1 gap-4">
        {data.map((f) => (
          <div
            key={f.id}
            className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl shadow"
          >
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">
              {f.clientName}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Rating: {f.rating} ⭐
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{f.comment}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center p-6 bg-white dark:bg-[#181818] rounded-xl shadow">
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default FeedbacksReport;