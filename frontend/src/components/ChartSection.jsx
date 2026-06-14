import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer
} from "recharts";
import axios from "axios";
import { useState, useEffect } from "react";
import { LabelList } from "recharts";
const COLORS = ["#22c55e", "#facc15", "#ef4444"];



export default function ChartSection() {

  const [analytics, setAnalytics] = useState(null);

const pieData = analytics
  ? [
      {
        name: "Healthy",
        value: analytics.healthy,
      },
      {
        name: "Insomnia",
        value: analytics.insomnia,
      },
      {
        name: "Sleep Apnea",
        value: analytics.sleep_apnea,
      },
    ]
  : [];
 
const barData = [
  {
    name: "XGBoost",
    accuracy: 95.08,
  },
  {
    name: "SVM + LR",
    accuracy: 82.30,
  },
];


useEffect(() => {
  axios
   .get("https://sleep-disorder-backend-s7oq.onrender.com/analytics")
    .then((res) => {
      setAnalytics(res.data);
    })
    .catch((err) => console.log(err));
}, []);

const hasData =
  analytics &&
  (
    analytics.healthy > 0 ||
    analytics.insomnia > 0 ||
    analytics.sleep_apnea > 0
  );
  return (
    <div className="grid">

     <div
  className="glass-card"
  style={{
    height: "350px",
    minHeight: "350px",
    padding: "20px",
  }}
>
  <h3>Sleep Disorder Distribution</h3>

  {!hasData ? (
    <div
  className="flex flex-col items-center justify-center h-[300px]"
>
  <div className="text-6xl mb-4">📈</div>

  <h3 className="text-white text-xl font-bold">
    No Analytics Available
  </h3>

  <p className="text-gray-300 mt-2">
    Run patient predictions to generate
    charts and healthcare insights.
  </p>
</div>
  ) : (
    <div
  style={{
    width: "100%",
    height: "280px",
  }}
>
  <ResponsiveContainer
    width="100%"
    height="100%"
  >
      <PieChart>
        <Pie
          data={pieData}
          dataKey="value"
          outerRadius={100}
        >
          {pieData.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index]}
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
    </div>
  )}
</div>

      <div className="card" style={{ height: "350px" }}>
        <h3>Model Accuracy Comparison</h3>

        <ResponsiveContainer width="100%" height={300}>
        <BarChart
  data={barData}
  margin={{
    top: 20,
    right: 20,
    left: 0,
    bottom: 5,
  }}
>
  <XAxis dataKey="name" />
  <YAxis domain={[0, 100]} />
  <Tooltip />

  <Bar
    dataKey="accuracy"
    fill="#7c3aed"
    radius={[10, 10, 0, 0]}
  >
    <LabelList
      dataKey="accuracy"
      position="top"
    />
  </Bar>
</BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}