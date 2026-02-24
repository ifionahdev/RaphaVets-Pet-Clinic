import React from "react";
import { Line } from "react-chartjs-2";

const PetsReport = ({ data }) => {
  const grouped = data.reduce((acc, p) => {
    const date = new Date(p.createdAt).toISOString().split("T")[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(grouped),
    datasets: [
      {
        label: "New Pets",
        data: Object.values(grouped),
        fill: false,
        borderColor: "#F9AE16",
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
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Species</th>
              <th className="px-4 py-2">Owner</th>
              <th className="px-4 py-2">Registered</th>
            </tr>
          </thead>
          <tbody>
            {data.map((p) => (
              <tr
                key={p.id}
                className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                <td className="px-4 py-2">{p.id}</td>
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2">{p.species}</td>
                <td className="px-4 py-2">{p.ownerName}</td>
                <td className="px-4 py-2">{new Date(p.createdAt).toLocaleDateString()}</td>
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

export default PetsReport;