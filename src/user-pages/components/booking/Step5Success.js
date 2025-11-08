import React from "react";
import { motion } from "framer-motion";

export default function Step5Success({ resetBooking, navigate }) {
  return (
    <div className="text-center py-8">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="inline-block bg-[#E6FFFB] text-[#0f766e] px-4 py-3 rounded-lg mb-4 shadow-sm"
      >
        Appointment booked successfully!
      </motion.div>

      <h3 className="text-2xl font-bold text-gray-800 mb-1">All set! 🎉</h3>
      <p className="text-gray-500 mb-6">
        We’ve emailed your appointment details. Please wait for the confirmation from our clinic.
      </p>

      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => { resetBooking(); }}
          className="px-6 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium transition-all"
        >
          Book Another
        </button>

        <button
          onClick={() => navigate("/user-home")}
          className="px-6 py-2 rounded-lg bg-[#5EE6FE] text-white font-semibold hover:bg-[#3ecbe0] shadow-sm transition-all"
        >
          View My Appointments
        </button>
      </div>
    </div>
  );
}
