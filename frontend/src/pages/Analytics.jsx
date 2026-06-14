import DashboardLayout from "../components/DashboardLayout";

import React, { useEffect, useState } from "react";

import axios from "axios";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";
export default function Analytics() {
const [analytics, setAnalytics] = useState(null);
const hasData =
  analytics &&
  analytics.total_predictions > 0;
useEffect(() => {

  fetchAnalytics();

}, []);

const fetchAnalytics = async () => {

  try {

    const response = await axios.get(
      "https://sleep-disorder-backend-s7oq.onrender.com/analytics"
    );

    setAnalytics(response.data);

  } catch (error) {

    console.log(error);

  }

};
const chartData = analytics
  ? [
      {
        name: "Low Risk",
        value: analytics.low_risk_cases
      },
      {
        name: "Moderate",
        value: analytics.moderate_cases
      },
      {
        name: "High Risk",
        value: analytics.high_risk_cases
      }
    ]
  : [];


  return (

  <DashboardLayout title=" Analytics">

    <div className="p-4 md:p-6 min-h-screen">
      {/* ===================================== */}
      {/* PAGE TITLE */}
      {/* ===================================== */}

    <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent mb-10">
        AI Healthcare Analytics
      </h1>

      {/* ===================================== */}
      {/* ANALYTICS CARDS */}
      {/* ===================================== */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">

        {/* TOTAL PREDICTIONS */}

        <div className="glass-card backdrop-blur-lg rounded-3xl p-6 border border-white/20 hover:scale-[1.02] transition duration-300">

          <h2 className="text-gray-300">
            Total Predictions
          </h2>

          <p className="text-4xl text-white font-bold mt-3">
            {analytics?.total_predictions || 0}
          </p>

        </div>

        {/* LOW RISK */}

        <div className="glass-card backdrop-blur-lg rounded-3xl p-6 border border-white/20 hover:scale-[1.02] transition duration-300">

          <h2 className="text-gray-300">
            Low Risk
          </h2>

          <p className="text-4xl text-green-400 font-bold mt-3 ">
            {analytics?.low_risk_cases || 0}
          </p>

        </div>

        {/* MODERATE RISK */}

        <div className="glass-card backdrop-blur-lg rounded-3xl p-6 border border-white/20 hover:scale-[1.02] transition duration-300">

          <h2 className="text-gray-300">
            Moderate Risk
          </h2>

          <p className="text-4xl text-yellow-400 font-bold mt-3 ">
            {analytics?.moderate_cases || 0}
          </p>

        </div>

        {/* HIGH RISK */}

        <div className="glass-card backdrop-blur-lg rounded-3xl p-6 border border-white/20 hover:scale-[1.02] transition duration-300">

          <h2 className="text-gray-300">
            High Risk
          </h2>

          <p className="text-4xl text-red-400 font-bold mt-3">
            {analytics?.high_risk_cases || 0}
          </p>

        </div>

        {/* AVG CONFIDENCE */}

        <div className="glass-card backdrop-blur-lg rounded-3xl p-6 border border-white/20 hover:scale-[1.02] transition duration-300">

          <h2 className="text-gray-300">
            Avg Confidence
          </h2>

          <p className="text-4xl text-cyan-400 font-bold mt-3">
            {analytics?.average_confidence || 0}%
          </p>

        </div>

      </div>

      {/* ===================================== */}
      {/* CHART SECTION */}
      {/* ===================================== */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 " style={{margin:"15px 0px"}}>

        {/* PIE CHART */}
<div className="glass-card backdrop-blur-lg rounded-3xl p-6 border border-white/20">

  <h2 className="text-2xl font-bold text-white mb-6">
    Risk Distribution
  </h2>

  {!hasData ? (
    <div className="h-[300px] flex flex-col items-center justify-center">
      <div className="text-6xl mb-4">📊</div>

      <h3 className="text-white text-xl font-bold">
        No Analytics Data
      </h3>

      <p className="text-gray-300 mt-2 text-center">
        Run patient predictions to generate
        healthcare analytics.
      </p>
    </div>
  ) : (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          outerRadius={90}
          label
        >
          <Cell fill="#22c55e" />
          <Cell fill="#f59e0b" />
          <Cell fill="#ef4444" />
        </Pie>

        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  )}

</div>

        {/* BAR CHART */}

      <div className="glass-card backdrop-blur-lg rounded-3xl p-6 border border-white/20">

  <h2 className="text-2xl font-bold text-white mb-6">
    Risk Comparison
  </h2>

  {!hasData ? (
    <div className="h-[350px] flex flex-col items-center justify-center">
      <div className="text-6xl mb-4">📈</div>

      <h3 className="text-white text-xl font-bold">
        No Prediction Records
      </h3>

      <p className="text-gray-300 mt-2 text-center">
        Analytics charts will appear after
        predicting patient records.
      </p>
    </div>
  ) : (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />

        <Bar
          dataKey="value"
          fill="#8b5cf6"
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )}

</div>
        </div>

      {/* ===================================== */}
      {/* AI INSIGHTS */}
      {/* ===================================== */}

      <h2 className="text-3xl font-bold text-white mb-6">
  🤖 AI Healthcare Insights
</h2>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

  <div className="bg-green-500/10 border border-green-400/30 rounded-2xl p-5">
    <h3 className="text-green-400 font-bold mb-3">
      🩺 Early Detection
    </h3>

    <p className="text-gray-300">
      Sleep disorders can be identified early,
      helping healthcare professionals take
      preventive actions.
    </p>
  </div>

  <div className="bg-blue-500/10 border border-blue-400/30 rounded-2xl p-5">
    <h3 className="text-blue-400 font-bold mb-3">
      📈 Risk Monitoring
    </h3>

    <p className="text-gray-300">
      Continuous analytics helps monitor
      patient risk levels and overall trends.
    </p>
  </div>

  <div className="bg-purple-500/10 border border-purple-400/30 rounded-2xl p-5">
    <h3 className="text-purple-400 font-bold mb-3">
      🤖 XGBoost Intelligence
    </h3>

    <p className="text-gray-300">
      Advanced XGBoost learning provides
      accurate and reliable sleep disorder
      predictions.
    </p>
  </div>

</div>
    </div>

  </DashboardLayout>

);

}