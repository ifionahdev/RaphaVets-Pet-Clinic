import React, { useState } from "react";

function AccountInformation() {
  const [editableFields, setEditableFields] = useState({});

  const toggleEdit = (field) => {
    setEditableFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const fields = [
    { label: "First Name", field: "firstName", placeholder: "Enter your first name" },
    { label: "Last Name", field: "lastName", placeholder: "Enter your last name" },
    { label: "Email Address", field: "email", placeholder: "youremail@example.com" },
    { label: "Contact Number", field: "contact", placeholder: "+63 912 345 6789" },
    { label: "Address", field: "address", placeholder: "Enter your address" },
  ];

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold text-[#5EE6FE] mb-2">Personal Details</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((item) => (
          <div key={item.field} className="relative">
            <label className="block text-gray-600 text-sm mb-1">{item.label}</label>
            <div className="flex items-center">
              <input
                type="text"
                disabled={!editableFields[item.field]}
                className={`w-full border rounded-lg px-3 py-2 focus:ring-1 focus:ring-[#5EE6FE] focus:border-[#5EE6FE] transition-all ${
                  editableFields[item.field]
                    ? "border-[#5EE6FE] bg-white"
                    : "border-gray-300 bg-gray-100 cursor-not-allowed"
                }`}
                placeholder={item.placeholder}
              />
              <button
                onClick={() => toggleEdit(item.field)}
                type="button"
                className="ml-2 text-[#5EE6FE] hover:text-[#47c0d7] transition-all"
              >
                <i className="fa-solid fa-pen-to-square text-lg"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-right">
        <button className="px-6 py-2 bg-[#5EE6FE] text-white rounded-lg font-semibold hover:bg-[#47c0d7] transition-all duration-300">
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default AccountInformation;
