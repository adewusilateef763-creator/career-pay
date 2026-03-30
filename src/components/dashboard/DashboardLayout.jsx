import React, { useState } from "react";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] dark:bg-gray-900 font-sfPro transition-colors duration-300 flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col min-h-screen lg:ml-64">
        {/* Header */}
        <DashboardHeader toggleSidebar={toggleSidebar} />

        {/* Dynamic Page Content */}
        <main className="p-6 lg:p-10 flex-grow">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
