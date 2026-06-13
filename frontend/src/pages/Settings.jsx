import React, { useState, useRef  } from "react";
import axios from "axios";
import DashboardLayout from "../components/DashboardLayout";


import {
  ToastContainer,
  toast,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import {
  FaUserShield,
  FaBell,
  FaMoon,
  FaRobot,
  FaLock,
  FaPalette,
  FaSave,
  FaUserCircle,
  FaCheckCircle,
  FaExclamationTriangle,
  FaDatabase,
  FaServer,
  FaSearch,
  FaPen,
} from "react-icons/fa";

import Layout from "../components/Layout";

const Settings = () => {
  
const cardStyle = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: "20px",
  backdropFilter: "blur(14px)",
  boxShadow: "0 0 20px rgba(0,217,255,0.04)",
  margin: "12px",
  // marginTop: "12px",
  padding: "28px",
};

const toggleStyle = {
  background: "rgba(255,255,255,0.03)",
  borderRadius: "16px",
  padding: "16px 20px",
  border: "1px solid rgba(255,255,255,0.05)",
          margin:"5px",

  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  minHeight: "unset",

  transition: "0.3s",
};
const [activeMenu, setActiveMenu] = React.useState("general");

const [darkMode, setDarkMode] = useState(true);

const [aiAlerts, setAiAlerts] = useState(true);

const [emailNotifications, setEmailNotifications] = useState(true);

const [saving, setSaving] = useState(false);

const profileRef = useRef(null);
const securityRef = useRef(null);
const notificationRef = useRef(null);
const aiRef = useRef(null);
const appearanceRef = useRef(null);

const scrollToSection = (ref) => {
  ref.current?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

const [theme, setTheme] = useState("Cyber Purple");

const [fontSize, setFontSize] = useState("Medium");

const [glassEffect, setGlassEffect] = useState(true);

const [compactLayout, setCompactLayout] = useState(false);

const pageTheme = {
  background:
    theme === "Medical Cyan"
      ? "#041922"
      : theme === "Dark Glass"
      ? "#050816"
      : "#071028",
};

const fontSizeValue =
  fontSize === "Small"
    ? "13px"
    : fontSize === "Large"
    ? "17px"
    : "15px";

const blurEffect = glassEffect
  ? "blur(14px)"
  : "none";

const layoutPadding = compactLayout
  ? "16px"
  : "28px";
const dynamicCardStyle = {
  ...cardStyle,

  background:
    theme === "Medical Cyan"
      ? "rgba(0,217,255,0.07)"
      : theme === "Dark Glass"
      ? "rgba(255,255,255,0.02)"
      : "rgba(124,58,237,0.07)",

  border:
    theme === "Medical Cyan"
      ? "1px solid rgba(0,217,255,0.2)"
      : theme === "Dark Glass"
      ? "1px solid rgba(255,255,255,0.05)"
      : "1px solid rgba(124,58,237,0.2)",

  backdropFilter: blurEffect,

  padding: layoutPadding,

  transition: "0.4s",
};



   
  
  return (
<DashboardLayout title="Settings">    
     <div
      className="container-fluid py-4"
     style={{
  minHeight: "100vh",
  background: pageTheme.background,
  color: "white",
fontSize: fontSizeValue,
  transition: "0.4s",
}}
    >

      {/* PAGE HEADER */}

      <div className="mb-4" >

     

        <p
          style={{
            color: "#94a3b8",
            marginTop: "6px",
          }}
        >
          Manage account, AI preferences and system settings
        </p>
        {/* SEARCH SETTINGS */}

<div
  className="mb-4"
  style={{
    maxWidth: "380px",
  }}
>

  <div
    style={{
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "16px",
      height: "50px",
      display: "flex",
      alignItems: "center",
      padding: "0 18px",
      gap: "12px",
      backdropFilter: "blur(12px)",
    }}
  >

    <FaSearch
      style={{
        color: "#06d6ff",
        fontSize: "14px",
      }}
    />

    <input
      type="text"
      placeholder="Search settings..."
      style={{
        background: "transparent",
        border: "none",
        outline: "none",
        color: "white",
        width: "100%",
      }}
    />

  </div>

</div>

      </div>

      <div className="row g-4">

        {/* LEFT SIDE */}

        <div className="col-lg-3">

          {/* PROFILE CARD */}

          <div
            className="p-4"
            style={{
              background: "rgba(255,255,255,0.05)",
              border:
                "1px solid rgba(255,255,255,0.08)",
              borderRadius: "20px",
              backdropFilter: "blur(14px)",
              boxShadow:
                "0 0 20px rgba(0,217,255,0.05)",
            }}
          >

           {/* PROFILE SECTION */}

<div className="text-center">

  {/* AVATAR WRAPPER */}

  <div
    className="
      mx-auto
      mb-3
      position-relative
      d-flex
      align-items-center
      justify-content-center
    "
    style={{
      width: "110px",
      height: "110px",
      borderRadius: "50%",

      background:
        "linear-gradient(135deg,#06d6ff,#7c3aed)",

      boxShadow:
        "0 0 25px rgba(0,217,255,0.25)",

      border:
        "3px solid rgba(255,255,255,0.08)",

      overflow: "hidden",
    }}
  >

    {/* USER ICON */}

    <FaUserCircle
      style={{
        fontSize: "60px",
        color: "white",
      }}
    />

    {/* ONLINE STATUS DOT */}

    <div
      className="position-absolute"
      style={{
        width: "16px",
        height: "16px",
        borderRadius: "50%",

        background: "#22c55e",

        bottom: "12px",
        right: "12px",

        border: "2px solid #071028",

        boxShadow:
          "0 0 10px rgba(34,197,94,0.8)",
      }}
    />

    {/* EDIT BUTTON */}

    <div
      className="
        position-absolute
        d-flex
        align-items-center
        justify-content-center
      "
      style={{
        width: "34px",
        height: "34px",
        borderRadius: "50%",

        background:
          "linear-gradient(to right,#06d6ff,#7c3aed)",

        bottom: "-2px",
        right: "-2px",

        cursor: "pointer",

        border: "3px solid #071028",

        boxShadow:
          "0 0 12px rgba(0,217,255,0.4)",

        transition: "0.3s",
      }}
    >

      <FaPen
        style={{
          fontSize: "12px",
          color: "white",
        }}
      />

    </div>

  </div>

  {/* USER NAME */}

  <h5
    style={{
      fontWeight: "700",
      marginBottom: "6px",
      color: "white",
    }}
  >
    Dr. Admin
  </h5>

  {/* ROLE */}

  <p
    style={{
      color: "#94a3b8",
      fontSize: "14px",
      marginBottom: "18px",
    }}
  >
    AI Healthcare Administrator
  </p>

  {/* PROFILE STATS */}

  <div className="row g-2">

    {/* PREDICTIONS */}

    <div className="col-4">

      <div
        style={{
          background: "rgba(255,255,255,0.04)",
          borderRadius: "14px",
          padding: "12px 8px",
          border:
            "1px solid rgba(255,255,255,0.05)",
        }}
      >

        <h6
          style={{
            margin: 0,
            color: "#06d6ff",
            fontWeight: "700",
          }}
        >
          245
        </h6>

        <small
          style={{
            color: "#94a3b8",
            fontSize: "11px",
          }}
        >
          Patients
        </small>

      </div>

    </div>

    {/* AI SCORE */}

    <div className="col-4">

      <div
        style={{
          background: "rgba(255,255,255,0.04)",
          borderRadius: "14px",
          padding: "12px 8px",
          border:
            "1px solid rgba(255,255,255,0.05)",
        }}
      >

        <h6
          style={{
            margin: 0,
            color: "#22c55e",
            fontWeight: "700",
          }}
        >
          96%
        </h6>

        <small
          style={{
            color: "#94a3b8",
            fontSize: "11px",
          }}
        >
          Accuracy
        </small>

      </div>

    </div>

    {/* ALERTS */}

    <div className="col-4">

      <div
        style={{
          background: "rgba(255,255,255,0.04)",
          borderRadius: "14px",
          padding: "12px 8px",
          border:
            "1px solid rgba(255,255,255,0.05)",
        }}
      >

        <h6
          style={{
            margin: 0,
            color: "#f43f5e",
            fontWeight: "700",
          }}
        >
          12
        </h6>

        <small
          style={{
            color: "#94a3b8",
            fontSize: "11px",
          }}
        >
          Alerts
        </small>

      </div>

    </div>

  </div>

</div>

            {/* MENU */}

            <div className="d-flex flex-column gap-3">

              <button className="btn text-start rounded-4 py-3"onClick={() => {
  setActiveMenu("profile");
  scrollToSection(profileRef);
}}style={{
  background:
    activeMenu === "profile"
      ? "linear-gradient(to right,#06d6ff,#7c3aed)"
      : "rgba(255,255,255,0.04)",

  color: "white",
  border: "1px solid rgba(255,255,255,0.06)",

  transition: "0.3s",
}}>
                <FaUserShield className="me-2" />
                Profile Settings
              </button>

              <button className="btn text-start rounded-4 py-3"onClick={() => {
  setActiveMenu("security");
  scrollToSection(securityRef);
}}style={{
  background:
    activeMenu === "security"
      ? "linear-gradient(to right,#06d6ff,#7c3aed)"
      : "rgba(255,255,255,0.04)",

  color: "white",
  border: "1px solid rgba(255,255,255,0.06)",

  transition: "0.3s",
}}>
                <FaLock className="me-2" />
                Security
              </button>

              <button className="btn text-start rounded-4 py-3"onClick={() => {
  setActiveMenu("notifications");
  scrollToSection(notificationRef);
}}style={{
  background:
    activeMenu === "notifications"
      ? "linear-gradient(to right,#06d6ff,#7c3aed)"
      : "rgba(255,255,255,0.04)",

  color: "white",
  border: "1px solid rgba(255,255,255,0.06)",

  transition: "0.3s",
}}>
                <FaBell className="me-2" />
                Notifications
              </button>

              <button className="btn text-start rounded-4 py-3"onClick={() => {
  setActiveMenu("ai");
  scrollToSection(aiRef);
}}style={{
  background:
    activeMenu === "ai"
      ? "linear-gradient(to right,#06d6ff,#7c3aed)"
      : "rgba(255,255,255,0.04)",

  color: "white",
  border: "1px solid rgba(255,255,255,0.06)",

  transition: "0.3s",
}}>
                <FaRobot className="me-2" />
                AI Preferences
              </button>

              <button className="btn text-start rounded-4 py-3"onClick={() => {
  setActiveMenu("appearance");
  scrollToSection(appearanceRef);
}}style={{
  background:
    activeMenu === "appearance"
      ? "linear-gradient(to right,#06d6ff,#7c3aed)"
      : "rgba(255,255,255,0.04)",

  color: "white",
  border: "1px solid rgba(255,255,255,0.06)",

  transition: "0.3s",
}}>
                <FaPalette className="me-2" />
                Appearance
              </button>

            </div>

          </div>

        </div>
{/* RIGHT SIDE */}

<div className="col-lg-9">

  {/* ALL CARDS WRAPPER */}

  <div
    className="d-flex flex-column"
    style={{
      gap: "24px",
    }}
  >

  {/* GENERAL SETTINGS */}
<div ref={profileRef} style={dynamicCardStyle}>

  <h5
    className="mb-4"
    style={{
      fontWeight: "600",
      fontSize: "18px",
      color: "#ffffff",
    }}
  >
    General Settings
  </h5>

  <div className="row g-4">

    {/* NAME */}

    <div className="col-md-6">

      <label className="mb-2">
        Full Name
      </label>

      <input
        type="text"
        className="form-control"
        placeholder="Enter name"
        style={{
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "white",
          borderRadius: "14px",
          height: "46px",
        }}
      />

    </div>

    {/* EMAIL */}

    <div className="col-md-6">

      <label className="mb-2">
        Email Address
      </label>

      <input
        type="email"
        className="form-control"
        placeholder="Enter email"
        style={{
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "white",
          borderRadius: "14px",
          height: "46px",
        }}
      />

    </div>

  </div>

</div>
{/* SECURITY SETTINGS */}

<div ref={securityRef} style={dynamicCardStyle}>
  <h5
    className="mb-4"
    style={{
      fontWeight: "600",
      fontSize: "18px",
      color: "#ffffff",
    }}
  >
    Security Settings
  </h5>

  <div className="row g-4">

    {/* CURRENT PASSWORD */}

    <div className="col-md-4">

      <label className="mb-2">
        Current Password
      </label>

      <input
        type="password"
        className="form-control"
        placeholder="Current password"
        style={{
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "white",
          borderRadius: "14px",
          height: "46px",
        }}
      />

    </div>

    {/* NEW PASSWORD */}

    <div className="col-md-4">

      <label className="mb-2">
        New Password
      </label>

      <input
        type="password"
        className="form-control"
        placeholder="New password"
        style={{
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "white",
          borderRadius: "14px",
          height: "46px",
        }}
      />

    </div>

    {/* CONFIRM PASSWORD */}

    <div className="col-md-4">

      <label className="mb-2">
        Confirm Password
      </label>

      <input
        type="password"
        className="form-control"
        placeholder="Confirm password"
        style={{
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "white",
          borderRadius: "14px",
          height: "46px",
        }}
      />

    </div>

  </div>

  {/* UPDATE BUTTON */}

  <div className="text-end mt-4">

    <button
      className="btn px-4 py-2"
      style={{
        background:
          "linear-gradient(to right,#06d6ff,#7c3aed)",
        color: "white",
        border: "none",
        borderRadius: "12px",
        fontWeight: "600",
      }}
    >
      Update Password
    </button>

  </div>

</div>


    {/* NOTIFICATION SETTINGS */}

<div ref={notificationRef} style={dynamicCardStyle}>
      {/* TOGGLES WRAPPER */}

      <div className="d-flex flex-column gap-3">

{/* TOGGLE 1 */}

<div style={toggleStyle}>

  <div>

    <h6
      style={{
        margin: 0,
        fontSize: "15px",
        fontWeight: "600",
      }}
    >
      Email Notifications
    </h6>

    <small
      style={{
        color: "#94a3b8",
      }}
    >
      Receive patient alerts and updates
    </small>

  </div>

  <div className="form-check form-switch m-0">

    <input
      className="form-check-input"
      type="checkbox"
checked={emailNotifications}

onChange={(e) =>
  setEmailNotifications(
    e.target.checked
  )
}      style={{
        width: "42px",
        height: "22px",
      }}
    />

  </div>

</div>
       {/* TOGGLE 2 */}

<div style={toggleStyle}>

  <div>

    <h6
      style={{
        margin: 0,
        fontSize: "15px",
        fontWeight: "600",
      }}
    >
      AI Risk Alerts
    </h6>

    <small
      style={{
        color: "#94a3b8",
      }}
    >
      Notify instantly when high-risk sleep disorders are detected
    </small>

  </div>

  <div className="form-check form-switch m-0">

    <input
      className="form-check-input"
      type="checkbox"
checked={aiAlerts}

onChange={(e) =>
  setAiAlerts(e.target.checked)
}      style={{
        width: "42px",
        height: "22px",
      }}
    />

  </div>

</div>

        {/* TOGGLE 3 */}

<div style={toggleStyle}>

  <div>

    <h6
      style={{
        margin: 0,
        fontSize: "15px",
        fontWeight: "600",
      }}
    >
      Dark Mode
    </h6>

    <small
      style={{
        color: "#94a3b8",
      }}
    >
      Enable futuristic AI healthcare dashboard appearance
    </small>

  </div>

  <div className="form-check form-switch m-0">

    <input
      className="form-check-input"
      type="checkbox"
      checked={darkMode}

onChange={(e) =>
  setDarkMode(e.target.checked)
}
      style={{
        width: "42px",
        height: "22px",
      }}
    />

  </div>

</div>
      </div>

    </div>

 {/* AI PREFERENCES */}

<div ref={aiRef} style={dynamicCardStyle}>
  <h5
    className="mb-4"
    style={{
      fontWeight: "600",
      fontSize: "18px",
      color: "#ffffff",
    }}
  >
    AI Preferences
  </h5>

  <div className="row g-4">

    {/* AI DETECTION */}

    <div className="col-md-6">

      <label
        className="mb-2"
        style={{
          fontSize: "14px",
        }}
      >
        AI Detection Sensitivity
      </label>

      <select
        className="form-select"
        style={{
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "white",
          borderRadius: "14px",
          height: "46px",
        }}
      >

        <option>Low</option>
        <option>Medium</option>
        <option>High</option>

      </select>

    </div>

    {/* CONFIDENCE */}

    <div className="col-md-6">

      <label
        className="mb-2"
        style={{
          fontSize: "14px",
        }}
      >
        Confidence Threshold
      </label>

      <select
        className="form-select"
        style={{
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "white",
          borderRadius: "14px",
          height: "46px",
        }}
      >

        <option>70%</option>
        <option>80%</option>
        <option>90%</option>

      </select>

    </div>

  </div>

  {/* AI TOGGLES */}

  <div className="d-flex flex-column gap-3 mt-4">

    {/* REAL TIME */}

    <div style={toggleStyle}>

      <div>

        <h6
          style={{
            margin: 0,
            fontSize: "15px",
            fontWeight: "600",
          }}
        >
          Real-Time Analysis
        </h6>

        <small
          style={{
            color: "#94a3b8",
          }}
        >
          Enable instant AI sleep disorder prediction analysis
        </small>

      </div>

      <div className="form-check form-switch m-0">

        <input
          className="form-check-input"
          type="checkbox"
          defaultChecked
          style={{
            width: "42px",
            height: "22px",
          }}
        />

      </div>

    </div>

    {/* AUTO RISK */}

    <div style={toggleStyle}>

      <div>

        <h6
          style={{
            margin: 0,
            fontSize: "15px",
            fontWeight: "600",
          }}
        >
          Auto Risk Detection
        </h6>

        <small
          style={{
            color: "#94a3b8",
          }}
        >
          Automatically classify patient sleep disorder risks
        </small>

      </div>

      <div className="form-check form-switch m-0">

        <input
          className="form-check-input"
          type="checkbox"
          defaultChecked
          style={{
            width: "42px",
            height: "22px",
          }}
        />

      </div>

    </div>

  </div>

</div>
   {/* APPEARANCE */}

<div
  ref={appearanceRef}
  style={{
    ...dynamicCardStyle,

    background:
      theme === "Medical Cyan"
        ? "rgba(0,217,255,0.08)"
        : theme === "Dark Glass"
        ? "rgba(255,255,255,0.02)"
        : "rgba(124,58,237,0.08)",

   
    backdropFilter: glassEffect
      ? "blur(14px)"
      : "none",

    padding: compactLayout
      ? "16px"
      : "28px",

    fontSize:
      fontSize === "Small"
        ? "13px"
        : fontSize === "Large"
        ? "17px"
        : "15px",

    transition: "0.4s",
  }}
>

  <h5
    className="mb-4"
    style={{
      fontWeight: "600",
      fontSize: "18px",
      color: "#ffffff",
    }}
  >
    Appearance Settings
  </h5>

  <div className="row g-4">

    {/* THEME */}

    <div className="col-md-6">

      <label
        className="mb-2"
        style={{
          fontSize: "14px",
        }}
      >
        Dashboard Theme
      </label>

      <select
          className="form-select"
  value={theme}
  onChange={(e) =>
    setTheme(e.target.value)}
        style={{
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "white",
          borderRadius: "14px",
          height: "46px",
        }}
      >

        <option  style={{
                   color: "black",
                  }}>Cyber Purple</option>
        <option style={{
                   color: "black",
                  }}>Medical Cyan</option>
        <option style={{
                   color: "black",
                  }}>Dark Glass</option>

      </select>

    </div>

    {/* FONT SIZE */}

    <div className="col-md-6">

      <label
        className="mb-2"
        style={{
          fontSize: "14px",
        }}
      >
        Font Size
      </label>

      <select
          className="form-select"
  value={fontSize}
  onChange={(e) =>
    setFontSize(e.target.value)
  }
        style={{
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "white",
          borderRadius: "14px",
          height: "46px",
          margin:"5px"
        }}
      >

        <option   style={{
          color: "black",
        }}>Small</option>
        <option   style={{
          color: "black",
        }}>Medium</option>
        <option   style={{
          color: "black",
        }}>Large</option>

      </select>

    </div>

  </div>

  {/* APPEARANCE TOGGLES */}

  <div className="d-flex flex-column gap-3 mt-4">

    {/* GLASS EFFECT */}

    <div style={toggleStyle}>

      <div>

        <h6
          style={{
            margin: 0,
            fontSize: "15px",
            fontWeight: "600",
          }}
        >
          Glassmorphism Effects
        </h6>

        <small
          style={{
            color: "#94a3b8",
          }}
        >
          Enable futuristic blur and transparency effects
        </small>

      </div>

      <div className="form-check form-switch m-0">

        <input
         className="form-check-input"
  type="checkbox"
  checked={glassEffect}
  onChange={(e) =>
    setGlassEffect(
      e.target.checked
    )
  }
          style={{
            width: "42px",
            height: "22px",
          }}
        />

      </div>

    </div>

    {/* COMPACT MODE */}

    <div style={toggleStyle}>

      <div>

        <h6
          style={{
            margin: 0,
            fontSize: "15px",
            fontWeight: "600",
          }}
        >
          Compact Layout
        </h6>

        <small
          style={{
            color: "#94a3b8",
          }}
        >
          Reduce spacing for dense enterprise dashboard layout
        </small>

      </div>

      <div className="form-check form-switch m-0">

        <input
          className="form-check-input"
          type="checkbox"
          checked={compactLayout}

onChange={(e) =>
  setCompactLayout(
    e.target.checked
  )
}
          style={{
            width: "42px",
            height: "22px",
          }}
        />

      </div>

    </div>

  </div>

</div>

{/* SYSTEM STATUS */}

<div style={dynamicCardStyle}>

  <h5
    className="mb-4 d-flex align-items-center gap-2"
    style={{
      fontWeight: "600",
      fontSize: "18px",
      color: "#ffffff",
    }}
  >

    <FaServer color="#06d6ff" />

    System Status

  </h5>

  <div className="d-flex flex-column gap-3">

    {/* STATUS ITEM */}

    <div style={toggleStyle}>

      <div className="d-flex align-items-center gap-3">

        <FaCheckCircle color="#22c55e" />

        <div>

          <h6
            style={{
              margin: 0,
            }}
          >
            AI Engine
          </h6>

          <small
            style={{
              color: "#94a3b8",
            }}
          >
            Prediction model running normally
          </small>

        </div>

      </div>

      <span
        style={{
          color: "#22c55e",
          fontWeight: "600",
        }}
      >
        Online
      </span>

    </div>

    {/* DATABASE */}

    <div style={toggleStyle}>

      <div className="d-flex align-items-center gap-3">

        <FaDatabase color="#06d6ff" />

        <div>

          <h6
            style={{
              margin: 0,
            }}
          >
            Database
          </h6>

          <small
            style={{
              color: "#94a3b8",
            }}
          >
            MySQL database connected successfully
          </small>

        </div>

      </div>

      <span
        style={{
          color: "#22c55e",
          fontWeight: "600",
        }}
      >
        Connected
      </span>

    </div>

  </div>

</div>
   {/* SAVE BUTTON */}

<div className="text-end">

  <button
    className="btn px-4 py-2"
    style={{
      background:
        "linear-gradient(to right,#06d6ff,#7c3aed)",
      color: "white",
      border: "none",
      borderRadius: "14px",
      fontWeight: "600",
      boxShadow:
        "0 0 15px rgba(0,217,255,0.2)",
    }}

    onClick={async () => {

      setSaving(true);

      try {

        await axios.put(
  "http://127.0.0.1:5000/settings/1",
  {
    dark_mode: darkMode,

    ai_alerts: aiAlerts,

    email_notifications:
      emailNotifications,

    compact_layout:
      compactLayout,
  }
);

toast.success(
  "Settings Saved Successfully"
);
      } catch (error) {

        console.log(error);

toast.error(
  "Failed to Save Settings"
);
      }

      setTimeout(() => {

        setSaving(false);

      }, 2000);

    }}
  >

    <FaSave className="me-2" />

    {saving ? "Saving..." : "Save Settings"}

  </button>

</div>

  </div>

</div>
</div>
</div>  
<ToastContainer position="top-right" />
  </ DashboardLayout>
  );
  };

export default Settings;