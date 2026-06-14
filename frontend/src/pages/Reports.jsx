import React from "react";

import DashboardLayout from "../components/DashboardLayout";

import jsPDF from "jspdf";

import html2canvas from "html2canvas";

import { useEffect, useState } from "react";

import axios from "axios";

import Loader from "../components/Loader";  
export default function Reports() {

  //DOWNLOAD SECTION

const downloadPDF = async () => {

  const input =
    document.getElementById("report-content");

  const canvas = await html2canvas(input, {
    scale: 2,
    useCORS: true
  });

  const imgData =
    canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");

  const pdfWidth =
    pdf.internal.pageSize.getWidth();

  const pdfHeight =
    (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(
    imgData,
    "PNG",
    0,
    0,
    pdfWidth,
    pdfHeight
  );

  pdf.save("sleep_report.pdf");

};

  const [report, setReport] = useState(null);
  useEffect(() => {

  fetchLatestReport();

}, []);

const fetchLatestReport = async () => {

  try {

    const response = await axios.get(
       "https://sleep-disorder-backend-s7oq.onrender.com/history"
    );

    if (response.data.length > 0) {

     setReport(response.data[0]);
    }
    setLoading(false);

  } catch (error) {
  
    console.log(error);
  setLoading(false);
  }

};
const tdStyle = {
  border: "1px solid #cbd5e1",
  padding: "14px",
  fontSize: "16px"
};
const getRecommendation = () => {

  // SLEEP APNEA RECOMMENDATION
  if (report?.prediction === "Sleep Apnea") {

    return `
      Maintain healthy sleep schedule,
      avoid alcohol before sleep,
      reduce obesity risk,
      and consult a sleep specialist.
    `;

  }

  // INSOMNIA RECOMMENDATION
  if (report?.prediction === "Insomnia") {

    return `
      Reduce stress,
      avoid mobile usage before bedtime,
      maintain fixed sleep timings,
      and practice meditation.
    `;

  }

  // HEALTHY RECOMMENDATION
  return `
    Excellent sleep health detected.
    Continue healthy lifestyle
    and maintain regular sleep habits.
  `;

};

const [loading, setLoading] = useState(true);

if (loading) {

  return <Loader />;

}
  return (

  <DashboardLayout title="Reports">

    {/* TOP STATISTICS */}

    <div
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(250px,1fr))",
    gap: "20px",
    marginBottom: "30px"
  }}
>

  {/* PREDICTION CARD */}

  <div className="glass-card">

    <p
      style={{
        color: "#cbd5e1",
        marginBottom: "10px",
        fontSize: "15px"
      }}
    >
      Prediction
    </p>

    <h1
      style={{
        color: "#ffffff",
        fontSize: "30px",
        margin: 0
      }}
    >
      {report?.prediction || "No Data"}
    </h1>

  </div>

  {/* CONFIDENCE CARD */}

  <div className="glass-card">

    <p
      style={{
        color: "#cbd5e1",
        marginBottom: "10px",
        fontSize: "15px"
      }}
    >
      Confidence
    </p>

    <h1
      style={{
        color: "#22d3ee",
        fontSize: "30px",
        margin: 0
      }}
    >
      {report?.confidence || 0}%
    </h1>

  </div>

  {/* RISK LEVEL CARD */}

  <div className="glass-card">

    <p
      style={{
        color: "#cbd5e1",
        marginBottom: "10px",
        fontSize: "15px"
      }}
    >
      Risk Level
    </p>

    <h1
      style={{
        color:
          report?.risk_level === "High Risk"
            ? "#ef4444"
            : report?.risk_level ===
              "Moderate Risk"
            ? "#facc15"
            : "#22c55e",

        fontSize: "30px",
        margin: 0
      }}
    >
      {report?.risk_level || "Unknown"}
    </h1>

  </div>

</div>
{/* REPORTS SECTION*/}

   <div
  id="report-content"
 style={{
  background: "white",
  position: "relative",
  overflow: "hidden",
  padding: "30px",
  borderRadius: "20px",
  color: "#111827",
  maxWidth: "900px",
  margin: "0 auto",
  minHeight: "auto",
  boxShadow:"0 10px 40px rgba(0,0,0,0.08)"
}}
>
<div
  style={{
    textAlign: "center",
    marginBottom: "10px"
  }}
>

  <img
    src="/logo.png"
    alt="logo"
    style={{
      width: "70px",
      height: "70px",
      objectFit: "contain"
    }}
  />

</div>
  {/* HEADER */}

  <div
    style={{
      textAlign: "center",
      marginBottom: "40px",
      borderBottom: "3px solid #0ea5e9",
      paddingBottom: "20px"
    }}
  >

    <h1
      style={{
        color: "#0f172a",
        marginBottom: "10px"
      }}
    >
      AI HEALTHCARE DIAGNOSTIC REPORT
    </h1>

    <p
      style={{
        color: "#64748b"
      }}
    >
      AI Sleep Disorder Detection System
    </p>
{/* GENEREATE DATE */}
<p
  style={{
    color: "#94a3b8",
    marginTop: "10px",
    fontSize: "14px"
  }}
>
  Generated On:
  {new Date().toLocaleDateString()}
</p>

  </div>

  {/* PATIENT DETAILS */}

  <div
    style={{
      marginBottom: "35px"
    }}
  >

    <h2
      style={{
        marginBottom: "20px",
        color: "#0f172a"
      }}
    >
      Patient Information
    </h2>

    <table
      style={{
        width: "100%",
        borderCollapse: "collapse"
      }}
    >

      <tbody>

        <tr>
          <td style={tdStyle}>Patient Name</td>
          <td style={tdStyle}>
            {report?.patient_name}
          </td>
        </tr>

        <tr>
          <td style={tdStyle}>Age</td>
          <td style={tdStyle}>
            {report?.age}
          </td>
        </tr>

        <tr>
  <td style={tdStyle}>
    Prediction
  </td>

  <td
    style={{
      ...tdStyle,
      color:
        report?.prediction === "Healthy"
          ? "#22c55e"
          : report?.prediction === "Insomnia"
          ? "#f59e0b"
          : "#ef4444",
      fontWeight: "bold"
    }}
  >
    {report?.prediction}
  </td>
</tr>

<tr>
  <td style={tdStyle}>
    Confidence
  </td>

  <td style={tdStyle}>
    {report?.confidence}%
  </td>
</tr>

        <tr>
          <td style={tdStyle}>Risk Level</td>
          <td style={tdStyle}>
            {report?.risk_level}
          </td>
        </tr>

      </tbody>

    </table>

  </div>

  {/* RECOMMENDATION */}

  <div
   style={{
  background: "#f8fafc",
  padding: "18px",
  borderRadius: "12px",
  lineHeight: "1.8",
  borderLeft: "5px solid #0ea5e9",
  fontSize: "15px"
}}
  >

    <h2
      style={{
        color: "#0f172a",
        marginBottom: "15px"
      }}
    >
      AI Clinical Recommendation
    </h2>

    <div
      style={{
        background: "#f1f5f9",
        padding: "20px",
        borderRadius: "12px",
        lineHeight: "1.8"
      }}
    >

{getRecommendation()}
      reduce stress levels,
      avoid late-night screen exposure,
      and consult a sleep specialist
      for clinical evaluation.

    </div>

<div
  style={{
    marginTop: "35px",
    textAlign: "right"
  }}
>

 
</div>

  </div>

  {/* FOOTER */}

 <div
  style={{
    marginTop: "50px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "1px solid #cbd5e1",
    paddingTop: "15px"
  }}
>

  <div>
    <p
      style={{
        margin: 0,
        color: "#64748b",
        fontSize: "13px"
      }}
    >
      Generated Medical Analysis Report
    </p>
  </div>

  <div style={{ textAlign: "right" }}>

    <div
      style={{
        width: "180px",
        borderTop: "2px solid #0f172a",
        marginBottom: "8px"
      }}
    />

    <h4 style={{ margin: 0 }}>
      AI Healthcare System
    </h4>

    <p
      style={{
        margin: 0,
        color: "#64748b",
        fontSize: "13px"
      }}
    >
      Authorized Diagnostic Report
    </p>

  </div>

</div>

<div
  style={{
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "80px",
    color: "rgba(15,23,42,0.04)",
    fontWeight: "bold",
    pointerEvents: "none"
  }}
>
  SLEEPAI
</div>
</div>
    {/* DOWNLOAD BUTTON */}

    <button
  onClick={downloadPDF}
  style={{
    background:
      "linear-gradient(to right,#06b6d4,#3b82f6)",
    border: "none",
    padding: "16px",
    borderRadius: "14px",
    color: "white",
    fontWeight: "bold",
    fontSize: "15px",
    cursor: "pointer",
    boxShadow:
      "0 10px 25px rgba(59,130,246,0.4)"
  }}
>
  ⬇ Download AI PDF Report
</button>

  </DashboardLayout>

);

}