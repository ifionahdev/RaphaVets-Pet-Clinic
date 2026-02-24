import React, { useState } from "react";
import Header from "../template/Header";
import { Calendar, Filter, Download, FilePieChart } from "lucide-react";
import { Line, Bar, Pie } from "react-chartjs-2";
import "chart.js/auto"; 

const sampleAppointments = [
  { date: "2026-01-01", completed: 5, pending: 3, cancelled: 1 },
  { date: "2026-01-02", completed: 8, pending: 2, cancelled: 0 },
  { date: "2026-01-03", completed: 6, pending: 4, cancelled: 2 },
  { date: "2026-01-04", completed: 7, pending: 3, cancelled: 1 },
]; 

const sampleFeedbacks = [
  { rating: 5 },
  { rating: 4 },
  { rating: 3 },
  { rating: 5 },
  { rating: 2 },
  { rating: 4 },
];

const sampleUsers = [
  { name: "Alice", joined: "2026-01-01" },
  { name: "Bob", joined: "2026-01-03" },
  { name: "Charlie", joined: "2026-01-05" },
];

const samplePets = [
  { name: "Fluffy", type: "Dog" },
  { name: "Mittens", type: "Cat" },
  { name: "Bella", type: "Dog" },
  { name: "Whiskers", type: "Cat" },
];

const tabs = [
  { id: "appointments", label: "Appointments" },
  { id: "feedbacks", label: "Feedbacks" },
  { id: "users", label: "Users" },
  { id: "pets", label: "Pets" },
];

const Reports = () => {
  const [activeTab, setActiveTab] = useState("appointments");

  // Derived stats
  const totalAppointments = sampleAppointments.reduce(
    (sum, a) => sum + a.completed + a.pending + a.cancelled,
    0
  );
  const completedAppointments = sampleAppointments.reduce(
    (sum, a) => sum + a.completed,
    0
  );
  const positiveFeedback = sampleFeedbacks.filter((f) => f.rating >= 4).length;
  const averageRating =
    sampleFeedbacks.reduce((sum, f) => sum + f.rating, 0) /
    sampleFeedbacks.length;
  const userGrowth = sampleUsers.length;
  const petGrowth = samplePets.length;

  // Chart data
  const appointmentsChartData = {
    labels: sampleAppointments.map((a) => a.date),
    datasets: [
      {
        label: "Completed",
        data: sampleAppointments.map((a) => a.completed),
        borderColor: "#22c55e",
        backgroundColor: "#22c55e55",
        tension: 0.4,
      },
      {
        label: "Pending",
        data: sampleAppointments.map((a) => a.pending),
        borderColor: "#f59e0b",
        backgroundColor: "#f59e0b55",
        tension: 0.4,
      },
      {
        label: "Cancelled",
        data: sampleAppointments.map((a) => a.cancelled),
        borderColor: "#ef4444",
        backgroundColor: "#ef444455",
        tension: 0.4,
      },
    ],
  };

  const feedbackChartData = {
    labels: ["1 Star", "2 Star", "3 Star", "4 Star", "5 Star"],
    datasets: [
      {
        label: "Feedback Count",
        data: [1, 1, 1, 2, 2],
        backgroundColor: [
          "#ef4444",
          "#f97316",
          "#fbbf24",
          "#22c55e",
          "#2563eb",
        ],
      },
    ],
  };

  const usersChartData = {
    labels: sampleUsers.map((u) => u.name),
    datasets: [
      {
        label: "Joined Users",
        data: [1, 1, 1],
        backgroundColor: ["#3b82f6", "#6366f1", "#8b5cf6"],
      },
    ],
  };

  const petsChartData = {
    labels: ["Dogs", "Cats"],
    datasets: [
      {
        label: "Pets",
        data: [
          samplePets.filter((p) => p.type === "Dog").length,
          samplePets.filter((p) => p.type === "Cat").length,
        ],
        backgroundColor: ["#22c55e", "#fbbf24"],
      },
    ],
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "appointments":
        return <Line data={appointmentsChartData} />;
      case "feedbacks":
        return <Pie data={feedbackChartData} />;
      case "users":
        return <Bar data={usersChartData} />;
      case "pets":
        return <Pie data={petsChartData} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
      <Header title="Reports & Analytics" />

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow flex flex-col">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Appointments
          </p>
          <h2 className="text-2xl font-bold">{totalAppointments}</h2>
          <p className="text-green-500 mt-1">{completedAppointments} completed</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow flex flex-col">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Customer Feedback
          </p>
          <h2 className="text-2xl font-bold">{averageRating.toFixed(1)}/5</h2>
          <p className="text-green-500 mt-1">{positiveFeedback} positive</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow flex flex-col">
          <p className="text-sm text-gray-500 dark:text-gray-400">New Users</p>
          <h2 className="text-2xl font-bold">{userGrowth}</h2>
          <p className="text-gray-400 mt-1">Last 30 days</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow flex flex-col">
          <p className="text-sm text-gray-500 dark:text-gray-400">Registered Pets</p>
          <h2 className="text-2xl font-bold">{petGrowth}</h2>
          <p className="text-gray-400 mt-1">Last 30 days</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-4 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl ${
              activeTab === tab.id
                ? "bg-blue-500 text-white"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Charts */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Reports;