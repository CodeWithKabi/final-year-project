import DashboardLayout from "../components/DashboardLayout";
import { useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

export default function Prediction() {
  const [formData, setFormData] = useState({
    age: "",

    gender: "",

    sleep_duration: "",

    stress_level: "",

    bmi_category: "",

    heart_rate: "",

    daily_steps: "",
    quality_sleep: "",
    physical_activity: "",
    occupation: "",
    blood_pressure: "",
  });

  const [prediction, setPrediction] = useState("");


  const [confidence, setConfidence] = useState("");
  const [riskLevel, setRiskLevel] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handlePredict = async (e) => {

  e.preventDefault();
  if (
    !formData.gender ||
    !formData.bmi_category ||
    !formData.occupation ||
    !formData.blood_pressure
  ) {
    alert("Please fill all required fields");
    return;
  }


  try {

    setLoading(true);

    const response = await axios.post(

       "https://sleep-disorder-backend-s7oq.onrender.com/predict",

      {

        patient_name: formData.patient_name,

        age: Number(formData.age),

        gender: formData.gender,

        sleep_duration: Number(formData.sleep_duration),

        stress_level: Number(formData.stress_level),

        bmi_category: formData.bmi_category,

        heart_rate: Number(formData.heart_rate),

        daily_steps: Number(formData.daily_steps),

        quality_of_sleep: Number(formData.quality_sleep),

        physical_activity: Number(formData.physical_activity),

        occupation: formData.occupation,

        blood_pressure: formData.blood_pressure

      }

    );

    setPrediction(response.data.prediction);
    toast.success(
  "Prediction Completed Successfully"
);

    setConfidence(response.data.confidence);

    setRiskLevel(response.data.risk_level);

    setLoading(false);

  } catch (error) {

    console.log(error);

    setLoading(false);

  }

};

const [loading, setLoading] =
  useState(false);
const riskColor =

  riskLevel === "High Risk"
    ? "#ef4444"

    : riskLevel === "Moderate Risk"
    ? "#facc15"

    : "#22c55e";
const confidenceValue =
  confidence || 0;

  return (
    <DashboardLayout title=" Prediction ">
      <div className="p-6">
        {/* PAGE TITLE */}

        {/* PREDICTION FORM */}

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Patient Prediction Form
          </h2>

          <form
            onSubmit={handlePredict}
            className="
    grid
    grid-cols-1
    md:grid-cols-3
    gap-4
  "
          >
            <input
  type="text"
  name="patient_name"
  placeholder="Patient Name"
  value={formData.patient_name}
  onChange={handleChange}
  className="input"
   style={{
    color: "#231b1b",
  }}
  
/>
            {/* AGE */}

            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age"
              className="p-3 rounded-xl"
               style={{
    color: "#231b1b",
  }}
            />

            {/* GENDER */}

            <select
  name="gender"
  value={formData.gender}
  onChange={handleChange}
  className="input"
  style={{
    background: "#ffffff",
    color: "rgb(142, 139, 139)",
  }}
>

  <option value="">
    Select Gender
  </option>

  <option value="Male">
    Male
  </option>

  <option value="Female">
    Female
  </option>

</select>

            {/* SLEEP DURATION */}

            <input
              type="number"
              step="0.1"
              name="sleep_duration"
              value={formData.sleep_duration}
              onChange={handleChange}
              placeholder="Sleep Duration"
              className="p-3 rounded-xl"
               style={{
    color: "#231b1b",
  }}
            />

            {/* STRESS LEVEL */}

            <input
              type="number"
              name="stress_level"
              value={formData.stress_level}
              onChange={handleChange}
              placeholder="Stress Level"
              className="p-3 rounded-xl"
               style={{
    color: "#231b1b",
  }}
            />

            {/* BMI CATEGORY */}

           <select
  name="bmi_category"
  value={formData.bmi_category}
  onChange={handleChange}
  className="input"
  style={{
    background: "#ffffff",
    color: "rgb(142, 139, 139)",
  }}
>

  <option value="">
    BMI Category
  </option>

  <option value="Normal">
    Normal
  </option>

  <option value="Overweight">
    Overweight
  </option>

  <option value="Obese">
    Obese
  </option>

</select>
            {/* HEART RATE */}

            <input
              type="number"
              name="heart_rate"
              value={formData.heart_rate}
              onChange={handleChange}
              placeholder="Heart Rate"
              className="p-3 rounded-xl"
               style={{
    color: "#231b1b",
  }}
            />

            {/* DAILY STEPS */}

            <input
              type="number"
              name="daily_steps"
              value={formData.daily_steps}
              onChange={handleChange}
              placeholder="Daily Steps"
              className="p-3 rounded-xl"
               style={{
    color: "#231b1b",
  }}
            />

            <input
              type="number"
              name="quality_sleep"
              value={formData.quality_sleep}
              onChange={handleChange}
              placeholder="Quality of Sleep"
              className="p-3 rounded-xl"
               style={{
    color: "#231b1b",
  }}
            />

            <input
              type="number"
              name="physical_activity"
              value={formData.physical_activity}
              onChange={handleChange}
              placeholder="Physical Activity"
              className="p-3 rounded-xl"
               style={{
    color: "#231b1b",
  }}
              
            />

           <select
  name="occupation"
  value={formData.occupation}
  onChange={handleChange}
  className="input"
  style={{
    background: "#ffffff",
    color: "rgb(142, 139, 139)",
  }}
>
  <option value="">Select Occupation</option>

  <option value="Engineer">Engineer</option>

  <option value="Doctor">Doctor</option>

  <option value="Teacher">Teacher</option>

  <option value="Nurse">Nurse</option>

  <option value="Lawyer">Lawyer</option>

</select>
            {/*  *blood pressure*/}

      <select
  name="blood_pressure"
  value={formData.blood_pressure}
  onChange={handleChange}
  className="input"
  style={{
    background: "#ffffff",
    color: "rgb(142, 139, 139)",
  }}
>

  <option value="">
    Select Blood Pressure
  </option>

  <option value="140/90">140/90</option>

  <option value="132/87">132/87</option>

  <option value="120/80">120/80</option>

  <option value="130/86">130/86</option>

  <option value="125/80">125/80</option>

  <option value="131/86">131/86</option>

  <option value="135/88">135/88</option>

  <option value="115/75">115/75</option>

  <option value="129/84">129/84</option>

  <option value="130/85">130/85</option>

  <option value="135/90">135/90</option>

  <option value="142/92">142/92</option>

  <option value="140/95">140/95</option>

  <option value="139/91">139/91</option>

</select>

            {/* BUTTON */}

            <button
              type="submit"
              className="
      bg-purple-600
      hover:bg-purple-700
      text-white
      rounded-xl
      p-3
      font-semibold
      transition
    "
            >
              {loading
    ? "Analyzing Sleep Data..."
    : "Predict Disorder"}

            </button>
          </form>
        </div>

        {/* PREDICTION RESULT */}

{/* PREDICTION RESULT */}

<motion.div

  className="bg-white rounded-2xl shadow-xl p-6"

  initial={{
    opacity: 0,
    y: 40,
    scale: 0.95
  }}

  animate={{
    opacity: 1,
    y: 0,
    scale: 1
  }}

  transition={{
    duration: 0.6
  }}

>

  <h2 className="text-2xl font-bold mb-4 text-gray-700">
    Prediction Result
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

    {/* RESULT CARD */}

    <div className="bg-purple-100 rounded-2xl p-6">

      <h3 className="text-gray-500">
        Predicted Disorder
      </h3>

      <p className="text-2xl font-bold text-purple-700 mt-2">

        {prediction || "No Prediction"}

      </p>

    </div>

    {/* ACCURACY CARD */}

    <div className="bg-green-100 rounded-2xl p-6">

      <h3 className="text-gray-500">
        XGBoost Accuracy
      </h3>

      <p className="text-2xl font-bold text-green-700 mt-2">

        {confidence
          ? `${confidence}%`
          : "No Data"}

      </p>

    </div>

    {/* RISK LEVEL CARD */}

    <div className="bg-red-100 rounded-2xl p-6">

      <h3 className="text-gray-500">
        Risk Level
      </h3>

     <p
  className="text-2xl font-bold mt-2"
 style={{
  color: riskColor,

  textShadow:
    riskLevel === "High Risk"
      ? "0 0 12px rgba(239,68,68,0.5)"

      : riskLevel === "Moderate Risk"
      ? "0 0 12px rgba(250,204,21,0.5)"

      : "0 0 12px rgba(34,197,94,0.5)"
}}
>
  {riskLevel || "Unknown"}
</p>

    </div>

  </div>

<div
  style={{
    width: "220px",
    height: "220px",
    margin: "30px auto"
  }}
>

  <CircularProgressbar
    value={confidenceValue}
    text={`${confidenceValue}%`}
    styles={buildStyles({

      textColor: "#ffffff",

      pathColor:
        confidenceValue >= 80
          ? "#22c55e"
          : confidenceValue >= 50
          ? "#facc15"
          : "#ef4444",

      trailColor:
        "rgba(255,255,255,0.1)",

      textSize: "16px"

    })}
  />

</div>
</motion.div>

       </div>
      <ToastContainer />
    </DashboardLayout>
    
  );
}
