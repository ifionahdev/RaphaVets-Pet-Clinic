import React from "react";
import { format } from "date-fns";

export default function Step4Review({ 
  selectedService, selectedDate, selectedTime, handleConfirm, goToStep 
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Review Your Details</h2>
        <p className="text-gray-500 text-sm">
          Please review all information before confirming your appointment.
        </p>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-md p-6 space-y-5">
        {/* SERVICE & DATE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-gray-400">Service</div>
            <div className="font-semibold text-gray-800">{selectedService?.label || "-"}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">Date & Time</div>
            <div className="font-semibold text-gray-800">
              {selectedDate
                ? `${format(selectedDate, "MMM d, yyyy")} • ${selectedTime || "—"}`
                : "-"}
            </div>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* PET INFO */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-3">🐾 Pet Information</h3>
          <div className="flex items-center gap-4 bg-gradient-to-r from-[#E8FBFF] to-[#FDFDFD] border border-[#D6F0F3] rounded-xl p-4">
            <img
              src="/images/dog-profile.png"
              alt="Pet"
              className="w-16 h-16 rounded-full border-4 border-[#5EE6FE] object-cover shadow-sm"
            />
            <div>
              <div className="text-lg font-semibold text-gray-800">Miguel</div>
              <div className="text-sm text-gray-500">Chow Chow • Male • 2 years old</div>
            </div>
          </div>
        </div>

        {/* OWNER INFO */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-3">👤 Owner Information</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-400">Owner Name</div>
              <div className="font-semibold text-gray-800">Fionah Irish Beltran</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Contact Number</div>
              <div className="font-semibold text-gray-800">+63 912 345 6789</div>
            </div>
            <div className="sm:col-span-2">
              <div className="text-xs text-gray-400">Email Address</div>
              <div className="font-semibold text-gray-800">fionah.beltran@example.com</div>
            </div>
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => goToStep(3)}
          className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all"
        >
          Back
        </button>


        <button
          onClick={handleConfirm}
          className="px-6 py-3 rounded-lg bg-[#5EE6FE] text-white font-semibold hover:bg-[#3ecbe0] shadow-sm transition-all flex items-center gap-2"
        >
          <i className="fa-solid fa-check"></i> Confirm Appointment
        </button>
      </div>
    </div>
  );
}
