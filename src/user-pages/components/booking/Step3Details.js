import React from "react";

export default function Step3Details({ goToStep }) {
  return (
    <>
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">🐾 Pet & Owner Details</h2>
        <p className="text-gray-500 text-sm">
          Review your pet’s information and owner details before proceeding.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 flex flex-col gap-6">
        {/* PET CARD */}
        <div className="flex items-center gap-5 bg-gradient-to-r from-[#E8FBFF] to-[#FDFDFD] border border-[#D6F0F3] rounded-2xl p-5 shadow-sm">
          <img
            src="/images/dog-profile.png"
            alt="Pet"
            className="w-20 h-20 rounded-full border-4 border-[#5EE6FE] object-cover shadow-sm"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Miguel</h3>
            <p className="text-gray-500 text-sm">Chow Chow • Male • 2 years old</p>
          </div>
        </div>

        {/* OWNER INFO */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-600 mb-1">Owner Name</label>
            <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-700 font-medium shadow-sm cursor-not-allowed">
              Fionah Irish Beltran
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-600 mb-1">Contact Number</label>
            <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-700 font-medium shadow-sm cursor-not-allowed">
              +63 912 345 6789
            </div>
          </div>

          <div className="flex flex-col sm:col-span-2">
            <label className="text-sm font-semibold text-gray-600 mb-1">Email Address</label>
            <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-700 font-medium shadow-sm cursor-not-allowed">
              fionah.beltran@example.com
            </div>
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => goToStep(2)} // Back to Step 2
            className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all"
          >
            Back
          </button>
          <button
            onClick={() => goToStep(4)} // Next to Step 4 (Review)
            className="px-6 py-3 rounded-lg bg-[#5EE6FE] text-white font-semibold hover:bg-[#3ecbe0] shadow-sm transition-all flex items-center gap-2"
          >
            Next: Review Your Details <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </>
  );
}
