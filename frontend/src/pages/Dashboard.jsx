import DashboardLayout from "../components/DashboardLayout";

import ChartSection from "../components/ChartSection";
import CountUp from "react-countup";
import { FaChartLine, FaBullseye, FaExclamationTriangle } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Dashboard() {

    const [stats, setStats] = useState({
    total_predictions: 0,
    accuracy: 0,
    high_risk: 0,
    best_model: ""
  });
  useEffect(() => {

  axios
    .get("http://127.0.0.1:5000/dashboard")
    .then((res) => {

      setStats(res.data);

    })
    .catch((err) => {

      console.log(err);

    });

}, []);
  return (
    <DashboardLayout title=" Dashboard">
      <div>
        <div
          className="glass-card welcome-card"
          style={{
            marginBottom: "30px",
            padding: "35px",
          }}
        >
          <h1
            className="welcome-title"
            style={{
              fontSize: "40px",
              marginBottom: "10px",
              color: "white",
            }}
          >
            Welcome Back 👋
          </h1>

          <p
            className="welcome-text"
            style={{
              color: "#cbd5e1",
              fontSize: "18px",
              lineHeight: "1.7",
            }}
          >
            Smart AI analytics for sleep disorder detection and patient
            monitoring.
          </p>
        </div>

        {/* STAT CARDS */}

        <div className="grid dashboard-grid">
          <div
            className="glass-card"
            style={{
              padding: "30px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "15px",
              }}
            >
              <FaChartLine size={20} color="#38bdf8" />

              <h3
                style={{
                  color: "#cbd5e1",
                  margin: 0,
                  fontSize: "18px",
                }}
              >
                Total Predictions
              </h3>
            </div>
            <h1
              style={{
                fontSize: "52px",
                fontWeight: "bold",
                color: "white",
              }}
            >
              <CountUp
  end={stats.total_predictions}
  duration={2}
/>
            </h1>
          </div>

          <div
            className="glass-card"
            style={{
              padding: "30px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "15px",
              }}
            >
              <FaBullseye size={20} color="#22c55e" />

              <h3
                style={{
                  color: "#cbd5e1",
                  margin: 0,
                  fontSize: "18px",
                }}
              >
                AI Accuracy
              </h3>
            </div>
            <h1
              style={{
                fontSize: "52px",
                fontWeight: "bold",
                color: "white",
              }}
            >
              <CountUp
  end={stats.accuracy}
  duration={2}
  suffix="%"
/>
            </h1>
          </div>

          <div
            className="glass-card"
            style={{
              padding: "30px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "15px",
              }}
            >
              <FaExclamationTriangle size={20} color="#ef4444" />

              <h3
                style={{
                  color: "#cbd5e1",
                  margin: 0,
                  fontSize: "18px",
                }}
              >
                High Risk Cases
              </h3>
            </div>
            <h1
              style={{
                fontSize: "52px",
                fontWeight: "bold",
                color: "white",
              }}
            >
              <CountUp
  end={stats.high_risk}
  duration={2}
/>
            </h1>
          </div>
        </div>


        <div style={{ marginTop: "20px" }}>

          <ChartSection />
        </div>

       {/* AI INSIGHTS */}

{stats.total_predictions === 0 ? (
  <div className="insight-item">
    📊 No patient predictions available yet.
    Run a prediction to generate analytics.
  </div>
) : (
  <>
    

<div
  className="glass-card"
  style={{
    marginTop: "20px",
    padding: "25px",
  }}
>
  <h2
    style={{
      marginBottom: "20px",
      color: "#fff",
    }}
  >
    🤖 AI Insights
  </h2>

  <div className="insight-item">
    🎯 Total Predictions: {stats.total_predictions}
  </div>

  <div className="insight-item">
    ⚠ High Risk Patients: {stats.high_risk}
  </div>

  <div className="insight-item">
    🟢 Low Risk Patients: {stats.low_risk}
  </div>

  <div className="insight-item">
    📊 Average Confidence: {stats.avg_confidence}%
  </div>

  <div className="insight-item">
    🏆 Best Performing Model: {stats.best_model}
  </div>

  <div className="insight-item">
    🧠 AI Recommendation:
    {stats.high_risk > 0
      ? " Immediate clinical review is recommended for high-risk patients."
      : " No critical sleep disorder cases detected."}
  </div>
</div>
  </>
)}

      </div>
    </DashboardLayout>
  );
}
