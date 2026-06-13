import { useState } from "react";

import Papa from "papaparse";
import DashboardLayout from "../components/DashboardLayout";

import {
  FaCloudUploadAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaDatabase,
  FaHeartbeat,
  FaSearch,
} from "react-icons/fa";

import { motion } from "framer-motion";
import { saveAs } from "file-saver";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LabelList,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function Dataset() {
  // =========================================
  // STATES
  // =========================================

  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [error, setError] = useState("");

  const [preview, setPreview] = useState([]);

  const [search, setSearch] = useState("");

  const [stats, setStats] = useState({
    rows: 0,
    missing_values: 0,
    features: 8,
    readiness: "92%",
  });
  const [validation, setValidation] = useState(null);

  const requiredColumns = [
    "Age",

    "Gender",

    "Sleep Duration",

    "Stress Level",

    "BMI Category",

    "Heart Rate",

    "Daily Steps",

    "Sleep Disorder",
  ];
  const [pieData, setPieData] = useState([]);

  const [qualityData, setQualityData] = useState([]);

  // =========================================
  // HANDLE FILE UPLOAD
  // =========================================

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    // VALIDATION

    if (!selectedFile.name.endsWith(".csv")) {
      setError("Invalid file format. Please upload CSV.");

      return;
    }

    setFile(selectedFile);

    setError("");

    setLoading(true);

    setSuccess(false);

    // PARSE CSV

    Papa.parse(selectedFile, {
      header: true,

      skipEmptyLines: true,

      complete: (results) => {
        console.log(results.data);

        // SET TABLE DATA

        setPreview(results.data);
        const validationResult = validateDataset(results.data);

        setValidation(validationResult);
        //        {validation && (

        //   <motion.div
        //     initial={{
        //       opacity: 0,
        //       y: -10,
        //     }}

        //     animate={{
        //       opacity: 1,
        //       y: 0,
        //     }}

        //     transition={{
        //       duration: 0.4,
        //     }}

        //     className={`
        //       mt-5
        //       px-6
        //       py-5
        //       rounded-3xl
        //       shadow-xl
        //       border
        //       backdrop-blur-xl
        //       flex
        //       items-start
        //       gap-4

        //       ${
        //         validation.valid

        //           ? `
        //             bg-green-50/80
        //             border-green-200
        //           `

        //           : `
        //             bg-red-50/80
        //             border-red-200
        //           `
        //       }
        //     `}
        //   >

        //     {/* ICON */}

        //     <div
        //       className={`
        //         w-14
        //         h-14
        //         rounded-2xl
        //         flex
        //         items-center
        //         justify-center
        //         text-2xl
        //         shadow-md

        //         ${
        //           validation.valid

        //             ? `
        //               bg-green-100
        //               text-green-600
        //             `

        //             : `
        //               bg-red-100
        //               text-red-600
        //             `
        //         }
        //       `}
        //     >

        //       {validation.valid

        //         ? "✓"

        //         : "⚠"}

        //     </div>

        //     {/* TEXT */}

        //     <div>

        //       <h2
        //         className={`
        //           text-lg
        //           font-bold

        //           ${
        //             validation.valid

        //               ? "text-green-700"

        //               : "text-red-700"
        //           }
        //         `}
        //       >

        //         {validation.valid

        //           ? "Dataset Validation Successful"

        //           : "Dataset Validation Failed"}

        //       </h2>

        //       <p
        //         className={`
        //           mt-1
        //           text-sm
        //           leading-relaxed

        //           ${
        //             validation.valid

        //               ? "text-green-600"

        //               : "text-red-600"
        //           }
        //         `}
        //       >

        //         {validation.message}

        //       </p>

        //     </div>

        //   </motion.div>

        // )}

        // =========================================
        // CALCULATE MISSING VALUES
        // =========================================
        let missing = 0;

        results.data.forEach((row) => {
          Object.values(row).forEach((value) => {
            if (value === "" || value === null || value === undefined) {
              missing++;
            }
          });
        });

        // =========================================
        // DISORDER DISTRIBUTION
        // =========================================

        const disorderCounts = {};

        results.data.forEach((row) => {
          const disorder = row["Sleep Disorder"];

          if (disorder) {
            disorderCounts[disorder] = (disorderCounts[disorder] || 0) + 1;
          }
        });

        // CONVERT FOR PIE CHART

        const dynamicPieData = Object.keys(disorderCounts).map((key) => ({
          name: key,

          value: disorderCounts[key],
        }));

        setPieData(dynamicPieData);

        // =========================================
        // QUALITY DATA
        // =========================================

        setQualityData([
          {
            name: "Cleaned",
            value: results.data.length - missing,
          },

          {
            name: "Missing",
            value: missing,
          },
        ]);

        // CALCULATE MISSING VALUES

        // UPDATE ANALYTICS

        setStats({
          rows: results.data ? results.data.length : 0,

          missing_values: missing,

          features: results.data[0] ? Object.keys(results.data[0]).length : 0,

          readiness: missing === 0 ? "98%" : "85%",
        });

        setLoading(false);

        setSuccess(true);
      },

      error: () => {
        setError("CSV parsing failed");

        setLoading(false);
      },
    });
  };
  // =========================================
  // CHART DATA
  // =========================================

  const COLORS = ["#ec4899", "#7c3aed", "#22c55e", "#f59e0b"];

  const tableCell = {
    padding: "16px",
    textAlign: "center",
    fontSize: "15px",
    color: "#374151",
  };

  const duplicateCount =
    preview.length - new Set(preview.map((row) => JSON.stringify(row))).size;
  const cleanMissingValues = () => {
    const cleanedData = preview.map((row) => {
      const updatedRow = {};

      Object.keys(row).forEach((key) => {
        updatedRow[key] =
          String(row[key]).trim() === "" ||
          row[key] === null ||
          row[key] === undefined ||
          row[key] === "N/A"
            ? "Unknown"
            : row[key];
      });

      return updatedRow;
    });

    setPreview([...cleanedData]);
  };
  const exportCSV = () => {
    const headers = Object.keys(preview[0]).join(",");

    const rows = preview.map((row) => Object.values(row).join(","));

    const csvContent = [headers, ...rows].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    saveAs(blob, "cleaned_dataset.csv");
  };
  const totalCells = preview.length * stats.features;

  const missingPercent =
    totalCells > 0 ? ((stats.missing_values / totalCells) * 100).toFixed(0) : 0;

  const readinessScore = 100 - missingPercent - duplicateCount * 5;
  const removeDuplicates = () => {
    const uniqueData = [];

    const seen = new Set();

    preview.forEach((row) => {
      const stringRow = JSON.stringify(row);

      if (!seen.has(stringRow)) {
        seen.add(stringRow);

        uniqueData.push(row);
      }
    });

    setPreview(uniqueData);
  };
  const validateDataset = (data) => {
    // EMPTY DATASET

    if (!data || data.length === 0 || !data[0]) {
      return {
        valid: false,

        message: "Dataset is empty",
      };
    }

    // REMOVE EMPTY ROWS

    const validRows = data.filter((row) =>
      Object.values(row).some((value) => value !== ""),
    );

    if (validRows.length === 0) {
      return {
        valid: false,

        message: "Dataset contains no valid rows",
      };
    }

    // GET COLUMNS

    const uploadedColumns = Object.keys(validRows[0]);

    // CHECK MISSING COLUMNS

    const missingColumns = requiredColumns.filter(
      (column) => !uploadedColumns.includes(column),
    );

    if (missingColumns.length > 0) {
      return {
        valid: false,

        message: "Missing Columns: " + missingColumns.join(", "),
      };
    }

    return {
      valid: true,

      message: "Dataset validated successfully",
    };
  };
  console.log(pieData);
  return (
    <DashboardLayout title=" Dataset ">
      <div
        className="
    min-h-screen
    overflow-y-auto
    bg-gradient-to-br
    from-[#ede9fe]
    via-[#f5d0fe]
    to-[#fbcfe8]
  "
      >
        <div className="max-w-7xl mx-auto p-6 space-y-8">
          {/* ========================================= */}
          {/* PAGE HEADER */}
          {/* ========================================= */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <p className="text-gray-600">
              Upload and analyze healthcare sleep datasets for AI prediction
              systems.
            </p>
          </motion.div>
          {/* ========================================= */}
          {/* TOP GRID */}
          {/* ========================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* UPLOAD CARD */}

            <motion.div
              className="
      bg-white/40
      backdrop-blur-2xl
      rounded-3xl
      p-8
      shadow-2xl
      border
      border-white/30
    "
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Upload Healthcare Dataset
              </h2>

              <p className="text-gray-600 mb-6">
                Drag & Drop CSV dataset or click to browse
              </p>

              <label
                htmlFor="datasetUpload"
                className="
        border-2
        border-dashed
        border-purple-400
        rounded-3xl
        h-[220px]
        flex
        flex-col
        items-center
        justify-center
        cursor-pointer
        bg-white/30
        hover:bg-white/40
        transition-all
      "
              >
                <FaCloudUploadAlt className="text-6xl text-purple-600 mb-4" />

                <h3 className="text-xl font-bold text-gray-700">
                  Upload Sleep Dataset
                </h3>

                <p className="text-gray-500 text-sm mt-2">
                  Supported Format: CSV
                </p>

                {file && <div>{file.name}</div>}

                {/* PASTE HERE */}

                {loading && (
                  <p className="text-purple-600 mt-3">Uploading Dataset...</p>
                )}

                {success && (
                  <p className="text-green-600 mt-3">
                    Dataset Uploaded Successfully
                  </p>
                )}

                {error && <p className="text-red-600 mt-3">{error}</p>}

                <input
                  id="datasetUpload"
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </motion.div>
            {validation && (
              <div
                className={`
      mt-4
      px-5
      py-4
      rounded-2xl
      text-sm
      font-semibold
      shadow-md

      ${
        validation.valid
          ? "bg-green-100 text-green-700 border border-green-300"
          : "bg-red-100 text-red-700 border border-red-300"
      }
    `}
              >
                {validation.message}
              </div>
            )}

            {/* ANALYTICS CARDS */}

            {/* ANALYTICS CARDS */}

            <div
              className="
    grid
    grid-cols-2
    lg:grid-cols-4
    gap-5
    mt-6
  "
            >
              {[
                {
                  title: "Total Records",
                  value: preview.length > 0 ? stats.rows : "--",

                  color: "border-purple-500",

                  bg: "from-purple-500/10 to-purple-100",

                  text: "text-purple-700",
                },

                {
                  title: "Missing Values",

                  value: preview.length > 0 ? stats.missing_values : "--",

                  color: "border-red-500",

                  bg: "from-red-500/10 to-red-100",

                  text: "text-red-700",
                },

                {
                  title: "Dataset Features",

                  value: preview.length > 0 ? stats.features : "--",

                  color: "border-blue-500",

                  bg: "from-blue-500/10 to-blue-100",

                  text: "text-blue-700",
                },

                {
                  title: "AI Readiness",

                  value:
                    preview.length > 0
                      ? `${Math.max(readinessScore, 0)}%`
                      : "Waiting",

                  color: "border-green-500",

                  bg: "from-green-500/10 to-green-100",

                  text: "text-green-700",
                },
              ].map((card, index) => (
                <div
                  key={index}
                  className={`
        relative
        overflow-hidden
        bg-white/70
        backdrop-blur-xl
        rounded-3xl
        shadow-xl
        p-6
        border-l-4
        ${card.color}
        hover:-translate-y-1
        hover:shadow-2xl
        transition-all
        duration-300
      `}
                >
                  {/* GLOW EFFECT */}

                  <div
                    className={`
          absolute
          inset-0
          bg-gradient-to-br
          ${card.bg}
          opacity-40
        `}
                  />

                  {/* CONTENT */}

                  <div className="relative z-10">
                    <p className="text-gray-500 text-sm font-medium">
                      {card.title}
                    </p>

                    <h2
                      className={`
            text-4xl
            font-bold
            mt-3
            ${card.text}
          `}
                    >
                      {card.value}
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* ========================================= */}
          {/* DATASET PREVIEW */}
          {/* ========================================= */}
          <div
            style={{
              background: "rgba(255,255,255,0.75)",
              backdropFilter: "blur(20px)",
              borderRadius: "30px",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              border: "1px solid rgba(255,255,255,0.4)",
              marginTop: "24px",
              marginBottom: "24px",
            }}
          >
            {/* HEADER */}

            <div
              style={{
                background: "linear-gradient(to right,#6d28d9,#9333ea,#db2777)",
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              <h2
                style={{
                  color: "white",
                  fontSize: "24px",
                  fontWeight: "700",
                }}
              >
                Dataset Preview
              </h2>

              {/* SEARCH */}

              <div
                style={{
                  position: "relative",
                  width: "260px",
                }}
              >
                <FaSearch
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "65%",
                    transform: "translateY(-50%)",
                    color: "#7c3aed",
                    zIndex: 10,
                    fontSize: "14px",
                  }}
                />

                <input
                  type="text"
                  placeholder="Search records..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    width: "100%",
                    height: "42px",
                    borderRadius: "14px",
                    border: "1px solid #e9d5ff",
                    paddingLeft: "42px",
                    paddingRight: "14px",
                    outline: "none",
                    fontSize: "14px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
                  }}
                />
              </div>
            </div>
            {/* ACTION BUTTONS */}

            <div
              className="
    flex
    flex-wrap
    items-center
    gap-3
    px-6
    py-4
    bg-white
    border-b
  "
            >
              <button
                onClick={removeDuplicates}
                className="
    w-auto
    px-5
    py-2
    rounded-xl
    bg-red-600
    text-white
    font-semibold
    hover:bg-red-700
    transition-all
    shadow-md
  "
              >
                Remove Duplicates
              </button>
              <button
                onClick={cleanMissingValues}
                className="
      px-5
      py-2
      rounded-xl
      bg-purple-600
      text-white
      font-semibold
      hover:bg-purple-700
      transition-all
      w-auto
    "
              >
                Clean Missing Values
              </button>

              <button
                onClick={exportCSV}
                className="
      px-5
      py-2
      rounded-xl
      bg-green-600
      text-white
      font-semibold
      hover:bg-green-700
      transition-all
      w-auto
    "
              >
                Export Cleaned CSV
              </button>
            </div>

            {/* TABLE */}

            <div
              style={{
                overflowX: "auto",
                overflowY: "auto",
                maxHeight: "420px",
                background: "white",
                position: "relative",
              }}
            >
              <table
                style={{
                  width: "100%",
                  minWidth: "1200px",
                  borderCollapse: "collapse",
                }}
              >
                {/* TABLE HEADER */}

                <thead
                  style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 20,
                    background:
                      "linear-gradient(to right,#6d28d9,#9333ea,#db2777)",
                  }}
                >
                  <tr>
                    {[
                      "Age",
                      "Gender",
                      "Sleep Duration",
                      "Stress Level",
                      "BMI Category",
                      "Heart Rate",
                      "Daily Steps",
                      "Sleep Disorder",
                    ].map((item) => (
                      <th
                        key={item}
                        style={{
                          padding: "14px 12px",
                          textAlign: "center",
                          color: "white",
                          fontWeight: "600",
                          fontSize: "14px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* TABLE BODY */}

                <tbody>
                  {preview.length === 0 ? (
                    /* EMPTY DATASET */

                    <tr>
                      <td
                        colSpan="8"
                        style={{
                          padding: "40px",
                          textAlign: "center",
                          color: "#6b7280",
                          fontWeight: "600",
                          fontSize: "16px",
                        }}
                      >
                        No dataset uploaded
                      </td>
                    </tr>
                  ) : (
                    (() => {
                      const filteredData = preview.filter((row) => {
                        const searchValue = search.toLowerCase();

                        return (
                          row.Age?.toString().includes(searchValue) ||
                          row.Gender?.toLowerCase().startsWith(searchValue) ||
                          row["Sleep Duration"]
                            ?.toString()
                            .includes(searchValue) ||
                          row["Stress Level"]
                            ?.toString()
                            .includes(searchValue) ||
                          row["BMI Category"]
                            ?.toLowerCase()
                            .includes(searchValue) ||
                          row["Heart Rate"]?.toString().includes(searchValue) ||
                          row["Daily Steps"]
                            ?.toString()
                            .includes(searchValue) ||
                          row["Sleep Disorder"]
                            ?.toLowerCase()
                            .includes(searchValue)
                        );
                      });

                      return filteredData.length > 0 ? (
                        filteredData.map((row, index) => (
                          <tr
                            key={index}
                            style={{
                              background:
                                index % 2 === 0 ? "#ffffff" : "#faf5ff",

                              borderBottom: "1px solid #f3f4f6",
                            }}
                          >
                            <td style={tableCell}>{row.Age || "N/A"}</td>

                            <td style={tableCell}>{row.Gender || "N/A"}</td>

                            <td style={tableCell}>
                              {row["Sleep Duration"] || "N/A"}
                            </td>

                            <td style={tableCell}>
                              {row["Stress Level"] || "N/A"}
                            </td>

                            <td style={tableCell}>
                              {row["BMI Category"] || "N/A"}
                            </td>

                            <td style={tableCell}>
                              {row["Heart Rate"] || "N/A"}
                            </td>

                            <td style={tableCell}>
                              {row["Daily Steps"] || "N/A"}
                            </td>

                            <td style={tableCell}>
                              {row["Sleep Disorder"] || "N/A"}
                            </td>
                          </tr>
                        ))
                      ) : (
                        /* NO SEARCH RESULTS */

                        <tr>
                          <td
                            colSpan="8"
                            style={{
                              padding: "40px",
                              textAlign: "center",
                              color: "#ef4444",
                              fontWeight: "600",
                              fontSize: "16px",
                            }}
                          >
                            No matching records found
                          </td>
                        </tr>
                      );
                    })()
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {/* ========================================= */}
          {/* ANALYTICS PANEL */}
          {/* ========================================= */}
          <div className="xl:col-span-5">
            <div
              className="
      bg-white/70
      backdrop-blur-xl
      rounded-[30px]
      shadow-2xl
      border
      border-white/40
      p-6
      w-full
    "
            >
              {/* HEADER */}

              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-800">
                  AI Dataset Analytics
                </h2>

                <p className="text-gray-500 mt-1">
                  Healthcare AI training insights
                </p>
              </div>

              {preview.length > 0 ? (
                <>
                  {/* CHARTS SECTION */}
                  <div
                    className="
    grid
    grid-cols-1
    lg:grid-cols-5
    gap-6
    w-full
    mt-6
  "
                  >
                    {/* PIE CHART */}
                    <div
                      className="
    bg-white
    rounded-3xl
    p-5
    shadow-lg
    lg:col-span-2
  "
                    >
                      <h3 className="text-xl font-bold text-gray-700 mb-4">
                        Risk Distribution
                      </h3>

                      <div className="w-full h-[260px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={pieData}
                              dataKey="value"
                              nameKey="name"
                              cx="50%"
                              cy="50%"
                              outerRadius={70}
                              label
                            >
                              {pieData.map((entry, index) => (
                                <Cell
                                  key={index}
                                  fill={COLORS[index % COLORS.length]}
                                />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* BAR CHART CARD */}
                    <div
                      className="
      bg-white
      rounded-3xl
      p-5
      shadow-lg
      lg:col-span-3
      overflow-hidden
    "
                    >
                      <h3 className="text-xl font-bold text-gray-700">
                        Dataset Quality
                      </h3>

                      <p className="text-gray-500 mb-4">
                        AI preprocessing quality metrics
                      </p>

                      <div className="w-full h-[250px] md:h-[320px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={qualityData}
                            margin={{
                              top: 20,
                              right: 10,
                              left: 0,
                              bottom: 10,
                            }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              opacity={0.3}
                            />

                            <XAxis dataKey="name" />

                            <YAxis />

                            <Tooltip />

                            <Bar
                              dataKey="value"
                              fill="#7c3aed"
                              radius={[8, 8, 0, 0]}
                            >
                              <LabelList dataKey="value" position="top" />
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                  {/* ========================================= */}
                  {/* SUMMARY CARDS */}
                  {/* ========================================= */}

                  <div
                    className="
    grid
    grid-cols-1
    lg:grid-cols-5
    gap-6
    w-full
    min-w-0
  "
                  >
                    
                                     </div>
                </>
              ) : (
                <div className="text-center py-20">
                  <FaDatabase className="text-6xl text-purple-500 mx-auto mb-4" />

                  <h2 className="text-2xl font-bold text-gray-700">
                    Upload Dataset to View AI Analytics
                  </h2>

                  <p className="text-gray-500 mt-3">
                    Upload healthcare dataset to generate charts and insights.
                  </p>
                </div>
              )}
            </div>
          </div>{" "}
        </div>
      </div>
    </DashboardLayout>
  );
}
