import React from "react";
import { format } from "date-fns";

export default function AppointmentSummary({ step, selectedService, selectedDate, selectedTime }) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
      <div className="text-sm text-gray-500">Appointment summary</div>

      <div className="mt-3 space-y-3">
        <div>
          <div className="text-xs text-gray-400">Service</div>
          <div className="font-semibold">{selectedService?.label || "-"}</div>
        </div>

        <div>
          <div className="text-xs text-gray-400">Date & Time</div>
          <div className="font-semibold">
            {selectedDate ? `${format(selectedDate, "MMM d, yyyy")} • ${selectedTime || "—"}` : "-"}
          </div>
        </div>

        {step === 4 && (
          <>
            <div className="pt-3 border-t border-gray-100">
              <div className="text-xs text-gray-400 mb-2">Pet Details</div>
              <div className="flex items-center gap-3">
                <img
                  src="/images/dog-profile.png"
                  alt="Pet"
                  className="w-10 h-10 rounded-full border border-[#5EE6FE] object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-800 text-sm">Miguel</div>
                  <div className="text-xs text-gray-500">Chow Chow • Male • 2 years old</div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100">
              <div className="text-xs text-gray-400 mb-1">Owner Information</div>
              <div className="space-y-1 text-sm">
                <div className="font-semibold text-gray-800">Fionah Irish Beltran</div>
                <div className="text-gray-600 text-xs">
                  📞 +63 912 345 6789
                  <br />
                  📧 fionah.beltran@example.com
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
