import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import SuccessToast from "../../../template/SuccessToast";
import ErrorToast from "../../../template/ErrorToast";

const AppointmentRequestModal = ({ isOpen, onClose, appointment, onUpdateStatus }) => {
  const [loading, setLoading] = useState(false);
  const [showRejectConfirm, setShowRejectConfirm] = useState(false);
  const [toast, setToast] = useState(null); // { type: 'success' | 'error', message: string }

  if (!appointment) return null;

  const { serviceType, date, time, status, owner = {}, pet = {} } = appointment;
  const { name: ownerName, phone, email } = owner;
  const { name: petName, breed, age, sex, weight, profile } = pet;

  // Approve button handler
  const handleApprove = async () => {
    setLoading(true);
    try {
      const success = await onUpdateStatus(appointment.id, "Approved");
      if (success) {
        setToast({ type: "success", message: "Appointment approved successfully!" });
        onClose();
      } else {
        setToast({ type: "error", message: "Failed to approve appointment." });
      }
    } catch {
      setToast({ type: "error", message: "Failed to approve appointment." });
    } finally {
      setLoading(false);
    }
  };

  // Confirm reject handler
  const confirmReject = async () => {
    setLoading(true);
    try {
      const success = await onUpdateStatus(appointment.id, "Rejected");
      if (success) {
        setToast({ type: "success", message: "Appointment rejected successfully!" });
        setShowRejectConfirm(false);
        onClose();
      } else {
        setToast({ type: "error", message: "Failed to reject appointment." });
      }
    } catch {
      setToast({ type: "error", message: "Failed to reject appointment." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Main Appointment Modal */}
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-lg transition-all">
                  
                  {/* Header */}
                  <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                    <Dialog.Title className="text-2xl font-semibold text-gray-800">
                      Appointment Details
                    </Dialog.Title>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
                      ✕
                    </button>
                  </div>

                  {/* Content */}
                  <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="flex flex-col gap-4">
                      <div className="p-4 rounded-xl border border-gray-200">
                        <h4 className="text-xs font-semibold text-gray-500 uppercase">
                          Service / Reason
                        </h4>
                        <p className="mt-1 text-gray-800 font-medium">
                          {serviceType || <span className="text-gray-400">Consultation</span>}
                        </p>
                      </div>
                      <div className="p-4 rounded-xl border border-gray-200">
                        <h4 className="text-xs font-semibold text-gray-500 uppercase">
                          Appointment Date & Time
                        </h4>
                        <p className="mt-1 text-gray-800 font-medium">
                          {date && time ? `${date} at ${time}` : <span className="text-gray-400">Date & time placeholder</span>}
                        </p>
                      </div>
                      <div className="p-4 rounded-xl border border-gray-200">
                        <h4 className="text-xs font-semibold text-gray-500 uppercase">
                          Status
                        </h4>
                        <p className="mt-1 text-gray-800 font-medium">
                          {status || <span className="text-gray-400">Status placeholder</span>}
                        </p>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-4">
                      <div className="p-4 rounded-xl border border-gray-200 flex flex-col gap-1">
                        <h4 className="text-xs font-semibold text-gray-500 uppercase">Owner</h4>
                        <p className="text-gray-800 font-medium">{ownerName || <span className="text-gray-400">Fionah Irish</span>}</p>
                        <p className="text-gray-500 text-sm">{phone || <span className="text-gray-400">096609182898</span>}</p>
                        <p className="text-gray-500 text-sm">{email || <span className="text-gray-400">shdjak@gmail.com</span>}</p>
                      </div>

                      <div className="p-4 rounded-xl border border-gray-200 flex flex-col items-center gap-2">
                        <h4 className="text-xs font-semibold text-gray-500 uppercase">Pet</h4>
                        {profile ? (
                          <img src={profile} alt={petName} className="w-20 h-20 rounded-full object-cover mb-2" />
                        ) : (
                          <div className="w-20 h-20 rounded-full bg-gray-200 mb-2 flex items-center justify-center text-gray-400 text-sm">
                            <img src = "/images/dog-profile.png"></img>
                          </div>
                        )}
                        <p className="text-gray-800 font-medium">{petName || <span className="text-gray-400">Bogart</span>}</p>
                        <p className="text-gray-500 text-sm">{breed || <span className="text-gray-400">Chihuahua</span>}</p>
                        <p className="text-gray-500 text-sm">
                          {age && sex && weight ? `${age} years • ${sex} • ${weight}kg` : <span className="text-gray-400">3yo/Male/8kg</span>}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-6 flex justify-end gap-3 border-t border-gray-200 pt-4">
                    <button onClick={onClose} className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition">
                      Close
                    </button>
                    <button onClick={handleApprove} disabled={loading} className="px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition disabled:opacity-50">
                      Approve
                    </button>
                    <button onClick={() => setShowRejectConfirm(true)} className="px-4 py-2 rounded-xl bg-red-400 text-white hover:bg-red-500 transition">
                      Reject
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Reject Confirmation Modal */}
      <Transition.Root show={showRejectConfirm} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setShowRejectConfirm(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-lg transition-all">
                <Dialog.Title className="text-lg font-semibold text-gray-800">
                  Confirm Reject
                </Dialog.Title>
                <p className="mt-2 text-gray-600 text-sm">
                  Are you sure you want to reject this appointment?
                </p>

                <div className="mt-4 flex justify-end gap-3">
                  <button onClick={() => setShowRejectConfirm(false)} className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition">
                    Cancel
                  </button>
                  <button onClick={confirmReject} className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition">
                    Reject
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Toast */}
      {toast?.type === "success" && <SuccessToast message={toast.message} onClose={() => setToast(null)} />}
      {toast?.type === "error" && <ErrorToast message={toast.message} onClose={() => setToast(null)} />}
    </>
  );
};

export default AppointmentRequestModal;
