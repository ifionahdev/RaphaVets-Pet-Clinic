// src/components/LandingAnimation.js
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function LandingAnimation({ userType, userName, onAnimationComplete }) {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      onAnimationComplete();
    }, 3500);

    return () => clearTimeout(timer);
  }, [onAnimationComplete]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const welcomeVariants = {
    hidden: { 
      opacity: 0,
      y: 20 
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        duration: 1
      }
    }
  };

  // Role-specific content
  const getWelcomeContent = () => {
    if (userType === 'admin') {
      return {
        title: "Admin Dashboard Ready",
        subtitle: "Manage your veterinary clinic efficiently",
        redirectText: "Redirecting to admin dashboard"
      };
    } else {
      return {
        title: "Welcome to RVCare",
        subtitle: "Your pet's health hub is ready",
        redirectText: "Redirecting to your account"
      };
    }
  };

  const welcomeContent = getWelcomeContent();

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-white z-50 flex items-center justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="max-w-md w-full mx-6">
          {/* Welcome State */}
          <motion.div
            className="text-center"
            variants={welcomeVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Logo */}
            <motion.div
              className="flex justify-center mb-10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4">
                <img
                  src="/images/logo.png"
                  alt="RaphaVets"
                  className="w-18 h-16"
                />
                <div className="text-left">
                  <div className="font-baloo text-3xl font-bold">
                    <span className="text-gray-900">RV</span>
                    <span className="text-[#5EE6FE]">Care</span>
                  </div>
                  <div className="font-sansation text-sm text-gray-500 -mt-1">
                    Pet Clinic
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Success Icon */}
            <motion.div
              className="w-24 h-24 bg-gradient-to-br from-[#5EE6FE] to-[#3ecbe0] rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl"
              variants={iconVariants}
              initial="hidden"
              animate="visible"
            >
              <i className="fa-solid fa-check text-white text-3xl"></i>
            </motion.div>

            {/* Welcome Message */}
            <motion.h1
              className="text-3xl font-bold text-gray-900 mb-4 font-baloo"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Welcome{userName ? `, ${userName}` : ''}
            </motion.h1>

            <motion.p
              className="text-gray-600 mb-2 font-sansation text-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {welcomeContent.title}
            </motion.p>

            <motion.p
              className="text-gray-500 mb-8 font-sansation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {welcomeContent.subtitle}
            </motion.p>

            {/* Redirecting Animation */}
            <motion.div
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <div className="flex space-x-1">
                  {[0, 1, 2].map((index) => (
                    <motion.div
                      key={index}
                      className="w-2 h-2 bg-[#5EE6FE] rounded-full"
                      animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                    />
                  ))}
                </div>
                <span>{welcomeContent.redirectText}</span>
              </div>
              
              {/* Additional loading bar for redirect */}
              <div className="w-48 bg-gray-200 rounded-full h-1 overflow-hidden">
                <motion.div
                  className="h-full bg-[#5EE6FE] rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 -z-10 opacity-[0.03]">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#5EE6FE] rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#3ecbe0] rounded-full blur-3xl"></div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default LandingAnimation;