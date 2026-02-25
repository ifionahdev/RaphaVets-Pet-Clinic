import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isBefore,
} from "date-fns";

import StepPill from "../components/booking/StepPill";
import Step1Service from "../components/booking/Step1Service";
import Step2DateTime from "../components/booking/Step2DateTime";
import Step3Details from "../components/booking/Step3Details";
import Step4Review from "../components/booking/Step4Review";
import Step5Success from "../components/booking/Step5Success";
import AppointmentSummary from "../components/booking/AppointmentSummary";
import TipsCard from "../components/booking/TipsCard";
import api from "../../api/axios";

const SERVICE_TYPES = [
  { id: "consult", label: "Consultation", note: "General check-up" },
  { id: "surgery", label: "Basic Soft Tissue Surgery", note: "Scheduled procedure" },
  { id: "cbc", label: "CBC", note: "Complete blood count" },
  { id: "microchip", label: "Microchipping", note: "Permanent ID implant" },
  { id: "deworm", label: "Deworming", note: "Parasite control" },
  { id: "vax", label: "Vaccination", note: "Routine vaccines" },
  { id: "chem", label: "Blood Chemistry Lab", note: "Detailed panel" },
  { id: "vhc", label: "Veterinary Health Certificate", note: "Travel & export docs" },
  { id: "confinement", label: "Confinement", note: "Overnight observation" },
  { id: "dental", label: "Dental Prophylaxis", note: "Cleaning & check" },
];

const getTimeSlotsForDate = (date) => {
  return ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM"];
};

function Booking() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedPet, setSelectedPet] = useState(null);
  const [pets, setPets] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [confirmed, setConfirmed] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  // OWNER INFO
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNo: "",
  });

  // Fetch pets
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await api.get("/pets", { headers: { Authorization: `Bearer ${token}` } });
        setPets(res.data);
      } catch (err) {
        console.error("Failed to fetch pets:", err);
      }
    };
    fetchPets();
  }, []);

  // Fetch user profile once
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");
        if (!userId || !token) return;

        const res = await api.get(`/users/${userId}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(res.data);
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      }
    };
    fetchUserProfile();
  }, []);

  // Calendar generation
  const calendar = useMemo(() => {
    const startMonth = startOfMonth(currentMonth);
    const endMonth = endOfMonth(currentMonth);
    const startDate = startOfWeek(startMonth, { weekStartsOn: 0 });
    const endDate = endOfWeek(endMonth, { weekStartsOn: 0 });

    const rows = [];
    let day = startDate;
    while (day <= endDate) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        week.push(day);
        day = addDays(day, 1);
      }
      rows.push(week);
    }
    return rows;
  }, [currentMonth]);

  const prevMonth = () => setCurrentMonth((m) => subMonths(m, 1));
  const nextMonth = () => setCurrentMonth((m) => addMonths(m, 1));
  const goToStep = (s) => setStep(s);

  const resetBooking = () => {
    setStep(1);
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedTime("");
    setSelectedPet(null);
    setConfirmed(false);
  };

  const handleConfirm = () => {
    setConfirmed(true);
    setStep(5);
  };

  useEffect(() => {
    if (selectedService) setStep(2);
  }, [selectedService]);

  const isPast = (d) => {
    const today = new Date();
    const compare = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return isBefore(d, compare);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] flex items-start justify-center py-4 sm:py-6 md:py-10 px-3 sm:px-4">
      <div className="w-full max-w-5xl">
        {/* HEADER*/}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="sticky top-0 z-40 w-full flex flex-col sm:flex-row items-center justify-between gap-3 backdrop-blur-lg bg-white/70 border border-white/50 shadow-md rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 mb-4 sm:mb-6 md:mb-8"
        >
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-2">
              <img src="./images/logo.png" alt="Sortify Logo" className="w-6 h-6 sm:w-8 sm:h-8 object-contain" />
              <h1 className="text-lg sm:text-xl font-bold text-gray-800">RVCare</h1>
            </div>
            <div className="sm:hidden text-right">
              <h2 className="text-sm font-semibold text-gray-700">Book Appointment</h2>
            </div>
          </div>
          
          {/* Desktop title */}
          <div className="hidden sm:block text-center flex-1">
            <h2 className="text-lg md:text-xl font-semibold text-gray-700">Book an Appointment</h2>
            <p className="text-xs md:text-sm text-gray-500">Schedule your pet’s next visit easily</p>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={() => setShowCancelModal(true)}
              className="flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100 transition-all duration-300 text-xs sm:text-sm"
            >
              <i className="fa-solid fa-xmark"></i>
              <span className="hidden xs:inline">Cancel</span>
            </button>
            <button
              onClick={resetBooking}
              className="flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-[#5EE6FE] text-white font-semibold hover:bg-[#3ecbe0] shadow-md transition-all duration-300 text-xs sm:text-sm"
            >
              <i className="fa-solid fa-rotate-right"></i>
              <span className="hidden xs:inline">Reset</span>
            </button>
          </div>
        </motion.header>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {/* Left Column: Steps */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-5 md:space-y-6">
            {/* STEP INDICATOR*/}
            <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm">
              {/* Desktop Version */}
              <div className="hidden md:flex items-center justify-between">
                <StepPill number={1} active={step === 1} done={step > 1}>
                  Select service
                </StepPill>
                <div className="flex-1 h-0.5 bg-gray-200 mx-3 relative">
                  <div className="absolute left-0 top-[-6px] w-full">
                    <div style={{ width: `${Math.min(((step - 1) / 3) * 100, 100)}%` }} className="h-0.5 bg-[#5EE6FE]" />
                  </div>
                </div>
                <StepPill number={2} active={step === 2} done={step > 2}>
                  Pick date & time
                </StepPill>
                <div className="flex-1 h-0.5 bg-gray-200 mx-3 relative">
                  <div className="absolute left-0 top-[-6px] w-full">
                    <div style={{ width: `${Math.min(((step - 2) / 3) * 100, 100)}%` }} className="h-0.5 bg-[#5EE6FE]" />
                  </div>
                </div>
                <StepPill number={3} active={step === 3} done={step > 3}>
                  Your details
                </StepPill>
                <div className="flex-1 h-0.5 bg-gray-200 mx-3 relative">
                  <div className="absolute left-0 top-[-6px] w-full">
                    <div style={{ width: `${Math.min(((step - 3) / 3) * 100, 100)}%` }} className="h-0.5 bg-[#5EE6FE]" />
                  </div>
                </div>
                <StepPill number={4} active={step === 4} done={step > 4}>
                  Review
                </StepPill>
              </div>

              {/* Tablet Version  */}
              <div className="hidden sm:flex md:hidden items-center justify-between">
                <StepPill number={1} active={step === 1} done={step > 1}>
                  <span className="text-xs">Service</span>
                </StepPill>
                <div className="flex-1 h-0.5 bg-gray-200 mx-2 relative">
                  <div className="absolute left-0 top-[-6px] w-full">
                    <div style={{ width: `${Math.min(((step - 1) / 3) * 100, 100)}%` }} className="h-0.5 bg-[#5EE6FE]" />
                  </div>
                </div>
                <StepPill number={2} active={step === 2} done={step > 2}>
                  <span className="text-xs">Date/Time</span>
                </StepPill>
                <div className="flex-1 h-0.5 bg-gray-200 mx-2 relative">
                  <div className="absolute left-0 top-[-6px] w-full">
                    <div style={{ width: `${Math.min(((step - 2) / 3) * 100, 100)}%` }} className="h-0.5 bg-[#5EE6FE]" />
                  </div>
                </div>
                <StepPill number={3} active={step === 3} done={step > 3}>
                  <span className="text-xs">Details</span>
                </StepPill>
                <div className="flex-1 h-0.5 bg-gray-200 mx-2 relative">
                  <div className="absolute left-0 top-[-6px] w-full">
                    <div style={{ width: `${Math.min(((step - 3) / 3) * 100, 100)}%` }} className="h-0.5 bg-[#5EE6FE]" />
                  </div>
                </div>
                <StepPill number={4} active={step === 4} done={step > 4}>
                  <span className="text-xs">Review</span>
                </StepPill>
              </div>

              {/* Mobile Version - Visible on xs and sm */}
              <div className="flex sm:hidden flex-col gap-3">
                {/* Step numbers row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                      step >= 1 ? "bg-[#5EE6FE] text-white" : "bg-gray-200 text-gray-500"
                    }`}>1</div>
                    <span className="text-[10px] text-gray-600">Service</span>
                  </div>
                  <div className="flex-1 h-0.5 bg-gray-200 mx-1"></div>
                  <div className="flex items-center gap-1">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                      step >= 2 ? "bg-[#5EE6FE] text-white" : "bg-gray-200 text-gray-500"
                    }`}>2</div>
                    <span className="text-[10px] text-gray-600">Date</span>
                  </div>
                  <div className="flex-1 h-0.5 bg-gray-200 mx-1"></div>
                  <div className="flex items-center gap-1">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                      step >= 3 ? "bg-[#5EE6FE] text-white" : "bg-gray-200 text-gray-500"
                    }`}>3</div>
                    <span className="text-[10px] text-gray-600">Details</span>
                  </div>
                  <div className="flex-1 h-0.5 bg-gray-200 mx-1"></div>
                  <div className="flex items-center gap-1">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                      step >= 4 ? "bg-[#5EE6FE] text-white" : "bg-gray-200 text-gray-500"
                    }`}>4</div>
                    <span className="text-[10px] text-gray-600">Review</span>
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#5EE6FE] transition-all duration-300"
                    style={{ width: `${((step - 1) / 3) * 100}%` }}
                  ></div>
                </div>
                
                {/* Current step text */}
                <div className="text-center text-xs font-medium text-gray-700">
                  Step {step} of 4: {
                    step === 1 ? "Select Service" :
                    step === 2 ? "Pick Date & Time" :
                    step === 3 ? "Your Details" :
                    step === 4 ? "Review" :
                    step === 5 ? "Complete" : ""
                  }
                </div>
              </div>
            </div>

            {/* Step content */}
            <motion.div 
              layout 
              initial={{ opacity: 0, y: 6 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-gray-100 shadow-sm"
            >
              {step === 1 && (
                <Step1Service 
                  serviceTypes={SERVICE_TYPES} 
                  selectedService={selectedService} 
                  setSelectedService={setSelectedService} 
                  goToStep={goToStep}
                />
              )}

              {step === 2 && (
                <Step2DateTime
                  selectedService={selectedService}
                  currentMonth={currentMonth}
                  calendar={calendar}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  selectedTime={selectedTime}
                  setSelectedTime={setSelectedTime}
                  prevMonth={prevMonth}
                  nextMonth={nextMonth}
                  goToStep={goToStep}
                  isPast={isPast}
                  getTimeSlotsForDate={getTimeSlotsForDate} 
                />
              )}

              {step === 3 && (
                <Step3Details 
                  goToStep={goToStep} 
                  pets={pets} 
                  selectedPet={selectedPet} 
                  setSelectedPet={setSelectedPet} 
                  userData={userData} 
                />
              )}

              {step === 4 && (
                <Step4Review 
                  selectedService={selectedService} 
                  selectedDate={selectedDate} 
                  selectedTime={selectedTime} 
                  selectedPet={selectedPet}
                  handleConfirm={handleConfirm} 
                  goToStep={goToStep} 
                  ownerInfo={userData} 
                />
              )}

              {step === 5 && confirmed && (
                <Step5Success resetBooking={resetBooking} navigate={navigate} />
              )}
            </motion.div>
          </div>

          {/* Right Column: Sidebar */}
          <aside className="hidden lg:block space-y-4">
            <AppointmentSummary 
              step={step} 
              selectedService={selectedService} 
              selectedDate={selectedDate} 
              selectedTime={selectedTime} 
              selectedPet={selectedPet} 
              ownerInfo={userData} 
            />
            <TipsCard />
          </aside>

          {/* Mobile Summary Card */}
          <div className="lg:hidden block">
            <AppointmentSummary 
              step={step} 
              selectedService={selectedService} 
              selectedDate={selectedDate} 
              selectedTime={selectedTime} 
              selectedPet={selectedPet} 
              ownerInfo={userData} 
            />
          </div>
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="fixed right-4 sm:right-6 bottom-4 sm:bottom-6 bg-green-500 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-lg text-sm sm:text-base z-50"
        >
          Appointment scheduled
        </motion.div>
      )}

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 animate-fadeIn p-4">
          <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 w-full max-w-[280px] sm:max-w-[320px] shadow-lg text-center animate-popUp">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Cancel Booking?</h2>
            <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-5">
              Your progress will be lost. Are you sure you want to return home?
            </p>

            <div className="flex justify-center gap-2 sm:gap-3">
              <button 
                onClick={() => setShowCancelModal(false)} 
                className="bg-gray-200 text-gray-700 py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm hover:bg-gray-300 transition-all duration-300"
              >
                No
              </button>
              <button 
                onClick={() => navigate("/user-home")} 
                className="bg-[#5EE6FE] text-white py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm hover:bg-[#3ecbe0] transition-all duration-300"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Booking;