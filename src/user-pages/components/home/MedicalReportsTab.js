import React from "react";

const records = [
  { title: "Vaccination Record", date: "October 15, 2025", icon: "fa-syringe" },
  { title: "Deworming Certificate", date: "September 10, 2025", icon: "fa-capsules" },
  { title: "Annual Health Report", date: "June 22, 2025", icon: "fa-file-medical" },
];

const MedicalReportsTab = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {records.map((record, index) => (
        <div
          key={index}
          className="bg-[#E3FAF7] backdrop-blur-md border border-[#5EE6FE]/30 p-5 rounded-xl shadow-md hover:shadow-lg hover:bg-[#EFFFFF]/60 transition-all"
        >
          <div className="flex items-center gap-3 mb-3">
            <i className={`fa-solid ${record.icon} text-[#5EE6FE] text-lg`}></i>
            <h3 className="font-semibold text-gray-800">{record.title}</h3>
          </div>
          <p className="text-sm text-gray-500 mb-4 flex items-center gap-1">
            <i className="fa-regular fa-calendar"></i> {record.date}
          </p>
          <button
            onClick={() => alert(`Downloading ${record.title} PDF...`)}
            className="bg-[#5EE6FE] text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-[#3ecbe0] transition-all"
          >
            <i className="fa-solid fa-download mr-2"></i>Download PDF
          </button>
        </div>
      ))}
    </div>
  );
};

export default MedicalReportsTab;
