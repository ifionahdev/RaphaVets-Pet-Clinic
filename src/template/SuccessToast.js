import { useEffect } from "react";

const SuccessToast = ({ message, duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed top-5 right-5 z-50 w-80 bg-green-500 text-white rounded-xl shadow-lg overflow-hidden flex flex-col animate-slide-in">
      <div className="p-4 font-medium">{message}</div>
      <div
        className="h-1 bg-white origin-left animate-progress-bar"
        style={{ animationDuration: `${duration}ms` }}
      ></div>
    </div>
  );
};

export default SuccessToast;
