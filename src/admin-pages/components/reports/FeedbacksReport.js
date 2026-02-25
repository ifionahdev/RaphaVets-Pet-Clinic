import { Doughnut, Line } from "react-chartjs-2";
import StatsCard from "./StatsCard";

const FeedbacksReport = () => {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
        Customer Feedback
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Reviews" value="1,024" change="+10%" />
        <StatsCard title="Avg Rating" value="4.6" change="Excellent" />
        <StatsCard title="5★ Reviews" value="780" change="+12%" />
        <StatsCard title="Low Ratings" value="42" change="-3%" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#111] p-5 rounded-xl">
          <h3 className="font-semibold mb-4">Ratings Breakdown</h3>
          <Doughnut
            data={{
              labels:["5★","4★","3★","2★","1★"],
              datasets:[
                { 
                  data:[60,25,8,4,3],
                  backgroundColor: ['#22c55e', '#84cc16', '#eab308', '#f97316', '#ef4444'],
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

        <div className="lg:col-span-2 bg-white dark:bg-[#111] p-5 rounded-xl">
          <h3 className="font-semibold mb-4">Feedback Trend</h3>
          <div className="h-[260px]">
            <Line
              data={{
                labels: ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
                datasets: [
                  { 
                    label: 'Positive',
                    data: [45, 52, 48, 61, 58, 72],
                    borderColor: '#22c55e',
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    tension: 0.4,
                    fill: false
                  },
                  { 
                    label: 'Negative',
                    data: [8, 6, 10, 7, 5, 4],
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    tension: 0.4,
                    fill: false
                  }
                ]
              }}
              options={{ 
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'bottom' }
                }
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbacksReport;