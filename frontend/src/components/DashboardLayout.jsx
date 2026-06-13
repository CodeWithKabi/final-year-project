import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import MobileBottomNav from "./MobileBottomNav";

export default function DashboardLayout({
  children,
  title
}) {

  const [sidebarOpen, setSidebarOpen] = useState(false);

 return (

  <div className="layout">

    <Sidebar
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
    />

    <div className="main-content">

      <Navbar
        title={title}
        setSidebarOpen={setSidebarOpen}
      />

      <div
        style={{
          marginTop: "20px"
        }}
      >
        {children}
      </div>

    </div>

   <MobileBottomNav
  sidebarOpen={sidebarOpen}
/>

  </div>

);
}