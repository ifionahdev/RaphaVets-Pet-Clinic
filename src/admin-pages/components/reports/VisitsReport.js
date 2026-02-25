import { Line, Bar } from "react-chartjs-2";
import StatsCard from "./StatsCard";

const VisitsReport = () => {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
        Clinic Visits
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Visits" value="5,421" change="+14%" />
        <StatsCard title="Today" value="86" change="Active" />
        <StatsCard title="Peak Day" value="Saturday" change="↗" />
        <StatsCard title="Avg / Day" value="124" change="+6%" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#111] p-5 rounded-xl">
          <h3 className="font-semibold mb-4">Daily Visits Trend</h3>
          <div className="h-[260px]">
            <Line
              data={{
                labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
                datasets:[
                  { 
                    data:[90,110,130,125,140,180,160],
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
          <h3 className="font-semibold mb-4">Visits per Service</h3>
          <div className="h-[260px]">
            <Bar
              data={{
                labels:["Consultation","Vaccination","Grooming","Surgery"],
                datasets:[
                  { 
                    data:[220,300,180,90],
                    backgroundColor: ['#3b82f6', '#8b5cf6', '#ec4899', '#f97316'],
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

export default VisitsReport;