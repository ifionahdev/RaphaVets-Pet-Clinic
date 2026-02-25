import { Line, Doughnut, Bar } from "react-chartjs-2";
import StatsCard from "./StatsCard";

const AppointmentsReport = () => {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
        Appointments Analytics
      </h2>

      {/* KPI */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Appointments" value="1,248" change="+12%" />
        <StatsCard title="Completion Rate" value="82%" change="High" />
        <StatsCard title="Cancelled" value="96" change="-4%" />
        <StatsCard title="Today" value="34" change="Active" />
      </div>

      {/* CHARTS */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-[#111] p-5 rounded-xl">
          <h3 className="font-semibold mb-4">Weekly Trend</h3>
          <div className="h-[260px]">
            <Line
              data={{
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                datasets: [
                  { 
                    data: [12, 19, 14, 22, 18, 25, 30],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                    fill: true
                  }
                ]
              }}
              options={{ 
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false }
                }
              }}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-[#111] p-5 rounded-xl">
          <h3 className="font-semibold mb-4">Status Breakdown</h3>
          <Doughnut 
            data={{
              labels: ["Completed", "Upcoming", "Pending", "Cancelled"],
              datasets: [
                { 
                  data: [65, 15, 10, 7],
                  backgroundColor: ['#22c55e', '#3b82f6', '#eab308', '#ef4444'],
                  borderWidth: 0
                }
              ]
            }}
            options={{
              plugins: {
                legend: { position: 'bottom' }
              }
            }}
          />
        </div>

        <div className="lg:col-span-3 bg-white dark:bg-[#111] p-5 rounded-xl">
          <h3 className="font-semibold mb-4">Peak Hours</h3>
          <div className="h-[260px]">
            <Bar
              data={{
                labels: ["8AM", "10AM", "12PM", "2PM", "4PM"],
                datasets: [
                  { 
                    data: [5, 12, 18, 9, 7],
                    backgroundColor: '#3b82f6',
                    borderRadius: 6
                  }
                ]
              }}
              options={{ 
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false }
                }
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentsReport;