import { useState } from "react";
import { format, isSameDay, parseISO, addMonths, subMonths } from "date-fns";
import Header from "../template/Header";
import { PlusCircle, Edit2, Trash2, Eye } from "lucide-react";

import AppointmentRequestModal from "../components/appointments/AppointmentRequestModal";
import AppointmentDetailsModal from "../components/appointments/AppointmentDetailsModal";

const sampleAppointments = [
  { id: 1, petName: "Bogart", owner: "Mark Mapili", date: "2025-11-10", time: "9:00 AM", status: "Completed" },
  { id: 2, petName: "Tan tan", owner: "Miguel Rojero", date: "2025-11-12", time: "11:30 AM", status: "Pending" },
  { id: 3, petName: "Ming", owner: "Jordan Frando", date: "2025-11-15", time: "1:00 PM", status: "Ongoing" },
  { id: 4, petName: "Rocky", owner: "Anna Cruz", date: "2025-11-15", time: "3:00 PM", status: "Pending" },
  { id: 5, petName: "Rocky", owner: "Anna Cruz", date: "2025-11-15", time: "3:00 PM", status: "Pending" },
  { id: 6, petName: "Rocky", owner: "Anna Cruz", date: "2025-11-15", time: "3:00 PM", status: "Pending" },
  { id: 7, petName: "Rocky", owner: "Anna Cruz", date: "2025-11-15", time: "3:00 PM", status: "Pending" },
];

const statusColors = {
  Pending: "bg-yellow-300 text-yellow-800",  
  Ongoing: "bg-pink-300 text-pink-800",   
  Completed: "bg-green-300 text-green-800",
};


const Appointments = () => {
  const [activeTab, setActiveTab] = useState("Calendar");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  // State
  const [appointments, setAppointments] = useState(sampleAppointments);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Filtered Appointments for Appointment List
  const filteredAppointments = appointments.filter(app => {
    // Only Upcoming & Completed for Appointment List
    if (activeTab === "Appointment List" && app.status === "Pending") return false;
    if (activeTab === "Appointment List" && statusFilter !== "All" && app.status !== statusFilter)
      return false;
    // Search filter
    return (
      app.petName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.owner.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleViewRequest = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  // Filtered Requests
  const filteredRequests = appointments.filter(app => app.status === "Pending");

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

  const daysInMonth = [];
  for (let i = 1; i <= endOfMonth.getDate(); i++) {
    daysInMonth.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
  }

  const dayAppointments = appointments.filter(a => isSameDay(parseISO(a.date), selectedDate));

  return (
    <div className="flex flex-col h-screen bg-[#FBFBFB] p-6 gap-4 font-sans">
      <Header title="Appointments" />

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-2 relative">
        {["Calendar", "Appointment List", "Requests"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-5 py-2 font-semibold text-sm transition-colors ${
              activeTab === tab
                ? "text-[#5EE6FE]"
                : "text-gray-600 hover:text-[#5EE6FE]"
            }`}
          >
            <div className="flex items-center gap-2">
              <span>{tab}</span>

              {/* Badge for Requests */}
              {tab === "Requests" && filteredRequests.length > 0 && (
                <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                  {filteredRequests.length}
                </span>
              )}
            </div>

            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-[#5EE6FE] rounded-t-lg" />
            )}
          </button>
        ))}
      </div>


      {activeTab === "Calendar" && (
        <div className="flex gap-6 h-[calc(100%-150px)]">
          {/* Calendar Panel */}
          <div className="w-3/5 flex flex-col gap-4">
            <div className="bg-[#F4F7F8] rounded-3xl shadow-md p-5 flex flex-col gap-4 h-full border border-[#E8F7FA]">
              {/* Month Navigation */}
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-base font-semibold text-gray-700">
                  {format(currentMonth, "MMMM yyyy")}
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={prevMonth}
                    className="px-3 py-1 rounded-lg bg-[#E6FCFF] hover:bg-[#D8F9FF] text-gray-700 transition"
                  >
                    Prev
                  </button>
                  <button
                    onClick={nextMonth}
                    className="px-3 py-1 rounded-lg bg-[#E6FCFF] hover:bg-[#D8F9FF] text-gray-700 transition"
                  >
                    Next
                  </button>
                </div>
              </div>

              {/* Weekdays */}
              <div className="grid grid-cols-7 text-center font-medium text-xs text-gray-500">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                  <div key={day}>{day}</div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-2 flex-1">
                {daysInMonth.map(day => {
                  const dayApps = appointments.filter(a => isSameDay(parseISO(a.date), day));
                  const isSelected = isSameDay(day, selectedDate);
                  const isToday = isSameDay(day, new Date());

                  return (
                    <div
                      key={day.toISOString()}
                      onClick={() => setSelectedDate(day)}
                      className={`relative flex flex-col items-center justify-start min-h-[55px] p-2 cursor-pointer transition-all rounded-xl border
                        ${
                          isSelected
                            ? "bg-[#DDF9FF] border-[#5EE6FE] shadow-lg"
                            : isToday
                            ? "border-[#C7F5FF] bg-[#F9FEFF]"
                            : "border-transparent hover:border-[#DFF9FF]"
                        }
                      `}
                    >
                      <span className="text-[12px] font-medium text-gray-700">
                        {format(day, "d")}
                      </span>
                      <div className="flex flex-wrap justify-center mt-1 gap-1.5 w-full">
                        {dayApps.map((a, idx) => (
                          <span
                            key={idx}
                            className={`h-3 w-3 rounded-full ${statusColors[a.status]} border border-white shadow-sm`}
                            title={`${a.petName} - ${a.status}`}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-2/5 flex flex-col gap-4">
            <div className="bg-gradient-to-br from-[#F9FEFF] to-[#EAFBFF] rounded-3xl p-5 shadow-md border border-[#E1F8FF] flex flex-col gap-4 h-full">
              <h3 className="font-semibold text-base text-gray-700">
                Appointments on {format(selectedDate, "MMMM d, yyyy")}
              </h3>

              <div className="flex flex-col gap-3 overflow-y-auto">
                {dayAppointments.length === 0 ? (
                  <p className="text-gray-400 text-center mt-4 text-sm">
                    No appointments for this day.
                  </p>
                ) : (
                  dayAppointments.map(a => (
                    <div
                      key={a.id}
                      className="p-4 rounded-2xl bg-white shadow-sm border border-[#E6F7FA] hover:shadow-md transition-transform transform hover:scale-[1.02] flex justify-between items-center"
                    >
                      <div className="flex flex-col">
                        <p className="font-semibold text-gray-700 text-sm">{a.petName}</p>
                        <p className="text-gray-500 text-xs">Owner: {a.owner}</p>
                        <p className="text-gray-400 text-xs mt-1">{a.time}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[a.status]}`}
                      >
                        {a.status}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Appointment List" && (
        <div className="mt-">
          {/* Search & Filter */}
          <div className="flex gap-3 mb-4 flex-wrap items-center">
            <input
              type="text"
              placeholder="Search pets or owners..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1B1B1B] text-gray-800 dark:text-gray-200 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-[#5EE6FE]/50"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-2 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1B1B1B] text-gray-800 dark:text-gray-200 w-36 focus:outline-none focus:ring-2 focus:ring-[#5EE6FE]/50"
            >
              <option value="All">All Status</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
            </select>

          </div>

          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 dark:bg-[#1B1B1B] sticky top-0">
              <tr>
                <th className="p-2 text-sm text-gray-600 dark:text-gray-300">ID</th>
                <th className="p-2 text-sm text-gray-600 dark:text-gray-300">Pet</th>
                <th className="p-2 text-sm text-gray-600 dark:text-gray-300">Owner</th>
                <th className="p-2 text-sm text-gray-600 dark:text-gray-300">Date</th>
                <th className="p-2 text-sm text-gray-600 dark:text-gray-300">Time</th>
                <th className="p-2 text-sm text-gray-600 dark:text-gray-300">Status</th>
                <th className="p-2 text-sm text-gray-600 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center p-4 text-gray-400">
                    No appointments found.
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((app) => (
                  <tr
                    key={app.id}
                    className="cursor-pointer hover:bg-[#E5FBFF] dark:hover:bg-[#222] transition"
                  >
                    <td className="p-2 text-sm">{app.id}</td>
                    <td className="p-2 text-sm">{app.petName}</td>
                    <td className="p-2 text-sm">{app.owner}</td>
                    <td className="p-2 text-sm">{app.date}</td>
                    <td className="p-2 text-sm">{app.time}</td>
                    <td className="p-2 text-sm">
                      <select
                        value={app.status}
                        onChange={(e) => {
                          const updatedAppointments = appointments.map(a =>
                            a.id === app.id ? { ...a, status: e.target.value } : a
                          );
                          setAppointments(updatedAppointments);
                        }}
                        className={`p-1 rounded-xl text-xs font-semibold border border-gray-200 dark:border-gray-700 ${
                          app.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : app.status === "Upcoming"
                            ? "bg-pink-100 text-pink-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        <option value="Upcoming">Upcoming</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-2 text-sm flex gap-2">
                      <Eye
                        size={18}
                        className="text-blue-500 cursor-pointer hover:text-blue-600"
                        onClick={() => {
                          setSelectedAppointment(app);
                          setIsDetailsModalOpen(true);
                        }}
                      />


                      <Trash2
                          size={18}
                          className="text-red-500 cursor-pointer hover:text-red-600"
                          onClick={() => {
                            if (window.confirm("Are you sure you want to delete this appointment?")) {
                              setAppointments(prev => prev.filter(a => a.id !== app.id));
                            }
                          }}
                        />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Requests Tab */}
      {activeTab === "Requests" && (
        <div className="overflow-y-auto h-[calc(100%-150px)] grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 pr-2">
          {filteredRequests.length === 0 ? (
            <p className="text-gray-400 text-center col-span-2">No pending requests.</p>
          ) : (
            filteredRequests.map((req) => (
              <div
                key={req.id}
                className="p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-md flex flex-col gap-2 border border-[#E6F7FA]"
              >
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold text-gray-700 dark:text-gray-200 text-sm">{req.petName}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">Owner: {req.owner}</p>
                    <p className="text-gray-400 dark:text-gray-500 text-xs">{req.date} • {req.time}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 shadow-sm">
                    Pending
                  </span>
                </div>

                <button
                  onClick={() => handleViewRequest(req)}
                  className="mt-2 py-1 rounded-xl bg-blue-100 text-blue-800 font-semibold hover:bg-blue-200 transition"
                >
                  View
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* <AppointmentRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        appointment={selectedAppointment}
      />

      <AppointmentDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        appointment={selectedAppointment}
      /> */}

      {/* Appointment Request Modal (for pending requests only) */}
      {isModalOpen && selectedAppointment?.status === "Pending" && (
        <AppointmentRequestModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          appointment={selectedAppointment}
        />
      )}

      {/* Appointment Details Modal (for viewing all other appointments) */}
      {isDetailsModalOpen && (
        <AppointmentDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          appointment={selectedAppointment}
        />
      )}

    </div>
  );
};

export default Appointments;
