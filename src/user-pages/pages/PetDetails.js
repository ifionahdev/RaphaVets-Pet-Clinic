import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../template/Header";
import SideBar from "../template/SideBar";

function PetDetails() {
  const { state } = useLocation();
  const pet = state?.pet || {
    name: "Unknown Pet",
    breed: "Unknown Breed",
    age: "N/A",
    gender: "N/A",
    photo: "https://via.placeholder.com/150",
    lastCheck: "N/A",
    health: "N/A",
  };

  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Appointments");

  const tabs = ["Appointments", "Medical Records", "Diet & Feeding", "Health Tracker", "Behavior Notes"];

  return (
    <div className="font-sansation min-h-screen bg-[#FBFBFB] relative">
      {/* HEADER */}
      <Header setIsMenuOpen={setIsMenuOpen}/>

      {/* MAIN LAYOUT */}
      <div className="flex flex-row gap-5 px-5 sm:px-12 animate-fadeSlideUp">
        {/* SIDEBAR */}
        <SideBar
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          pets={[pet]}
          setShowModal={() => {}}
        />

        {/* PAGE CONTENT */}
        <div
          className={`transition-all duration-500 ease-in-out flex flex-col gap-7 rounded-xl p-5 w-full ${
            !isMenuOpen ? "md:w-full" : "md:w-[calc(100%-250px)]"
          }`}
        >
          {/* PET HEADER SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-3xl shadow-[0_0_15px_rgba(0,0,0,0.15)] backdrop-blur-md bg-white/30 border border-white/40"
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-5 p-6">
              <div className="flex items-center gap-5">
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#5EE6FE]">
                  <img
                    src={pet.photo}
                    alt={pet.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{pet.name}</h2>
                  <p className="text-gray-500 text-sm">
                    {pet.breed} • {pet.gender} • {pet.age}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap justify-center sm:justify-end gap-4 text-sm">
                <div className="px-4 py-2 bg-white/60 border border-white/50 rounded-xl shadow-sm text-gray-700">
                  <i className="fa-solid fa-heartbeat text-[#5EE6FE] mr-2"></i>
                  {pet.health || "Healthy"}
                </div>
                <div className="px-4 py-2 bg-white/60 border border-white/50 rounded-xl shadow-sm text-gray-700">
                  <i className="fa-solid fa-calendar-check text-[#5EE6FE] mr-2"></i>
                  Last Check: {pet.lastCheck || "N/A"}
                </div>
              </div>
            </div>
          </motion.div>

          {/* TABS */}
          <div className="bg-white rounded-2xl shadow-[0_0_10px_rgba(0,0,0,0.1)]">
            <div className="flex flex-wrap gap-5 px-6 py-3 border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`transition-all duration-300 font-medium ${
                    activeTab === tab
                      ? "text-[#5EE6FE] border-b-2 border-[#5EE6FE]"
                      : "text-gray-500 hover:text-[#5EE6FE]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* TAB CONTENT */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 min-h-[300px]"
            >
              {activeTab === "Appointments" && (
                <div className="flex flex-col gap-4">
                  <div className="p-4 rounded-2xl bg-[#EAFBFD] shadow-sm flex justify-between items-center">
                    <span className="text-gray-700 font-medium">No upcoming appointments</span>
                    <button className="bg-[#5EE6FE] text-white px-4 py-2 rounded-lg hover:bg-[#3ecbe0] transition-all">
                      Book Appointment
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "Medical Records" && (
                <div className="flex flex-col gap-4">
                  <div className="p-4 rounded-2xl bg-[#F5F7F8] shadow-sm text-gray-600 text-sm">
                    No medical records yet.
                  </div>
                </div>
              )}

              {activeTab === "Diet & Feeding" && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-white/60 border border-white/50 rounded-xl shadow-md">
                    <h4 className="font-semibold text-gray-800 mb-2">Feeding Schedule</h4>
                    <p className="text-gray-600 text-sm">8:00 AM • Chicken Meal</p>
                    <p className="text-gray-600 text-sm">6:00 PM • Kibble + Water</p>
                  </div>
                  <div className="p-4 bg-white/60 border border-white/50 rounded-xl shadow-md">
                    <h4 className="font-semibold text-gray-800 mb-2">Diet Notes</h4>
                    <p className="text-gray-600 text-sm">
                      Avoid dairy and chocolate. Provide filtered water only.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "Health Tracker" && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-white/60 border border-white/50 rounded-xl shadow-md">
                    <h4 className="font-semibold text-gray-800 mb-2">Weight</h4>
                    <p className="text-gray-600 text-sm">Last recorded: 6.5 kg</p>
                  </div>
                  <div className="p-4 bg-white/60 border border-white/50 rounded-xl shadow-md">
                    <h4 className="font-semibold text-gray-800 mb-2">Vaccination Status</h4>
                    <p className="text-gray-600 text-sm">Up-to-date</p>
                  </div>
                </div>
              )}

              {activeTab === "Behavior Notes" && (
                <div className="p-4 bg-white/60 border border-white/50 rounded-xl shadow-md text-gray-700 text-sm">
                  <p>No notes yet. Add training updates or habits here.</p>
                </div>
              )}
            </motion.div>
          </div>

          {/* FLOATING ACTION BUTTONS */}
          <div className="fixed bottom-8 right-6 flex flex-col items-end gap-3 z-50">
            <button className="bg-[#5EE6FE] text-white p-4 rounded-full shadow-lg hover:bg-[#3ecbe0] hover:scale-110 transition-all duration-300">
              <i className="fa-solid fa-plus"></i>
            </button>
            <button className="bg-white text-[#5EE6FE] border border-[#5EE6FE] p-4 rounded-full shadow-lg hover:bg-[#5EE6FE] hover:text-white hover:scale-110 transition-all duration-300">
              <i className="fa-solid fa-pen"></i>
            </button>
            <button className="bg-white text-[#5EE6FE] border border-[#5EE6FE] p-4 rounded-full shadow-lg hover:bg-[#5EE6FE] hover:text-white hover:scale-110 transition-all duration-300">
              <i className="fa-solid fa-stethoscope"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetDetails;
