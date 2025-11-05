import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../template/Header";
import Sidebar from "../template/SideBar";
import PetInfo from "../components/home/PetInfo";
import AddPetModal from "../components/home/AddPetModal";
import FloatingChatBox from "../components/FloatingChatBox";
import Booking from "./Booking";

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Appointment");
  const [pets, setPets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newPet, setNewPet] = useState({ photo: null, name: "", breed: "", age: "", gender: "" });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentPetIndex, setCurrentPetIndex] = useState(0);
  const [chatType, setChatType] = useState(null);
  const [isExpandedChat, setIsExpandedChat] = useState(false);

  const [appointmentFilter, setAppointmentFilter] = useState("Upcoming");
  const appointments = [
    { id: 1, petName: "Miguel", type: "General Checkup", date: "Nov 10, 2025", status: "Upcoming" },
    { id: 2, petName: "Mark", type: "Vaccination", date: "Nov 12, 2025", status: "Upcoming" },
    { id: 3, petName: "Jordan", type: "Grooming", date: "Oct 25, 2025", status: "Done" },
  ];
  const filteredAppointments = appointments.filter(
    (a) => appointmentFilter === "All" || a.status === appointmentFilter
  );

  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved) setDarkMode(saved === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleAddPet = () => {
    if (!newPet.name || !newPet.photo) return;
    setPets([...pets, newPet]);
    setNewPet({ photo: null, name: "", breed: "", age: "", gender: "" });
    setShowModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewPet({ ...newPet, photo: e.target.result });
        setShowPhotoOptions(false);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div
      className={`font-sansation min-h-screen relative ${
        darkMode ? "bg-[#1E1E1E] text-white" : "bg-[#FBFBFB]"
      } ${isChatOpen ? "overflow-hidden" : ""}`}
    >
      <Header darkMode={darkMode} setDarkMode={setDarkMode} setIsMenuOpen={setIsMenuOpen} />

      <div className="flex flex-row gap-5 px-5 sm:px-12 animate-fadeSlideUp">
        <Sidebar
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          pets={pets}
          setShowModal={setShowModal}
        />

        <div
          className={`transition-all duration-500 ease-in-out flex flex-col gap- rounded-xl p-5 w-full ${
            !isMenuOpen ? "md:w-full" : "md:w-[calc(100%-250px)]"
          }`}
        >
          {/* TOP HOME DASHBOARD */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
            <div className="bg-[#FCE7F3] text-[#045D56] p-5 rounded-xl shadow-lg flex flex-col justify-between cursor-pointer hover:scale-105 transition-all">
              <div>
                <h3 className="font-bold text-lg mb-2">Daily Walks</h3>
                <p className="text-sm">Take your dog for at least 30 minutes of walking to keep them healthy.</p>
              </div>
              <div className="mt-3 flex justify-end text-2xl">
                <i className="fa-solid fa-dumbbell"></i>
              </div>
            </div>

            <div className="bg-[#E3FAF7] text-[#7C2E38] p-5 rounded-xl shadow-lg flex flex-col justify-between cursor-pointer hover:scale-105 transition-all">
              <div>
                <h3 className="font-bold text-lg mb-2">Hydration Reminder</h3>
                <p className="text-sm">Ensure your pet has access to fresh water at all times.</p>
              </div>
              <div className="mt-3 flex justify-end text-2xl">
                <i className="fa-solid fa-droplet"></i>
              </div>
            </div>

            <div
              onClick={() => navigate("/booking")}
              className="bg-[#FFF4E5] text-[#5E2A4F] p-5 rounded-xl shadow-lg flex flex-col justify-between cursor-pointer hover:scale-105 transition-all"
            >
              <div>
                <h3 className="font-bold text-lg mb-2">Book Appointment</h3>
                <p className="text-sm">Schedule a visit with your vet in just a few clicks.</p>
              </div>
              <div className="mt-3 flex justify-end text-2xl">
                <i className="fa-solid fa-calendar-days"></i>
              </div>
            </div>
          </div>

          {/* TABS SECTION */}
          <div className="px-6 py-4 rounded-2xl bg-white shadow-lg flex flex-col h-[350px]">
            <div className="font-semibold flex gap-6 border-b pb-3 mb-4">
              {["Appointment", "Medical Reports", "Lab Records"].map((tab) => (
                <span
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`cursor-pointer transition-colors duration-300 ${
                    activeTab === tab
                      ? "text-[#5EE6FE] border-b-2 border-[#5EE6FE] pb-1"
                      : "text-gray-400 hover:text-[#5EE6FE]"
                  }`}
                >
                  {tab}
                </span>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto flex flex-col gap-4">
              {/* --- APPOINTMENTS TAB --- */}
              {activeTab === "Appointment" && (
                <div className="flex flex-col flex-1 gap-3">
                  <div className="flex gap-3 mb-3">
                    {["Upcoming", "Done", "All"].map((status) => (
                      <button
                        key={status}
                        onClick={() => setAppointmentFilter(status)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition 
                          ${
                            appointmentFilter === status
                              ? "bg-[#5EE6FE] text-white shadow"
                              : "bg-gray-100 text-gray-600 hover:bg-[#d3f2fa]"
                          }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>

                  {filteredAppointments.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
                      No {appointmentFilter.toLowerCase()} appointments
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4 overflow-y-auto">
                      {filteredAppointments.map((appt) => (
                        <div
                          key={appt.id}
                          className="bg-white/70 backdrop-blur-md border border-[#5EE6FE]/30 p-4 rounded-xl flex justify-between items-center shadow-md hover:shadow-lg hover:bg-[#EFFFFF]/60 transition-all cursor-pointer"
                        >
                          <div>
                            <p className="font-semibold text-gray-800">
                              {appt.petName} — {appt.type}
                            </p>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                              <i className="fa-regular fa-calendar"></i> {appt.date}
                            </p>
                          </div>
                          <button className="bg-[#5EE6FE] text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#3ecbe0] transition">
                            View Details
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* --- MEDICAL REPORTS TAB --- */}
              {activeTab === "Medical Reports" && (
                <>
                  {[
                    { pet: "Buddy", test: "Heartworm Test", result: "Negative", date: "Nov 01, 2025" },
                    { pet: "Luna", test: "Blood Test", result: "Normal", date: "Oct 25, 2025" },
                  ].map((report, i) => (
                    <div
                      key={i}
                      className="bg-white/70 backdrop-blur-md border border-orange-300/40 p-4 rounded-xl flex justify-between items-center shadow-md hover:shadow-xl hover:bg-[#FFF8E7]/60 transition-all cursor-pointer"
                    >
                      <div>
                        <p className="font-semibold text-gray-800">{report.pet} — {report.test}</p>
                        <p className="text-xs text-gray-500">
                          Result: <span className="font-medium text-orange-600">{report.result}</span> | {report.date}
                        </p>
                      </div>
                      <button className="bg-[#FFA500] text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#e59400] transition">
                        Download PDF
                      </button>
                    </div>
                  ))}
                </>
              )}

              {/* --- LAB RECORDS TAB --- */}
              {activeTab === "Lab Records" && (
                <>
                  {[
                    { pet: "Buddy", test: "CBC", date: "Oct 28, 2025" },
                    { pet: "Luna", test: "Urinalysis", date: "Oct 20, 2025" },
                  ].map((lab, i) => (
                    <div
                      key={i}
                      className="bg-white/70 backdrop-blur-md border border-purple-300/40 p-4 rounded-xl flex justify-between items-center shadow-md hover:shadow-xl hover:bg-[#F9F1FF]/60 transition-all cursor-pointer"
                    >
                      <div>
                        <p className="font-semibold text-gray-800">{lab.pet} — {lab.test}</p>
                        <p className="text-xs text-gray-500">
                          Completed: {lab.date}
                        </p>
                      </div>
                      <button className="bg-[#9C27B0] text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#7B1FA2] transition">
                        View Record
                      </button>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chat Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-8 right-8 sm:bottom-12 sm:right-20 bg-[#5EE6FE] text-white text-2xl w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-[#3ecbe0] transition-all duration-300 z-50"
      >
        <i className="fa-regular fa-comment"></i>
      </button>

      {isChatOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40 animate-fadeIn"
            onClick={() => setIsChatOpen(false)}
          ></div>
          <div className="fixed bottom-32 right-8 sm:right-20 bg-white rounded-2xl shadow-xl p-4 z-50 w-52 flex flex-col gap-3 animate-popUp">
            <button
              className="bg-[#5EE6FE] text-white font-semibold py-2 rounded-lg hover:bg-[#3ecbe0] transition-all"
              onClick={() => {
                setIsExpandedChat(true);
                setChatType("ai");
                setIsChatOpen(false);
              }}
            >
              Chat with AI
            </button>
            <button
              className="bg-[#EEF4F5] text-gray-700 font-semibold py-2 rounded-lg hover:bg-[#d9d9d9] transition-all"
              onClick={() => {
                setIsExpandedChat(true);
                setChatType("pro");
                setIsChatOpen(false);
              }}
            >
              Chat with Professional
            </button>
          </div>
        </>
      )}

      {chatType && <FloatingChatBox type={chatType} onClose={() => setChatType(null)} />}

      {showSuccess && (
        <div className="fixed top-[80px] right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 w-[300px] overflow-hidden">
          <span className="font-semibold">Pet added successfully!</span>
          <div className="mt-2 h-1 w-full bg-green-400 relative overflow-hidden rounded">
            <div className="absolute top-0 left-0 h-full bg-white animate-progress"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
