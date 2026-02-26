import React from "react";
import { motion } from "framer-motion";

export default function Step5Success({ resetBooking, navigate }) {
  return (
    <div className="text-center py-4 sm:py-6 md:py-8">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="inline-block bg-[#E6FFFB] text-[#0f766e] px-3 sm:px-4 py-2 sm:py-3 rounded-lg mb-3 sm:mb-4 shadow-sm text-xs sm:text-sm"
      >
        Appointment booked successfully!
      </motion.div>

      <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">All set! 🎉</h3>
      <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-5 md:mb-6 px-2">
        We've emailed your appointment details. Please wait for the confirmation from our clinic.
      </p>

      <div className="flex flex-col xs:flex-row justify-center gap-2 sm:gap-3 md:gap-4 mt-2 sm:mt-3 md:mt-4 px-2">
        <button
          onClick={() => { resetBooking(); }}
          className="w-full xs:w-auto px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium transition-all text-xs sm:text-sm"
        >
          Book Another
        </button>

        <button
          onClick={() => navigate("/user-home")}
          className="w-full xs:w-auto px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-lg bg-[#5EE6FE] text-white font-semibold hover:bg-[#3ecbe0] shadow-sm transition-all text-xs sm:text-sm"
        >
          View My Appointments
        </button>
      </div>
    </div>
  );
}