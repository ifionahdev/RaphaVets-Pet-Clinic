import React from "react";

export default function BreedDetectCard({ data, handleReset, handleSaveRecord }) {
  if (!data) {
    return (
      <div className="w-full h-56 border rounded-md flex items-center justify-center text-gray-400">
        No detection yet
      </div>
    );
  }

  const { breed, confidence, notes } = data;
  const percent = Math.round((confidence || 0) * 100);

  return (
    <div className="w-full h-56 border rounded-md p-4 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold">{breed}</h3>
        <p className="text-sm text-gray-600 mt-1">Confidence: {percent}%</p>

        <div className="mt-3">
          <p className="text-sm text-gray-700">{notes}</p>
        </div>
      </div>

      {data ? (
        <div className="flex flex-col items-center text-center space-y-3">
          {/* Confidence Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-[#5EE6FE] h-full transition-all duration-500"
              style={{ width: `${data.confidence * 100}%` }}
            ></div>
          </div>


          {/* Upload Another Button */}
          <button
            onClick={handleReset}
            className="mt-4 px-5 py-2.5 bg-[#5EE6FE] text-white font-medium rounded-lg shadow-sm hover:bg-[#46d7ee] transition-all"
          >
            Upload Another
          </button>
        </div>
      ) : (
        <p className="text-gray-400 text-sm italic">No detection yet.</p>
      )}

    </div>
  );
}
