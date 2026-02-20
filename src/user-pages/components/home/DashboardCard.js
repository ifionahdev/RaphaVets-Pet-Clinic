import React from "react";

const DashboardCard = ({ title, description, icon, bg, text, onClick, url }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (url) {
      window.open(url, "_blank");
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{ backgroundColor: bg, color: text }}
      className="p-5 rounded-xl shadow-lg flex flex-col justify-between cursor-pointer hover:scale-105 transition-all h-40"
    >
      <div>
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{title}</h3>
        <p className="text-sm line-clamp-3">{description}</p>
      </div>
      <div className="mt-3 flex justify-end text-2xl">
        <i className={`fa-solid ${icon}`}></i>
      </div>
    </div>
  );
};

export default DashboardCard;
