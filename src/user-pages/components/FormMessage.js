import React from "react";

function FormMessage({ type = "error", message }) {
  if (!message) return null;

  const base =
    "w-full px-4 py-2 mt-2 rounded-lg text-sm font-medium flex items-center gap-2 animate-fadeSlideDown";

  const styles = {
    error: `${base} bg-[#ffe5e5] text-[#d93025] border border-[#ffbaba]`,
    success: `${base} bg-[#e7f9f8] text-[#0f766e] border border-[#5EE6FE]/40`,
  };

  return (
    <div className={styles[type]}>
      <i
        className={`fa-solid ${
          type === "error" ? "fa-circle-exclamation" : "fa-circle-check"
        } text-base`}
      ></i>
      <span>{message}</span>
    </div>
  );
}

export default FormMessage;
