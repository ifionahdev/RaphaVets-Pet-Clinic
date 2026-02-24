import React from "react";
import { Line } from "react-chartjs-2";

const VisitsReport = ({ data }) => {
  const grouped = data.reduce((acc, v) => {
    const date = new Date(v.date).toISOString().split("T")[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(grouped),
    datasets: [
      {
        label: "Visits",
        data: Object.values(grouped),
        fill: false,
        borderColor: "#81C784",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Pet</th>
              <th className="px-4 py-2">Owner</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Reason</th>
            </tr>
          </thead>
          <tbody>
            {data.map((v) => (
              <tr
                key={v.id}
                className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                <td className="px-4 py-2">{v.id}</td>
                <td className="px-4 py-2">{v.petName}</td>
                <td className="px-4 py-2">{v.ownerName}</td>
                <td className="px-4 py-2">{new Date(v.date).toLocaleDateString()}</td>
                <td className="px-4 py-2">{v.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center p-6 bg-white dark:bg-[#181818] rounded-xl shadow">
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default VisitsReport;