import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FaBell, FaUserCircle, FaBars } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useRef, useEffect } from "react";
export default function Navbar({ title, setSidebarOpen }) {
  const navigate = useNavigate();
const [showMenu, setShowMenu] = useState(false);
const menuRef = useRef();
  const handleLogout = () => {
    toast.success("Logout Successful");

    localStorage.clear();

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  useEffect(() => {
  const closeMenu = (e) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target)
    ) {
      setShowMenu(false);
    }
  };

  document.addEventListener("mousedown", closeMenu);

  return () =>
    document.removeEventListener(
      "mousedown",
      closeMenu
    );
}, []);
  return (
    <div
      className="navbar"
      style={{
        position: "sticky",
        top: "0px",
        zIndex: 999,
        marginBottom: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
padding: "12px 16px",
borderRadius: "18px",
height: "60px",

        background: "rgba(25,15,45,0.75)",
        backdropFilter: "blur(25px)",
        border: "1px solid rgba(255,255,255,0.08)",

        boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
      }}
    >
      {/* LEFT */}{" "}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div className="mobile-menu-btn" onClick={() => setSidebarOpen(true)}>
          <FaBars size={22} color="white" />
        </div>

      <h1
  className="navbar-title"
  style={{
    margin: 0,
    fontSize: "35px",
    fontWeight: "700",
    background:
      "linear-gradient(to right,#38bdf8,#c084fc)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  }}
>
  {title}
</h1>
      </div>

      {/* RIGHT */}
      <div
        className="desktop-actions"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        
       
        {/* PROFILE */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
         <div
  onClick={() => setShowMenu(!showMenu)}
  style={{
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.08)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    border: "1px solid rgba(255,255,255,0.1)",
  }}
>
  <FaUserCircle
    size={24}
    color="#f9a8d4"
  />
</div>

          <small
            className="profile-label"
            style={{
              color: "#94a3b8",
              fontSize: "10px",
              marginTop: "2px",
            }}
          >
            Demo Login
          </small>
        </div>

        {/* LOGOUT */}{" "}
        <button
          className="logout-btn"
          onClick={handleLogout}
          style={{
            width: "140px",
            marginTop: "0",
            borderRadius: "16px",
            background: "linear-gradient(to right,#06b6d4,#2563eb)",
            fontWeight: "600",
            boxShadow: "0 4px 20px rgba(6,182,212,0.4)",
          }}
        >
         
          Logout{" "}
        </button>{" "}
        <ToastContainer />
      </div>{" "}

      {/* Mobile-view */}
     <div
  className="mobile-actions"
  ref={menuRef}
  style={{
    position: "relative",
  }}
>
  <FaUserCircle
    size={30}
    color="#f9a8d4"
    style={{ cursor: "pointer" }}
    onClick={() => setShowMenu(!showMenu)}
  />

  {showMenu && (
    <div
      style={{
        position: "absolute",
        top: "45px",
        right: "0",
        width: "180px",
        background: "#2d1b4e",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "25px",
        padding: "15px",
        boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
      }}
    >
      <h4
        style={{
          margin: 0,
          color: "white",
          fontSize: "15px",
        }}
      >
        Demo User
      </h4>

      <p
        style={{
          marginTop: "5px",
          fontSize: "12px",
          color: "#94a3b8",
        }}
      >
        admin@gmail.com
      </p>

      <hr
        style={{
          border: "none",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          margin: "10px 0",
        }}
      />

      <button
        onClick={handleLogout}
        style={{
          width: "100%",
          padding: "10px",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          color: "white",
          fontWeight: "600",
          background:
            "linear-gradient(to right,#ef4444,#dc2626)",
        }}
      >
        Logout
      </button>
    </div>
  )}
</div>
    </div>

    
  );
}
