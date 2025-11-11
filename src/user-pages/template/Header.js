import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Header({ darkMode, setDarkMode, setIsMenuOpen }) {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const notificationRef = useRef(null);

  // Professional notifications data
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        type: "laboratory",
        title: "Lab Results Available",
        message: "Dr. Ano name has uploaded lab records for Bogart's blood test",
        time: "5 min ago",
        read: false,
        icon: "fa-file-medical",
        color: "text-red-500"
      },
      {
        id: 2,
        type: "lost_pet",
        title: "Lost Pet Alert",
        message: "Mark Mapili posted a lost Golden Retriever near Central Park",
        time: "15 min ago",
        read: false,
        icon: "fa-paw",
        color: "text-amber-500"
      },
      {
        id: 3,
        type: "care_tip",
        title: "New Pet Care Tip",
        message: "Learn about seasonal allergies in dogs and how to manage them",
        time: "1 hour ago",
        read: true,
        icon: "fa-lightbulb",
        color: "text-emerald-500"
      },
      {
        id: 4,
        type: "video",
        title: "New Educational Video",
        message: "Watch our latest video on dental care for senior pets",
        time: "2 hours ago",
        read: true,
        icon: "fa-film",
        color: "text-blue-500"
      },
      {
        id: 5,
        type: "appointment",
        title: "Appointment Reminder",
        message: "Bogart's consultation is scheduled for tomorrow at 3:00 PM",
        time: "3 hours ago",
        read: true,
        icon: "fa-calendar-check",
        color: "text-purple-500"
      },
      {
        id: 6,
        type: "medical",
        title: "Medical History Update",
        message: "Dr. jhd updated Bogart's vaccination records",
        time: "5 hours ago",
        read: true,
        icon: "fa-file-medical",
        color: "text-cyan-500"
      }
    ];
    setNotifications(mockNotifications);
  }, []);

  // Close notifications when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleNotificationItemClick = (notification) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notification.id ? { ...notif, read: true } : notif
      )
    );

    // Navigate based on notification type
    switch (notification.type) {
      case "medical":
        navigate("/medical-records");
        break;
      case "lost_pet":
        navigate("/lost-pets");
        break;
      case "care_tip":
        navigate("/pet-tips");
        break;
      case "video":
        navigate("/videos");
        break;
      case "appointment":
        navigate("/appointments");
        break;
      case "forum":
        navigate("/forum");
        break;
      default:
        break;
    }
    
    setShowNotifications(false);
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const unreadCount = notifications.filter(notif => !notif.read).length;

  return (
    <div className="pt-5 pb-2 px-5 sm:px-10 flex flex-row justify-between items-center animate-fadeSlideDown relative z-40">
      {/* Left side - Menu, Logo */}
      <div className="flex flex-row items-center gap-3">
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="text-3xl text-gray-700 focus:outline-none transition-transform duration-300 hover:scale-110"
        >
          ☰
        </button>
        <img
          src="/images/logo.png"
          className="w-[40px] sm:w-[60px] md:w-[80px] transition-transform duration-300 hover:scale-105"
          alt="Logo"
        />
        <div className="flex flex-col">
          <div className="font-baloo text-2xl leading-none">
            <span className="text-[#000000]">Rapha</span>
            <span className="text-[#5EE6FE]">Vets</span>
          </div>
          <span className="font-sansation text-sm">Pet Clinic</span>
        </div>
      </div>

      {/* RIGHT SIDE - NOTIF + FORUM + MODE TOGGLE */}
      <div className="flex flex-row justify-end items-center gap-5 sm:gap-8 text-gray-700 animate-fadeSlideDown delay-100">
        {/* Notification */}
        <div className="relative" ref={notificationRef}>
          <div
            onClick={handleNotificationClick}
            className="relative text-2xl transition-all duration-300 hover:scale-110 cursor-pointer text-gray-700 hover:text-gray-900"
          >
            <i className="fa-solid fa-bell"></i>
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 animate-slideDown">
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50 rounded-t-xl">
                <h3 className="font-semibold text-gray-800 text-lg">Notifications</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-[#5EE6FE] hover:text-[#3ecbe0] font-medium transition-colors duration-200"
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              {/* Notifications List */}
              <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <div
                      key={notification.id}
                      onClick={() => handleNotificationItemClick(notification)}
                      className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-all duration-200 animate-fadeIn ${
                        !notification.read ? "bg-blue-50 border-l-4 border-l-blue-400" : ""
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-start gap-3">
                        {/* Notification Icon */}
                        <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                          notification.read ? "bg-gray-100" : "bg-blue-100"
                        } transition-colors duration-200`}>
                          <i className={`fa-solid ${notification.icon} ${notification.color} text-lg`}></i>
                        </div>
                        
                        {/* Notification Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className={`font-semibold text-sm ${
                              notification.read ? "text-gray-600" : "text-gray-900"
                            }`}>
                              {notification.title}
                            </h4>
                            <span className="text-xs text-gray-400 ml-2 flex-shrink-0">
                              {notification.time}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {notification.message}
                          </p>
                        </div>
                        
                        {/* Unread Indicator */}
                        {!notification.read && (
                          <div className="w-2 h-2 bg-[#5EE6FE] rounded-full flex-shrink-0 mt-2 animate-pulse"></div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center animate-fadeIn">
                    <i className="fa-solid fa-bell-slash text-4xl text-gray-300 mb-3"></i>
                    <p className="text-gray-500 text-sm">No notifications yet</p>
                    <p className="text-gray-400 text-xs mt-1">We'll notify you when something new arrives</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Forum Button */}
        <div
          onClick={() => navigate("/forum")}
          className="flex items-center gap-2 transition-transform duration-300 hover:scale-105 cursor-pointer"
        >
          <i className="fa-solid fa-users"></i>
          <span className="font-semibold">Forum</span>
        </div>

        {/* Mode Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">Mode</span>
          <div
            onClick={() => setDarkMode(!darkMode)}
            className={`w-12 h-6 flex items-center rounded-full p-[2px] cursor-pointer transition-all duration-300 ${
              darkMode ? "bg-[#5EE6FE]" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                darkMode ? "translate-x-6" : ""
              }`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;