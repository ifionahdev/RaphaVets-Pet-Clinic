import React from "react";

const labs = [
  { title: "Blood Test Results", date: "November 1, 2025", icon: "fa-vial" },
  { title: "Urine Analysis", date: "October 5, 2025", icon: "fa-flask" },
  { title: "X-ray Findings", date: "August 30, 2025", icon: "fa-x-ray" },
];

const LabRecordsTab = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {labs.map((lab, index) => (
        <div
          key={index}
          className="bg-[#FFF8F9] backdrop-blur-md border border-[#5EE6FE]/30 p-5 rounded-xl shadow-md hover:shadow-lg hover:bg-[#EFFFFF]/60 transition-all"
        >
          <div className="flex items-center gap-3 mb-3">
            <i className={`fa-solid ${lab.icon} text-[#FFB6C1] text-lg`}></i>
            <h3 className="font-semibold text-gray-800">{lab.title}</h3>
          </div>
          <p className="text-sm text-gray-500 mb-4 flex items-center gap-1">
            <i className="fa-regular fa-calendar"></i> {lab.date}
          </p>
          <button
            onClick={() => alert(`Downloading ${lab.title} PDF...`)}
            className="bg-[#FFB6C1] text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-[#3ecbe0] transition-all"
          >
            <i className="fa-solid fa-download mr-2"></i>Download PDF
          </button>
        </div>
      ))}
    </div>
  );
};

export default LabRecordsTab;
