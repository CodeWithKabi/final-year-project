import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

import {
  getPatients,
  addPatient,
  deletePatient,
  updatePatient,
} from "../services/patientService";

import { FaEye, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
export default function Patients() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    patient_name: "",
    age: "",
    gender: "",
    sleep_duration: "",
    stress_level: "",
    bmi_category: "",
    heart_rate: "",
    daily_steps: "",
    sleep_disorder: "",
  });

  // =========================================
  // FETCH PATIENTS
  // =========================================

  const fetchPatients = async () => {
    try {
      setLoading(true);

      const response = await getPatients();

      setPatients(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // =========================================
  // HANDLE INPUT
  // =========================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================================
  // SUBMIT PATIENT
  // =========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updatePatient(editingId, formData);

        setEditingId(null);
      } else {
        await addPatient(formData);
      }

      fetchPatients();
setShowForm(false);
      setFormData({
        patient_name: "",
        age: "",
        gender: "",
        sleep_duration: "",
        stress_level: "",
        bmi_category: "",
        heart_rate: "",
        daily_steps: "",
        sleep_disorder: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // =========================================
  // DELETE PATIENT
  // =========================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this patient?");

    if (!confirmDelete) return;

    try {
      await deletePatient(id);

      fetchPatients();
    } catch (error) {
      console.log(error);
    }
  };

  // =========================================
  // EDIT PATIENT
  // =========================================

  const handleEdit = (patient) => {
    setFormData({
      patient_name: patient.patient_name || "",
      age: patient.age || "",
      gender: patient.gender || "",
      sleep_duration: patient.sleep_duration || "",
      stress_level: patient.stress_level || "",
      bmi_category: patient.bmi || "",
      heart_rate: patient.heart_rate || "",
      daily_steps: patient.physical_activity || "",
      sleep_disorder: patient.prediction || "",
    });
setShowForm(true);
    setEditingId(patient.id);
  };

  // =========================================
  // LOADING STATE
  // =========================================

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6 text-white text-xl">Loading Patients...</div>
      </DashboardLayout>
    );
  }

  const handleView = (patient) => {
    setSelectedPatient(patient);

    setShowModal(true);
  };
  return (
    <DashboardLayout title="Patient ">
      <div className="p-6">
        {/* PAGE TITLE */}

        {/* FORM SECTION */}

<div className="patient-stats">

  <div className="stat-card">
    <h2>{patients.length}</h2>
    <p>Total Patients</p>
  </div>

  <div className="stat-card">
    <h2>
      {
        patients.filter(
          p => p.risk_level === "High Risk"
        ).length
      }
    </h2>
    <p>High Risk</p>
  </div>

</div>
<button
  onClick={() => setShowForm(!showForm)}
  className="mobile-form-toggle"
>
  {showForm ? "✖ Close Form" : "➕ Add Patient"}
</button>
<div
  className={`bg-white/10 backdrop-blur-lg p-6 rounded-2xl mb-8 patient-form ${
    showForm ? "show-form" : ""
  }`}
>
          <h2 className="text-xl font-semibold text-white mb-4">
            {editingId ? "Edit Patient" : "Add Patient"}
          </h2>

<div className="welcome-card">
  <h2>👨‍⚕️ Patient Center</h2>

  <p>
    Manage patient profiles, sleep metrics,
    disorder predictions and risk monitoring.
  </p>
</div>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {/* PATIENT NAME */}

            <input
              type="text"
              name="patient_name"
              placeholder="Patient Name"
              value={formData.patient_name}
              onChange={handleChange}
              className="p-3 rounded-lg"
              required
              style={{
                color: "#231b1b",
              }}
            />

            {/* AGE */}

            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              className="p-3 rounded-lg"
              required
              style={{
                color: "#231b1b",
              }}
            />

            {/* GENDER */}

            <select
              style={{
                background: "#ffffff",
                color: "rgb(142, 139, 139)",
              }}
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="p-3 rounded-lg"
              required
            >
              <option value="">Select Gender</option>

              <option value="Male">Male</option>

              <option value="Female">Female</option>

              <option value="Other">Other</option>
            </select>

            {/* SLEEP DURATION */}

            <input
              type="number"
              step="0.1"
              name="sleep_duration"
              placeholder="Sleep Duration"
              value={formData.sleep_duration}
              onChange={handleChange}
              className="p-3 rounded-lg"
              required
              style={{
                color: "#231b1b",
              }}
            />

            {/* STRESS LEVEL */}

            <input
              type="number"
              name="stress_level"
              placeholder="Stress Level"
              value={formData.stress_level}
              onChange={handleChange}
              className="p-3 rounded-lg"
              required
              style={{
                color: "#231b1b",
              }}
            />

            {/* BMI CATEGORY */}

            <select
              name="bmi_category"
              value={formData.bmi_category}
              onChange={handleChange}
              className="p-3 rounded-lg"
              required
              style={{
                background: "#ffffff",
                color: "rgb(142, 139, 139)",
              }}
            >
              <option value="">Select BMI Category</option>

              <option value="Normal">Normal</option>

              <option value="Overweight">Overweight</option>

              <option value="Obese">Obese</option>

              <option value="Underweight">Underweight</option>
            </select>

            {/* HEART RATE */}

            <input
              type="number"
              name="heart_rate"
              placeholder="Heart Rate"
              value={formData.heart_rate}
              onChange={handleChange}
              className="p-3 rounded-lg"
              required
              style={{
                color: "#231b1b",
              }}
            />

            {/* DAILY STEPS */}

            <input
              type="number"
              name="daily_steps"
              placeholder="Daily Steps"
              value={formData.daily_steps}
              onChange={handleChange}
              className="p-3 rounded-lg"
              required
              style={{
                color: "#231b1b",
              }}
            />

            {/* SLEEP DISORDER */}

            <select
              name="sleep_disorder"
              value={formData.sleep_disorder}
              onChange={handleChange}
              className="p-3 rounded-lg"
              required
              style={{
                background: "#ffffff",
                color: "rgb(142, 139, 139)",
              }}
            >
              <option value="">Select Disorder</option>

              <option value="None">None</option>

              <option value="Insomnia">Insomnia</option>

              <option value="Sleep Apnea">Sleep Apnea</option>
            </select>

            {/* BUTTON */}

            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg"
            >
              {editingId ? "Update Patient" : "Add Patient"}
            </button>
          </form>
        
</div>
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          {/* SEARCH */}
          <div
            style={{
              width:"450px",
maxWidth:"100%",
              marginTop: "20px",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                height: "52px",
                borderRadius: "16px",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.10)",
                backdropFilter: "blur(12px)",

                display: "flex",
                alignItems: "center",

                padding: "0 18px",
                gap: "12px",

                boxShadow: "0 0 15px rgba(0,217,255,0.08)",
              }}
            >
              {/* SEARCH ICON */}

              <FaSearch
                style={{
                  color: "#00d9ff",
                  fontSize: "14px",
                  minWidth: "14px",
                  marginTop: "1px",
                }}
              />

              {/* INPUT */}

              <input
                type="text"
                placeholder="Search patient..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  border: "none",
                  outline: "none",
                  background: "transparent",

                  width: "100%",
                  height: "100%",

                  color: "white",
                  fontSize: "14px",

                  padding: "0",
                  margin: "0",
                }}
              />
            </div>
          </div>
          <h3
  style={{
    color:"white",
    marginBottom:"15px",
    fontWeight:"600"
  }}
>
  Patient Records
</h3>
          {/* TABLE */}

          {patients.length === 0 && (
  <div className="empty-state">
    <h3>No Patients Found</h3>
    <p>Add your first patient record.</p>
  </div>
)}
          <div
            className="table-responsive rounded-4"
            style={{
              width: "100%",
              overflowX: "auto",
              overflowY: "hidden",
            }}
          >
            <table
              className="
    table
    table-borderless
    align-middle
    mb-0
  "
              style={{
                color: "white",
                width: "100%",
                borderCollapse: "separate",
                borderSpacing: "0 8px",
              }}
            >
              {/* HEADER */}

              <thead>
                <tr
                  style={{
                    background: "linear-gradient(to right,#06b6d4,#7c3aed)",
                    borderRadius: "14px",
                  }}
                >
                  <th
                    className="text-start align-middle ps-4"
                    style={{
                      padding: "14px 18px",
                      height: "56px",
                      fontWeight: "600",
                      verticalAlign: "middle",
                    }}
                  >
                    Patient
                  </th>
                  <th
                    className="text-center align-middle"
                    style={{
                      padding: "14px 18px",
                      height: "56px",
                      fontWeight: "600",
                      verticalAlign: "middle",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Age
                  </th>

                  <th
                    className="text-center align-middle"
                    style={{
                      padding: "14px 18px",
                      height: "56px",
                      fontWeight: "600",
                      verticalAlign: "middle",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {" "}
                    Gender
                  </th>

                  <th
                    className="text-center align-middle"
                    style={{
                      padding: "14px 18px",
                      height: "56px",
                      fontWeight: "600",
                      verticalAlign: "middle",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Sleep
                  </th>

                  <th
                    className="text-center align-middle"
                    style={{
                      padding: "14px 18px",
                      height: "56px",
                      fontWeight: "600",
                      verticalAlign: "middle",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {" "}
                    Stress
                  </th>

                  <th
                    className="text-center align-middle"
                    style={{
                      padding: "14px 18px",
                      height: "56px",
                      fontWeight: "600",
                      verticalAlign: "middle",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Heart
                  </th>

                  <th
                    className="text-center align-middle"
                    style={{
                      padding: "14px 18px",
                      height: "56px",
                      fontWeight: "600",
                      verticalAlign: "middle",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {" "}
                    Disorder
                  </th>

                  <th
                    className="text-center align-middle"
                    style={{
                      padding: "14px 18px",
                      height: "56px",
                      fontWeight: "600",
                      verticalAlign: "middle",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Risk
                  </th>

                  <th
                    className="text-center align-middle"
                    style={{
                      padding: "14px 18px",
                      height: "56px",
                      fontWeight: "600",
                      verticalAlign: "middle",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>

              {/* BODY */}

              <tbody>
                {patients
                  .filter((patient) =>
                    patient.patient_name
                      .toLowerCase()
                      .includes(search.toLowerCase()),
                  )
                  .map((patient, index) => (
                    <tr
                      key={patient.id}
                      style={{
                        background:
                          index % 2 === 0
                            ? "rgba(255,255,255,0.04)"
                            : "rgba(255,255,255,0.02)",
                        borderRadius: "20px",
                      }}
                    >
                      {/* NAME */}

                      <td className="align-middle ps-4">
                        <div className="d-flex align-items-center gap-3">
                          {/* AVATAR */}

                          <div
                            className="
        rounded-circle
        d-flex
        align-items-center
        justify-content-center
        fw-bold
      "
                            style={{
                              width: "42px",
                              height: "42px",
                              minWidth: "42px",
                              background:
                                "linear-gradient(to right,#06b6d4,#7c3aed)",
                            }}
                          >
                            {patient?.patient_name?.charAt(0) || "P"}
                          </div>

                          {/* INFO */}

                          <div className="d-flex flex-column">
                            <span
                              style={{
                                fontWeight: "600",
                                lineHeight: "1.2",
                              }}
                            >
                              {patient.patient_name}
                            </span>

                            <small
                              style={{
                                color: "rgba(250, 245, 249, 0.46)",
                                fontSize: "14px",
                              }}
                            >
                              ID #{patient.id}
                            </small>
                          </div>
                        </div>
                      </td>
                      {/* AGE */}

                      <td className="align-middle text-center py-4">
                        {patient.age}
                      </td>

                      {/* GENDER */}
                      <td className="align-middle text-center py-4">
                        <span className="badge rounded-pill text-bg-info px-3 py-2">
                          {patient.gender}
                        </span>
                      </td>

                      {/* SLEEP */}

                      <td className="align-middle text-center py-4">
                        {patient.sleep_duration} hrs
                      </td>

                      {/* STRESS */}

                      <td className="align-middle text-center py-4">
                        <span className="badge rounded-pill text-bg-warning px-3 py-2">
                          {patient.stress_level}
                        </span>
                      </td>

                      {/* HEART */}

                      <td className="align-middle text-center py-4">
                        {patient.heart_rate} bpm
                      </td>

                      {/* DISORDER */}

                      <td className="align-middle text-center py-4">
                        <span className="badge rounded-pill text-bg-danger px-3 py-2">
                          {patient.prediction}
                        </span>
                      </td>

                      {/* RISK */}

                      <td className="align-middle text-center py-4">
                        <span className="badge rounded-pill text-bg-success px-3 py-2">
                          {patient.risk_level}
                        </span>
                      </td>

                      {/* ACTIONS */}

                      <td
                        className="align-middle text-center"
                        style={{
                          minWidth: "160px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "10px",
                            flexWrap: "nowrap",
                          }}
                        >
                          {/* VIEW */}

                          <button
                            onClick={() => setSelectedPatient(patient)}
                            className="btn btn-info"
                            style={{
                              width: "36px",
                              height: "36px",
                              borderRadius: "10px",
                              padding: "0",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <FaEye size={12} />
                          </button>

                          {/* EDIT */}

                          <button
                            onClick={() => handleEdit(patient)}
                            className="btn btn-warning"
                            style={{
                              width: "36px",
                              height: "36px",
                              borderRadius: "10px",
                              padding: "0",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <FaEdit size={12} />
                          </button>

                          {/* DELETE */}

                          <button
                            onClick={() => handleDelete(patient.id)}
                            className="btn btn-danger"
                            style={{
                              width: "36px",
                              height: "36px",
                              borderRadius: "10px",
                              padding: "0",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <FaTrash size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
{/* table-close */}

<div
  style={{
    marginTop:"30px",
    background:"rgba(255,255,255,.05)",
    borderRadius:"20px",
    padding:"20px"
  }}
>
  <h4>AI Healthcare Insight</h4>

  <p style={{color:"#cbd5e1"}}>
    High-risk patients require immediate monitoring.
    Sleep Apnea remains the most frequently detected disorder.
  </p>
</div>
{/* mobile-table-view */}
<div className="mobile-patient-cards">

  {patients
    .filter((patient) =>
      patient.patient_name
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .map((patient) => (

      <div
        key={patient.id}
        className="patient-card"
      >

        <div className="patient-card-header">

          <div
            className="avatar"
          >
            {patient.patient_name?.charAt(0)}
          </div>

<div>
  <h4
    style={{
      margin:0,
      color:"white"
    }}
  >
    {patient.patient_name}
  </h4>

  <small
    style={{
      color:"#94a3b8"
    }}
  >
    ID #{patient.id}
  </small>

<div
  style={{
    fontSize:"12px",
    marginTop:"4px",
    fontWeight:"600",
    color:
      patient.risk_level === "High Risk"
        ? "#ef4444"
        : patient.risk_level === "Medium Risk"
        ? "#f59e0b"
        : "#22c55e"
  }}
>
  ● {patient.risk_level}
</div>
</div>        </div>

        <div className="patient-details">

          <p>Age: {patient.age}</p>

          <p>Gender: {patient.gender}</p>

          <p>Sleep: {patient.sleep_duration} hrs</p>

          <p>Heart: {patient.heart_rate} bpm</p>

         <p>
  Risk:
  <span
   className={
  patient.risk_level === "High Risk"
    ? "risk-high"
    : patient.risk_level === "Medium Risk"
    ? "risk-medium"
    : "risk-low"
}
  >
    {patient.risk_level}
  </span>
</p>

        </div>

        <div className="patient-actions">

          <button
            onClick={() => handleView(patient)}
          >
            <FaEye />
          </button>

          <button
            onClick={() => handleEdit(patient)}
          >
            <FaEdit />
          </button>

          <button
            onClick={() => handleDelete(patient.id)}
          >
            <FaTrash />
          </button>

        </div>

      </div>

    ))}
</div>
{/* close-mobile-table-view */}

        </div>
        {/* VIEW PATIENT MODAL */}

{selectedPatient && (
  <div
    style={{
      position: "fixed",
      top: "75px",      // below navbar
      left: 0,
      right: 0,
      bottom: "70px",   // above bottom nav
      zIndex: 50,
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      padding: "10px",
      background: "rgba(0,0,0,0.5)",
      backdropFilter: "blur(8px)",
    }}
  >
      <div
  className="
    patient-modal
    w-full
    max-w-md
    rounded-t-3xl
    bg-gradient-to-br
    from-purple-900
    to-indigo-900
    p-6
    shadow-2xl
    border
    border-white/10
    relative
    text-white
    
  "
 style={{
  maxHeight: "85vh",
  overflowY: "auto",
  paddingTop: "60px",
}}
>
              {/* CLOSE BUTTON */}

          <button
  onClick={() => setSelectedPatient(null)}
  style={{
    position: "absolute",
    top: "15px",
    right: "15px",
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    border: "none",
    background: "#ef4444",
    color: "white",
    fontSize: "20px",
    cursor: "pointer",
    zIndex: 1000,
  }}
>
  ✕
</button>
              {/* TITLE */}

              <h1
                className="
          text-4xl
          font-bold
          mb-10
          bg-gradient-to-r
          from-cyan-400
          to-pink-400
          bg-clip-text
          text-transparent
        "
              >
                Patient Profile
              </h1>

              {/* PROFILE GRID */}

              <div
                className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
        "
              >
                <ProfileCard
                  label="Patient Name"
                  value={selectedPatient.patient_name}
                />

                <ProfileCard label="Age" value={selectedPatient.age} />

                <ProfileCard label="Gender" value={selectedPatient.gender} />

                <ProfileCard
                  label="Sleep Duration"
                  value={`${selectedPatient.sleep_duration} hrs`}
                />

                <ProfileCard
                  label="Stress Level"
                  value={selectedPatient.stress_level}
                />

                <ProfileCard
                  label="Heart Rate"
                  value={`${selectedPatient.heart_rate} bpm`}
                />

                <ProfileCard
                  label="Disorder"
                  value={selectedPatient.prediction}
                />

                <ProfileCard
                
                  label="Risk Level"
                  value={selectedPatient.risk_level}
                />
              </div>
            
          </div>
       </div>
        )}

      </div>
    </DashboardLayout>
  );

}
function ProfileCard({ label, value }) {
  return (
    <div
      className="
        bg-white/10
        border
        border-white/10
        rounded-2xl
        p-5
        backdrop-blur-lg
      "
    >
      <p className="text-gray-300 mb-2">{label}</p>

      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}
