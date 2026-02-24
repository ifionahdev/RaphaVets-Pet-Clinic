import React from "react";
import { Pie } from "react-chartjs-2";

const AppointmentsReport = ({ data }) => {
  const statusCount = data.reduce((acc, cur) => {
    acc[cur.status] = (acc[cur.status] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(statusCount),
    datasets: [
      {
        data: Object.values(statusCount),
        backgroundColor: ["#5EE6FE", "#F9AE16", "#FF6B6B", "#81C784"],
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
              <th className="px-4 py-2">Client</th>
              <th className="px-4 py-2">Pet</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((appt) => (
              <tr
                key={appt.id}
                className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                <td className="px-4 py-2">{appt.id}</td>
                <td className="px-4 py-2">{appt.clientName}</td>
                <td className="px-4 py-2">{appt.petName}</td>
                <td className="px-4 py-2">{appt.date}</td>
                <td className="px-4 py-2">{appt.status}</td>
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

export default AppointmentsReport;