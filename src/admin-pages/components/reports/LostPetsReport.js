import { Line, Doughnut } from "react-chartjs-2";
import StatsCard from "./StatsCard";

const LostPetsReport = () => {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
        Lost Pets Tracking
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Reports" value="312" change="+6%" />
        <StatsCard title="Found" value="198" change="+9%" />
        <StatsCard title="Active Cases" value="114" change="-2%" />
        <StatsCard title="Found Rate" value="63%" change="Good" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-[#111] p-5 rounded-xl">
          <h3 className="font-semibold mb-4">Reports per Month</h3>
          <div className="h-[260px]">
            <Line
              data={{
                labels:["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
                datasets:[
                  { 
                    data:[30,45,38,50,60,72],
                    borderColor: '#f97316',
                    backgroundColor: 'rgba(249, 115, 22, 0.1)',
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
          <h3 className="font-semibold mb-4">Found Status</h3>
          <Doughnut
            data={{
              labels:["Found","Not Yet Found"],
              datasets:[
                { 
                  data:[63,37],
                  backgroundColor: ['#22c55e', '#ef4444'],
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

export default LostPetsReport;