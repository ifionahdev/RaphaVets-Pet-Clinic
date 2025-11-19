import React, { useState } from "react";
import Sidebar from "./template/Sidebar";
import Header from "./template/Header";

// Import the new pages
import Dashboard from "./pages/Dashboard";
import DiagnosticTool from "./pages/DiagnosticTools";
import CustomerPets from "./pages/CustomerPets";
import VetAppointmentsVisits from "./pages/VetAppointmentsVisits";

const VetLayout = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "diagnostic":
        return <DiagnosticTool />;
      case "customers-pets":
        return <CustomerPets />;
      case "appointments":
        return <VetAppointmentsVisits />;
      default:
        return <Dashboard />;
    }
  };

  const getPageTitle = () => {
    const titles = {
      dashboard: "Dashboard",
      diagnostic: "Diagnostic Tool", 
      "customers-pets": "Customers & Pets",
      appointments: "Appointments & Visits"
    };
    return titles[activeTab] || "VetAI Dashboard";
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        {/* <Header title={getPageTitle()} /> */}

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default VetLayout;