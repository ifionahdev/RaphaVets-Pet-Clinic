import { Line, Doughnut } from "react-chartjs-2";
import StatsCard from "./StatsCard";

const UsersReport = () => {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
        Users Analytics
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Users" value="3,421" change="+18%" />
        <StatsCard title="New This Month" value="284" change="+9%" />
        <StatsCard title="Active Users" value="2,876" change="↗ high" />
        <StatsCard title="Admins" value="6" change="Stable" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-[#111] p-5 rounded-xl">
          <h3 className="font-semibold mb-4">User Registration Trend</h3>
          <div className="h-[260px]">
            <Line
              data={{
                labels: ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
                datasets: [
                  { 
                    data: [120, 190, 170, 220, 260, 284],
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
          <h3 className="font-semibold mb-4">User Roles</h3>
          <Doughnut
            data={{
              labels: ["Clients","Veterinarian","Admins"],
              datasets: [
                { 
                  data: [3292, 1, 3],
                  backgroundColor: ['#3b82f6', '#8b5cf6', '#ec4899'],
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
      </div>
    </section>
  );
};

export default UsersReport;