import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUserInjured,
  FaDatabase,
  FaBrain,
  FaChartBar,
  FaFileMedical,
  FaCog,
  FaHistory,
  FaBalanceScale,
} from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}) {
  return (
    
    <div
      className={`sidebar ${
        sidebarOpen ? "show-sidebar" : ""
      }`}
      style={{
  width: "260px",
  height: "100vh",
  background:
    "linear-gradient(to bottom,#4c1d95,#7c3aed)",
  color: "white",
  position: "fixed",
  padding: "20px",
  textAlign: "center",
  scrollbarWidth: "none",
  display: "flex",
flexDirection: "column",
}}
    >

      
      <div
  className="mobile-close"
  onClick={() => setSidebarOpen(false)}
>
  <FaTimes />
</div>
      <img
        src="/logo.png"
        alt="logo"
        style={{
          width: "60px",
          marginBottom: "10px",
        }}
      />

      <h3
  style={{
    fontSize:"20px",
    fontWeight:"700",
    marginBottom:"25px"
  }}
>
  SleepAI
</h3>

<p
  style={{
    color:"#cbd5e1",
    fontSize:"13px",
    marginTop:"-15px"
  }}
>
  Healthcare Analytics
</p>

{/* scroll  */}

<div
  className="sidebar-menu"
  style={{
    marginTop: "30px",
    flex: 1,
    overflowY: "auto",
  }}
>        <SidebarLink
          to="/"
          icon={<FaHome />}
          text="Dashboard"
          setSidebarOpen={setSidebarOpen}
        />

        <SidebarLink
          to="/patients"
          icon={<FaUserInjured />}
          text="Patients"
          setSidebarOpen={setSidebarOpen}
        />

        <SidebarLink
          to="/dataset"
          icon={<FaDatabase />}
          text="Dataset"
          setSidebarOpen={setSidebarOpen}
        />

        <SidebarLink
          to="/prediction"
          icon={<FaBrain />}
          text="Prediction"
          setSidebarOpen={setSidebarOpen}
        />

        <SidebarLink
          to="/comparison"
          icon={<FaBalanceScale />}
          text="Model Comparison"
          setSidebarOpen={setSidebarOpen}
        />

        <SidebarLink
          to="/history"
          icon={<FaHistory />}
          text="Prediction History"
          setSidebarOpen={setSidebarOpen}
        />

        <SidebarLink
          to="/analytics"
          icon={<FaChartBar />}
          text="Analytics"
          setSidebarOpen={setSidebarOpen}
        />

        <SidebarLink
          to="/reports"
          icon={<FaFileMedical />}
          text="Reports"
          setSidebarOpen={setSidebarOpen}
        />

        <SidebarLink
          to="/settings"
          icon={<FaCog />}
          text="Settings"
          setSidebarOpen={setSidebarOpen}
        />
      </div>

      <div
  style={{
   
    textAlign:"center",
    color:"#cbd5e1",
    fontSize:"12px",
  }}
>
  SleepAI v1.0
</div>
    </div>
  );
}

function SidebarLink({
  to,
  icon,
  text,
  setSidebarOpen,
}) {
  return (
    <NavLink
      to={to}
      style={{ textDecoration: "none" }}
      onClick={() => setSidebarOpen(false)}
    >
      {({ isActive }) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "14px",
            marginBottom: "12px",
            borderRadius: "14px",
            color: "white",

            background: isActive
              ? "linear-gradient(to right,#7c3aed,#9333ea)"
              : "rgba(255,255,255,0.08)",

            boxShadow: isActive
              ? "0 0 20px rgba(168,85,247,0.4)"
              : "none",

            transition: "0.3s",
            cursor: "pointer",
          }}
        >
          {icon}
          {text}
        </div>
      )}
    </NavLink>
  );
}