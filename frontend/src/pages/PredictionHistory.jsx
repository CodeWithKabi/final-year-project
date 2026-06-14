import DashboardLayout from "../components/DashboardLayout";
import React, { useEffect, useState } from "react";

import axios from "axios";
import {
  Activity,
  Search,
  CheckCircle2,
  AlertTriangle,
  Heart,
  Brain,
  TrendingUp,
  Clock,
  Shield,
  Zap,
  ChevronRight,
  BarChart3,
  Users,
  Filter,
} from "lucide-react";

export default function PredictionHistory() {
  
//history
const [historyData, setHistoryData] = useState([]);
useEffect(() => {

  fetchHistory();

}, []);

const fetchHistory = async () => {

  try {

    const response = await axios.get(
           "https://sleep-disorder-backend-s7oq.onrender.com/history"
    );

   setHistoryData(response.data);

  } catch (error) {

    console.log(error);

  }

};

  const [search, setSearch] = useState("");

 const filteredHistory = historyData.filter((item) =>
  (item.patient_name || "")
  .toLowerCase()
  .includes(search.toLowerCase())
  );

const getRiskConfig = (risk) => {

  if (risk === "Low Risk")
    return {
      bg: "bg-emerald-500/15",
      text: "text-emerald-400",
      border: "border-emerald-500/30",
      dot: "bg-emerald-400",
    };

  if (risk === "Moderate Risk")
    return {
      bg: "bg-amber-500/15",
      text: "text-amber-400",
      border: "border-amber-500/30",
      dot: "bg-amber-400",
    };

  return {
    bg: "bg-red-500/15",
    text: "text-red-400",
    border: "border-red-500/30",
    dot: "bg-red-400",
  };
};

  const getPredictionIcon = (prediction) => {
    if (prediction === "Healthy") return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
    if (prediction === "Sleep Apnea") return <AlertTriangle className="w-4 h-4 text-red-400" />;
    return <Brain className="w-4 h-4 text-amber-400" />;
  };

const avgConfidence = historyData.length
  ? (
      historyData.reduce(
        (sum, item) => sum + item.confidence,
        0
      ) / historyData.length
    ).toFixed(1)
  : 0;

const highRiskCount = historyData.filter(
  (i) => i.risk_level === "High Risk"
).length; 
const healthyCount = historyData.filter(
  (i) => i.prediction === "Healthy"
).length;
const riskDist = {

  Low: historyData.filter(
    (i) => i.risk_level === "Low Risk"
  ).length,

  Moderate: historyData.filter(
    (i) => i.risk_level === "Moderate Risk"
  ).length,

  High: historyData.filter(
    (i) => i.risk_level === "High Risk"
  ).length,

};
  
  return (
    <DashboardLayout title=" History">

      
      <div className="bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900">

        {/* AMBIENT BACKGROUND ORBS */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-600/8 rounded-full blur-3xl" />
          <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-sky-600/6 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto space-y-6">

          {/* PAGE HEADER */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 animate-fade-in">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-semibold text-blue-400 tracking-widest uppercase">AI Analytics</span>
              </div>
              
              <p className="text-slate-400 mt-2 text-base lg:text-lg leading-relaxed">
                Monitor previous AI healthcare predictions and patient risk analytics
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-2.5">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm text-slate-300 font-medium">Live Monitoring</span>
              </div>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-2.5">
                <span className="text-sm text-slate-300 font-medium">May 2026</span>
              </div>
            </div>
          </div>

          {/* SUMMARY ANALYTICS CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {/* Total Predictions */}
            <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-2xl hover:bg-white/8 hover:border-blue-500/30 hover:shadow-blue-500/10 hover:scale-[1.02] transition-all duration-300 cursor-default">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-6 h-6 text-blue-400" />
                </div>
                <p className="text-slate-400 text-sm font-medium mb-1">Total Predictions</p>
                <h2 className="text-4xl font-bold text-white tabular-nums">{historyData.length}</h2>
                <div className="flex items-center gap-1 mt-3">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-xs text-emerald-400 font-medium">Active records</span>
                </div>
              </div>
            </div>

            {/* Healthy Cases */}
            <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-2xl hover:bg-white/8 hover:border-emerald-500/30 hover:shadow-emerald-500/10 hover:scale-[1.02] transition-all duration-300 cursor-default">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
                <p className="text-slate-400 text-sm font-medium mb-1">Healthy Cases</p>
                <h2 className="text-4xl font-bold text-white tabular-nums">{healthyCount}</h2>
                <div className="flex items-center gap-1 mt-3">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-xs text-emerald-400 font-medium">
                    {historyData.length ? Math.round((healthyCount / historyData.length) * 100) : 0}% of total
                  </span>
                </div>
              </div>
            </div>

            {/* High Risk */}
            <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-2xl hover:bg-white/8 hover:border-red-500/30 hover:shadow-red-500/10 hover:scale-[1.02] transition-all duration-300 cursor-default">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-600/10 border border-red-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </div>
                <p className="text-slate-400 text-sm font-medium mb-1">High Risk Cases</p>
                <h2 className="text-4xl font-bold text-white tabular-nums">{highRiskCount}</h2>
                <div className="flex items-center gap-1 mt-3">
                  <Zap className="w-3.5 h-3.5 text-red-400" />
                  <span className="text-xs text-red-400 font-medium">Requires attention</span>
                </div>
              </div>
            </div>

            {/* Avg Confidence */}
            <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-2xl hover:bg-white/8 hover:border-cyan-500/30 hover:shadow-cyan-500/10 hover:scale-[1.02] transition-all duration-300 cursor-default">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border border-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="w-6 h-6 text-cyan-400" />
                </div>
                <p className="text-slate-400 text-sm font-medium mb-1">Avg Confidence</p>
                <h2 className="text-4xl font-bold text-white tabular-nums">{avgConfidence}<span className="text-2xl text-slate-400">%</span></h2>
                <div className="flex items-center gap-1 mt-3">
                  <Brain className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-xs text-cyan-400 font-medium">AI accuracy score</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI INSIGHTS + RISK DISTRIBUTION ROW */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

            {/* AI Insights Panel */}
            <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/20 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">AI Insights</h3>
                    <p className="text-xs text-slate-500">Automated analysis</p>
                  </div>
                </div>
                <span className="text-xs bg-blue-500/15 text-blue-400 border border-blue-500/25 px-3 py-1 rounded-full font-medium">Live</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-white/4 border border-white/8 rounded-2xl p-4 hover:bg-white/6 transition-colors duration-200">
                  <div className="w-8 h-8 rounded-xl bg-red-500/15 border border-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">High-risk patient detected</p>
                   <div className="text-xs text-slate-400 mt-1">
  {historyData.slice(0,3).map((item) => (
    <div key={item.id}>
      {item.patient_name} — {item.prediction}
    </div>
  ))}
</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600 flex-shrink-0 mt-1" />
                </div>
                <div className="flex items-start gap-3 bg-white/4 border border-white/8 rounded-2xl p-4 hover:bg-white/6 transition-colors duration-200">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Model performing optimally</p>
                    <p className="text-xs text-slate-400 mt-0.5">Average confidence at {avgConfidence}% across {historyData.length} recent predictions.</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600 flex-shrink-0 mt-1" />
                </div>
                <div className="flex items-start gap-3 bg-white/4 border border-white/8 rounded-2xl p-4 hover:bg-white/6 transition-colors duration-200">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Users className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Moderate risk flagged</p>
                    <p className="text-xs text-slate-400 mt-0.5">{historyData.slice(0,3).map((item) => (
  <div key={item.id}>
    <p>
      {item.patient_name} — {item.prediction}
    </p>
  </div>
))}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600 flex-shrink-0 mt-1" />
                </div>
              </div>
            </div>

            {/* Risk Distribution */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/20 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">Risk Distribution</h3>
                  <p className="text-xs text-slate-500">Current breakdown</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Low Risk", count: riskDist.Low, color: "bg-emerald-500", textColor: "text-emerald-400", bg: "bg-emerald-500/10" },
                  { label: "Moderate", count: riskDist.Moderate, color: "bg-amber-500", textColor: "text-amber-400", bg: "bg-amber-500/10" },
                  { label: "High Risk", count: riskDist.High, color: "bg-red-500", textColor: "text-red-400", bg: "bg-red-500/10" },
                ].map(({ label, count, color, textColor, bg }) => {
                  const pct = historyData.length? Math.round((count / historyData.length) * 100) : 0;
                  return (
                    <div key={label}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-300 font-medium">{label}</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-semibold ${textColor}`}>{count} cases</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${bg} ${textColor}`}>{pct}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-white/6 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${color} transition-all duration-700`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 pt-5 border-t border-white/8">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Total analyzed</span>
                  <span className="text-sm font-bold text-white">{historyData.length} patients</span>
                </div>
              </div>
            </div>
          </div>

          {/* SEARCH + TABLE SECTION */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">

            {/* Table Header */}
            <div className="p-6 border-b border-white/8">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-xl font-bold text-white">Prediction Records</h2>
                    <span className="bg-blue-500/15 text-blue-400 border border-blue-500/25 text-xs font-semibold px-3 py-1 rounded-full">
                      {filteredHistory.length} records
                    </span>
                  </div>
                  <p className="text-sm text-slate-500">Complete AI-generated patient prediction log</p>
                </div>
                <div className="flex items-center gap-3">
                  {/* Search */}
                  <div className="relative flex items-center">
                    <Search className="absolute left-3.5 w-4 h-4 text-slate-500 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Search patient..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="bg-white/8 border border-white/12 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-200 w-56"
                    />
                  </div>
                  <button className="flex items-center gap-2 bg-white/8 border border-white/12 rounded-2xl px-4 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/12 transition-all duration-200">
                    <Filter className="w-4 h-4" />
                    <span className="hidden sm:inline">Filter</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/6">
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">Patient</th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">Prediction</th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">Confidence</th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">Risk Level</th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">Date</th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHistory.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                            <Search className="w-8 h-8 text-slate-600" />
                          </div>
                          <p className="text-slate-400 font-medium">No patients found</p>
                          <p className="text-slate-600 text-sm">Try adjusting your search query</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredHistory.map((item, idx) => {
                      const riskCfg = getRiskConfig(item.risk_level);
                      return (
                        <tr
                          key={item.id}
                          className={`group border-b border-white/4 hover:bg-white/4 transition-all duration-200 ${idx === filteredHistory.length - 1 ? "border-b-0" : ""}`}
                        >
                          {/* Patient */}
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/15 flex items-center justify-center flex-shrink-0">
                                <span className="text-sm font-bold text-blue-400">
                                  {item.patient_name.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors duration-200">{item.patient_name}</p>
                                <p className="text-xs text-slate-500">ID-{String(item.id).padStart(4, "0")}</p>
                              </div>
                            </div>
                          </td>

                          {/* Prediction */}
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-2">
                              {getPredictionIcon(item.prediction)}
                              <span className="text-sm font-medium text-slate-200">{item.prediction}</span>
                            </div>
                          </td>

                          {/* Confidence */}
                          <td className="px-6 py-5">
                            <div className="flex flex-col gap-1.5">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-white tabular-nums">{item.confidence}%</span>
                              </div>
                              <div className="w-24 bg-white/8 rounded-full h-1.5 overflow-hidden">
                                <div
                                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-700"
                                  style={{ width: `${item.confidence}%` }}
                                />
                              </div>
                            </div>
                          </td>

                          {/* Risk */}
                          <td className="px-6 py-5">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border ${riskCfg.bg} ${riskCfg.text} ${riskCfg.border}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${riskCfg.dot} animate-pulse`} />
                              {item.risk_level}
                            </span>
                          </td>

                          {/* Date */}
                          <td className="px-6 py-5">
  <span className="text-sm text-slate-300">
    {item.created_at?.split(" ")[0]}
  </span>
</td>

                          {/* Time */}
                         
<td className="px-6 py-5">
  <div className="flex items-center gap-1.5">
    <Clock
      className="w-3.5 h-3.5 text-slate-500"
    />

    <span className="text-sm text-slate-300">
      {item.created_at?.split(" ")[1]}
    </span>
  </div>
</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            {filteredHistory.length > 0 && (
              <div className="px-6 py-4 border-t border-white/6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="text-xs text-slate-500">
                  Showing <span className="text-slate-300 font-semibold">{filteredHistory.length}</span> of{" "}
                  <span className="text-slate-300 font-semibold">{historyData.length}</span> records
                </p>
                <div className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-xs text-slate-500">Last updated: May 12, 2026</span>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}