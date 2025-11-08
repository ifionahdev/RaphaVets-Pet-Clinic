import React from "react";

const AppointmentTab = ({ appointments, appointmentFilter, setAppointmentFilter, handleViewDetails }) => {
  return (
    <div className="flex flex-col flex-1 gap-3">
      <div className="flex gap-3 mb-3">
        {["Upcoming", "Pending", "Done", "All"].map((status) => (
          <button
            key={status}
            onClick={() => setAppointmentFilter(status)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition 
              ${appointmentFilter === status
                ? "bg-[#5EE6FE] text-white shadow"
                : "bg-gray-100 text-gray-600 hover:bg-[#d3f2fa]"
              }`}
          >
            {status}
          </button>
        ))}
      </div>

      {appointments.map((appt) => {
        const datePart = appt.date.split(" - ")[0];
        const parsedDate = new Date(datePart + " 2025");
        const isValidDate = !isNaN(parsedDate);

        return (
          <div
            key={appt.id}
            className="bg-white/70 backdrop-blur-md border border-[#5EE6FE]/30 p-4 rounded-xl flex justify-between items-center shadow-md hover:shadow-lg hover:bg-[#EFFFFF]/60 transition-all cursor-pointer"
          >
            {/* LEFT: DATE */}
            <div className="flex flex-col items-center justify-center w-16 text-center bg-[#EFFFFF] rounded-lg py-2 border border-[#5EE6FE]/20 shadow-sm">
              {isValidDate ? (
                <>
                  <span className="text-xs font-semibold text-[#5EE6FE] uppercase tracking-wide">
                    {parsedDate.toLocaleString("default", { month: "short" })}
                  </span>
                  <span className="text-xl font-bold text-gray-800 leading-tight">{parsedDate.getDate()}</span>
                  <span className="text-[10px] text-gray-500 capitalize">
                    {parsedDate.toLocaleString("default", { weekday: "long" })}
                  </span>
                </>
              ) : (
                <span className="text-xs text-gray-500">Invalid Date</span>
              )}
            </div>

            {/* RIGHT: DETAILS */}
            <div className="flex justify-between items-center flex-1 ml-4">
              <div>
                <p className="font-semibold text-gray-800">{appt.petName} — {appt.type}</p>
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                  <i className="fa-solid fa-clock text-[#5EE6FE]"></i>
                  {appt.date.split(" - ")[1] || "10:00 AM"} &nbsp;•&nbsp; {appt.status || "Upcoming"}
                </p>
              </div>
              <button
                onClick={() => handleViewDetails(appt)}
                className="bg-[#5EE6FE] text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-[#3ecbe0] transition-all"
              >
                View Details
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AppointmentTab;
