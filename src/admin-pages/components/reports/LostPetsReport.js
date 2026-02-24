import React from "react";
import { Pie } from "react-chartjs-2";

const LostPetsReport = ({ data }) => {
  const statusCount = data.reduce((acc, pet) => {
    acc[pet.status] = (acc[pet.status] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(statusCount),
    datasets: [
      {
        data: Object.values(statusCount),
        backgroundColor: ["#FF6B6B", "#F9AE16", "#5EE6FE", "#81C784"],
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
              <th className="px-4 py-2">Owner</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Date Reported</th>
            </tr>
          </thead>
          <tbody>
            {data.map((pet) => (
              <tr
                key={pet.id}
                className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                <td className="px-4 py-2">{pet.id}</td>
                <td className="px-4 py-2">{pet.name}</td>
                <td className="px-4 py-2">{pet.ownerName}</td>
                <td className="px-4 py-2">{pet.status}</td>
                <td className="px-4 py-2">{new Date(pet.reportedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center p-6 bg-white dark:bg-[#181818] rounded-xl shadow">
        <Pie data={chartData} />
      </div>
    </div>
  );
};

export default LostPetsReport;