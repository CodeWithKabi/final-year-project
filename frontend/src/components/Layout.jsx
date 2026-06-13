import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useState } from "react";
const Layout = ({ children }) => {
const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className="d-flex"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom right,#1e0b4b,#071028)",
      }}
    >

      {/* SIDEBAR */}

     <Sidebar
  sidebarOpen={sidebarOpen}
  setSidebarOpen={setSidebarOpen}
/>
{
  sidebarOpen && (
    <div
      className="sidebar-overlay"
      onClick={() =>
        setSidebarOpen(false)
      }
    />
  )
}

      {/* MAIN CONTENT */}

      <div className="main-content">

        {/* NAVBAR */}

       <Navbar
 
  setSidebarOpen={setSidebarOpen}
/>

  
<div
  style={{
    paddingTop: "80px",
  }}
>
  {children}
</div>

      </div>

    </div>
  );
};

export default Layout;