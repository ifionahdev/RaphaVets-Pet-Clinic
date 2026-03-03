import React, { useState, useEffect } from "react";
import api from "../../../api/axios";

function AccountInformation({ userData, setUserData }) {
  const [editableFields, setEditableFields] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNo: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const userId = localStorage.getItem("userId");

  // Validation functions
  const validateName = (name) => {
    // Only letters, spaces, hyphens, and apostrophes allowed
    return /^[A-Za-z\s\-']+$/.test(name) || name === "";
  };

  const validateContactNo = (number) => {
    // Only numbers, spaces, dashes, parentheses, and plus sign allowed
    return /^[\d\s\-+()]*$/.test(number) || number === "";
  };

  const validateContactNoLength = (number) => {
    // Count only digits (ignore formatting characters)
    const digitCount = (number.match(/\d/g) || []).length;
    return digitCount === 11;
  };

  const validateEmail = (email) => {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) || email === "";
  };

  // Filter functions to prevent invalid characters during typing
  const filterNameInput = (value) => {
    // Remove any numbers and special characters except spaces, hyphens, and apostrophes
    return value.replace(/[^A-Za-z\s\-']/g, '');
  };

  const filterContactInput = (value) => {
    // Remove any letters and special characters except numbers, spaces, dashes, parentheses, plus
    const filtered = value.replace(/[^\d\s\-+()]/g, '');
    
    // Count only digits (ignore formatting characters) and limit to 11
    const digits = filtered.replace(/\D/g, '');
    const truncatedDigits = digits.slice(0, 11);
    
    // If we truncated, we need to reconstruct with original formatting
    if (digits.length > 11) {
      let result = '';
      let digitIndex = 0;
      for (let i = 0; i < filtered.length; i++) {
        if (/\d/.test(filtered[i])) {
          if (digitIndex < 11) {
            result += truncatedDigits[digitIndex];
            digitIndex++;
          }
        } else {
          result += filtered[i];
        }
      }
      return result;
    }
    
    return filtered;
  };

  // Load user data
  useEffect(() => {
    if (userData) {
      const user = userData.user || userData;
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        contactNo: user.contactNo || "",
        address: user.address || "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let filteredValue = value;
    
    // Apply filters based on field type
    if (name === "firstName" || name === "lastName") {
      filteredValue = filterNameInput(value);
    } else if (name === "contactNo") {
      filteredValue = filterContactInput(value);
    }
    // Email is not filtered, just validated later

    setFormData((prev) => ({ ...prev, [name]: filteredValue }));
    // Clear message when user starts typing
    if (message.text) setMessage({ type: "", text: "" });
  };

  const toggleEdit = (field) => {
    setEditableFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const validateForm = () => {
    // Check if any field is empty
    if (!formData.firstName.trim()) {
      setMessage({ type: "error", text: "First name is required" });
      return false;
    }
    if (!formData.lastName.trim()) {
      setMessage({ type: "error", text: "Last name is required" });
      return false;
    }
    if (!formData.email.trim()) {
      setMessage({ type: "error", text: "Email is required" });
      return false;
    }
    if (!formData.contactNo.trim()) {
      setMessage({ type: "error", text: "Contact number is required" });
      return false;
    }

    // Validate name formats
    if (!validateName(formData.firstName)) {
      setMessage({ type: "error", text: "First name can only contain letters, spaces, hyphens, and apostrophes" });
      return false;
    }
    if (!validateName(formData.lastName)) {
      setMessage({ type: "error", text: "Last name can only contain letters, spaces, hyphens, and apostrophes" });
      return false;
    }

    // Validate contact number format
    if (!validateContactNo(formData.contactNo)) {
      setMessage({ type: "error", text: "Contact number can only contain numbers, spaces, dashes, parentheses, and plus sign" });
      return false;
    }

    // Validate contact number length (must be exactly 11 digits)
    if (!validateContactNoLength(formData.contactNo)) {
      setMessage({ type: "error", text: "Contact number must be exactly 11 digits" });
      return false;
    }

    // Validate email format
    if (!validateEmail(formData.email)) {
      setMessage({ type: "error", text: "Please enter a valid email address (e.g., name@example.com)" });
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!userId) {
      setMessage({ type: "error", text: "⚠️ Not logged in!" });
      return;
    }

    // Validate form before saving
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await api.put(`/users/${userId}/profile`, formData);
      setMessage({ type: "success", text: res.data.message || "Profile updated successfully!" });
      setEditableFields({});
      
      // Update parent state if needed
      if (setUserData) {
        setUserData(prev => ({ ...prev, ...formData }));
      }
      
      // Clear success message after 3 seconds
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (err) {
      console.error("❌ Error updating profile:", err.response?.data || err.message);
      setMessage({ type: "error", text: "Failed to update profile" });
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { label: "First Name", field: "firstName", type: "text" },
    { label: "Last Name", field: "lastName", type: "text" },
    { label: "Email Address", field: "email", type: "email" },
    { label: "Contact Number", field: "contactNo", type: "tel" },
    { label: "Address", field: "address", type: "text" },
  ];

  return (
    <div className="space-y-4 sm:space-y-5">
      <h2 className="text-base sm:text-lg font-semibold text-[#5EE6FE] mb-2 sm:mb-3">
        Personal Details
      </h2>
      
      {/* Message Alert */}
      {message.text && (
        <div className={`p-3 rounded-lg text-sm ${
          message.type === "success" 
            ? "bg-green-50 text-green-700 border border-green-200" 
            : "bg-red-50 text-red-700 border border-red-200"
        }`}>
          <i className={`fa-solid mr-2 ${
            message.type === "success" ? "fa-circle-check" : "fa-circle-exclamation"
          }`}></i>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {fields.map((item) => (
          <div key={item.field} className="relative">
            <label className="block text-gray-600 text-xs sm:text-sm mb-1 font-medium">
              {item.label}
            </label>
            <div className="flex items-center gap-2">
              <input
                type={item.type}
                name={item.field}
                value={formData[item.field] || ""}
                onChange={handleChange}
                disabled={!editableFields[item.field]}
                maxLength={item.field === "contactNo" ? 15 : undefined} // Allow some space for formatting
                className={`w-full border rounded-lg px-3 py-2 text-sm sm:text-base focus:ring-1 focus:ring-[#5EE6FE] focus:border-[#5EE6FE] transition-all ${
                  editableFields[item.field]
                    ? "border-[#5EE6FE] bg-white"
                    : "border-gray-300 bg-gray-100 cursor-not-allowed text-gray-600"
                }`}
                placeholder={`Enter ${item.label.toLowerCase()}`}
              />
              <button
                onClick={() => toggleEdit(item.field)}
                type="button"
                className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg transition-all ${
                  editableFields[item.field]
                    ? "bg-[#5EE6FE] text-white"
                    : "text-[#5EE6FE] hover:bg-[#EAFBFD]"
                }`}
                title={editableFields[item.field] ? "Cancel edit" : "Edit field"}
              >
                <i className={`fa-solid ${editableFields[item.field] ? "fa-times" : "fa-pen-to-square"} text-sm`}></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-end items-center gap-3 mt-4 sm:mt-5">
        <button
          onClick={handleSave}
          disabled={loading}
          className={`w-full sm:w-auto px-6 py-2.5 sm:py-2 ${
            loading ? "bg-gray-400" : "bg-[#5EE6FE] hover:bg-[#47c0d7]"
          } text-white rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2`}
        >
          {loading ? (
            <>
              <i className="fa-solid fa-spinner fa-spin"></i>
              Saving...
            </>
          ) : (
            <>
              <i className="fa-solid fa-save"></i>
              Save Changes
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default AccountInformation;