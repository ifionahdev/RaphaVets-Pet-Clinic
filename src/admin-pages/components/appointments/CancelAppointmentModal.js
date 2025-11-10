import { useState } from "react";

const CancelAppointmentModal = ({ isOpen, onClose, onConfirm, appointment }) => {
  const [step, setStep] = useState(1);
  const [cancelReason, setCancelReason] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const isBulkCancel = Array.isArray(appointment) && appointment.length > 1;
  const appointmentCount = isBulkCancel ? appointment.length : 1;

  const handleConfirmFirstStep = () => {
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
    setCancelReason("");
  };

  const handleFinalConfirm = async () => {
    if (!cancelReason.trim()) return;
    
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onConfirm(cancelReason);
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetModal = () => {
    setStep(1);
    setCancelReason("");
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl">
        
        {/* Step 1: Confirmation */}
        {step === 1 && (
          <>
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-gray-200 p-6">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-500 text-sm">⚠️</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {isBulkCancel ? `Cancel ${appointmentCount} Appointments` : 'Cancel Appointment'}
                </h2>
                <p className="text-gray-500 text-xs mt-1">Confirm cancellation</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-gray-600 text-sm mb-4">
                {isBulkCancel 
                  ? `Are you sure you want to cancel ${appointmentCount} selected appointments?`
                  : `Are you sure you want to cancel the appointment for <strong>${appointment.petName}</strong>?`
                }
              </p>
              
              {!isBulkCancel && (
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div className="text-xs text-gray-600 space-y-1">
                    <div className="flex justify-between">
                      <span>Pet:</span>
                      <span className="font-medium">{appointment.petName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Owner:</span>
                      <span className="font-medium">{appointment.owner}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date & Time:</span>
                      <span className="font-medium">{appointment.date} at {appointment.time}</span>
                    </div>
                  </div>
                </div>
              )}

              <p className="text-xs text-gray-500 mt-3">
                You'll be asked to provide a reason for cancellation in the next step.
              </p>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-2 border-t border-gray-200 p-4">
              <button
                onClick={resetModal}
                className="px-4 py-2 text-sm rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmFirstStep}
                className="px-4 py-2 text-sm rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition font-medium"
              >
                Continue
              </button>
            </div>
          </>
        )}

        {/* Step 2: Reason Input */}
        {step === 2 && (
          <>
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-gray-200 p-6">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-500 text-sm">📝</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {isBulkCancel ? 'Bulk Cancellation Reason' : 'Cancellation Reason'}
                </h2>
                <p className="text-gray-500 text-xs mt-1">Please provide a reason</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Cancellation <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder={
                    isBulkCancel 
                      ? "Please provide the reason for cancelling these appointments..."
                      : "Please provide the reason for cancelling this appointment..."
                  }
                  rows="3"
                  className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                {!cancelReason.trim() && (
                  <p className="text-red-500 text-xs mt-1">Please provide a cancellation reason</p>
                )}
              </div>

              {/* Quick Reason Options */}
              <div className="mb-3">
                <p className="text-xs text-gray-600 mb-2">Quick select:</p>
                <div className="flex flex-wrap gap-1">
                  {[
                    "Client reschedule",
                    "Vet unavailable",
                    "Emergency",
                    "Weather",
                    "Pet health"
                  ].map((reason) => (
                    <button
                      key={reason}
                      onClick={() => setCancelReason(reason)}
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition border border-gray-200"
                    >
                      {reason}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between gap-2 border-t border-gray-200 p-4">
              <button
                onClick={handleBack}
                className="px-3 py-2 text-sm rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition font-medium"
              >
                ← Back
              </button>
              <div className="flex gap-2">
                <button
                  onClick={resetModal}
                  className="px-3 py-2 text-sm rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleFinalConfirm}
                  disabled={!cancelReason.trim() || loading}
                  className="px-3 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed min-w-20"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-1">
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </span>
                  ) : (
                    isBulkCancel ? 'Cancel All' : 'Confirm'
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CancelAppointmentModal;