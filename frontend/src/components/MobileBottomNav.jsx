import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUserInjured,
  FaBrain,
  FaFileMedical,
  FaCog,
} from "react-icons/fa";

export default function MobileBottomNav({
  sidebarOpen
}) {
  return (
    <div
  className={`mobile-bottom-nav ${
    sidebarOpen ? "hide-bottom-nav" : ""
  }`}
>

      <NavLink to="/">
        {({ isActive }) => (
          <div className={isActive ? "nav-item active" : "nav-item"}>
            <FaHome />
            <span>Home</span>
          </div>
        )}
      </NavLink>

      <NavLink to="/patients">
        {({ isActive }) => (
          <div className={isActive ? "nav-item active" : "nav-item"}>
            <FaUserInjured />
            <span>Patients</span>
          </div>
        )}
      </NavLink>

      <NavLink to="/prediction">
        {({ isActive }) => (
          <div className={isActive ? "nav-item active" : "nav-item"}>
            <FaBrain />
            <span>Predict</span>
          </div>
        )}
      </NavLink>

      <NavLink to="/reports">
        {({ isActive }) => (
          <div className={isActive ? "nav-item active" : "nav-item"}>
            <FaFileMedical />
            <span>Reports</span>
          </div>
        )}
      </NavLink>

      <NavLink to="/settings">
        {({ isActive }) => (
          <div className={isActive ? "nav-item active" : "nav-item"}>
            <FaCog />
            <span>Settings</span>
          </div>
        )}
      </NavLink>

    </div>
  );
}