import React from "react";

const ViewDetailsModal = ({ appointment, closeModal }) => {
  return (
    <>
      <div onClick={closeModal} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-fadeIn"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50 animate-popUp">
        <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl w-[90%] sm:w-[400px] text-gray-800 relative">
          <button onClick={closeModal} className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-xl">×</button>
          <h2 className="text-lg font-bold mb-4 text-center text-[#00C3E3]">Appointment Details</h2>

          <div className="space-y-3 text-sm">
            <p><span className="font-semibold">Pet Name:</span> {appointment.petName}</p>
            <p><span className="font-semibold">Owner Name:</span> {appointment.ownerName}</p>
            <p><span className="font-semibold">Service:</span> {appointment.type}</p>
            <p><span className="font-semibold">Date & Time:</span> {appointment.date}</p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${appointment.status === "Upcoming" ? "bg-[#E0F9FF] text-[#00B8D4]" : "bg-green-100 text-green-700"}`}>
                {appointment.status}
              </span>
            </p>
            {appointment.notes && <p><span className="font-semibold">Notes:</span> {appointment.notes}</p>}
          </div>

          <div className="mt-5 flex justify-center">
            <button onClick={closeModal} className="bg-[#5EE6FE] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#3ecbe0] transition-all">Close</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewDetailsModal;
