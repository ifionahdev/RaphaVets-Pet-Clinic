import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../template/Header";
import Sidebar from "../template/SideBar";
import FloatingChatBox from "../components/FloatingChatBox";

// Component imports
import DashboardCard from "../components/home/DashboardCard";
import AppointmentTab from "../components/home/AppointmentTab";
import MedicalReportsTab from "../components/home/MedicalReportsTab";
import LabRecordsTab from "../components/home/LabRecordsTab";
import ViewDetailsModal from "../components/home/ViewDetailsModal";

import api from "../../api/axios";


function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Appointment");
  const [darkMode, setDarkMode] = useState(false);
  const [chatType, setChatType] = useState(null);
  const [appointmentFilter, setAppointmentFilter] = useState("Upcoming");

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved) setDarkMode(saved === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token"); 
        const res = await api.get("/appointment/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAppointments(res.data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    };

    fetchAppointments();
  }, []);


  const filteredAppointments = appointments.filter(
    (a) => appointmentFilter === "All" || a.status === appointmentFilter
  );

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setShowDetailsModal(true);
  };

  const closeModal = () => {
    setShowDetailsModal(false);
    setSelectedAppointment(null);
  };

  return (
    <div className={`font-sansation min-h-screen relative ${darkMode ? "bg-[#1E1E1E] text-white" : "bg-[#FBFBFB]"} ${isChatOpen ? "overflow-hidden" : ""}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} setIsMenuOpen={setIsMenuOpen} />

      <div className="flex flex-row gap-5 px-5 sm:px-12 animate-fadeSlideUp">
        <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        <div className={`transition-all duration-500 ease-in-out flex flex-col gap-5 rounded-xl p-5 w-full ${!isMenuOpen ? "md:w-full" : "md:w-[calc(100%-250px)]"}`}>
          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
            <DashboardCard title="Daily Walks" description="Take your dog for at least 30 minutes of walking to keep them healthy." icon="fa-dumbbell" bg="#FCE7F3" text="#045D56" />
            <DashboardCard title="Hydration Reminder" description="Ensure your pet has access to fresh water at all times." icon="fa-droplet" bg="#E3FAF7" text="#7C2E38" />
            <DashboardCard title="Book Appointment" description="Schedule a visit with your vet in just a few clicks." icon="fa-calendar-days" bg="#FFF4E5" text="#5E2A4F" onClick={() => navigate("/booking")} />
          </div>

          {/* Tabs Section */}
          <div className="px-6 py-4 rounded-2xl bg-white shadow-lg flex flex-col h-[350px]">
            <div className="font-semibold flex gap-6 border-b pb-3 mb-4">
              {["Appointment", "Medical Reports", "Lab Records"].map((tab) => (
                <span
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`cursor-pointer transition-colors duration-300 ${activeTab === tab ? "text-[#5EE6FE] border-b-2 border-[#5EE6FE] pb-1" : "text-gray-400 hover:text-[#5EE6FE]"}`}
                >
                  {tab}
                </span>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto flex flex-col gap-4">
              {activeTab === "Appointment" && (
                <AppointmentTab appointments={filteredAppointments} appointmentFilter={appointmentFilter} setAppointmentFilter={setAppointmentFilter} handleViewDetails={handleViewDetails} />
              )}
              {activeTab === "Medical Reports" && <MedicalReportsTab />}
              {activeTab === "Lab Records" && <LabRecordsTab />}
            </div>
          </div>
        </div>
      </div>

      {/* View Details Modal */}
      {showDetailsModal && selectedAppointment && <ViewDetailsModal appointment={selectedAppointment} closeModal={closeModal} />}

      {/* Floating Chat Button */}
      <button 
        onClick={() => setChatType("ai")} 
        className="fixed bottom-8 right-8 sm:bottom-12 sm:right-20 bg-[#5EE6FE] text-white text-2xl w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300 z-50 group"
      >
        <i className="fa-regular fa-comment group-hover:scale-110 transition-transform duration-300"></i>
      </button>

      {chatType && <FloatingChatBox type={chatType} onClose={() => setChatType(null)} />}
    </div>
  );
}

export default Home;