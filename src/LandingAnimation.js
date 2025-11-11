// src/components/LandingAnimation.js
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function LandingAnimation({ userType, userName, onAnimationComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const steps = userType === 'admin' 
      ? [
          { duration: 1500, text: "Securing admin session..." },
          { duration: 1800, text: "Loading clinic dashboard..." },
          { duration: 1600, text: "Preparing patient data..." },
          { duration: 1400, text: "Finalizing system access..." },
        ]
      : [
          { duration: 1500, text: "Securing your session..." },
          { duration: 1800, text: "Loading your pet profiles..." },
          { duration: 1600, text: "Preparing medical records..." },
          { duration: 1400, text: "Finalizing your access..." },
        ];

    const timer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        setShowWelcome(true);
        setTimeout(() => {
          onAnimationComplete();
        }, 2500);
      }
    }, steps[currentStep]?.duration || 1500);

    return () => clearTimeout(timer);
  }, [currentStep, onAnimationComplete, userType]);

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

  const loadingBarVariants = {
    initial: { width: "0%" },
    animate: {
      width: "100%",
      transition: {
        duration: 6.5,
        ease: "easeInOut"
      }
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.4
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
        title: "Welcome to RaphaVets",
        subtitle: "Your pet's health hub is ready",
        redirectText: "Redirecting to your account"
      };
    }
  };

  const getLoadingSteps = () => {
    if (userType === 'admin') {
      return [
        "Securing admin session...",
        "Loading clinic dashboard...",
        "Preparing patient data...",
        "Finalizing system access...",
      ];
    } else {
      return [
        "Securing your session...",
        "Loading your pet profiles...",
        "Preparing medical records...",
        "Finalizing your access...",
      ];
    }
  };

  const welcomeContent = getWelcomeContent();
  const loadingSteps = getLoadingSteps();

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
          {!showWelcome ? (
            /* Loading State */
            <div className="text-center">
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
                    className="w-16 h-16"
                  />
                  <div className="text-left">
                    <div className="font-baloo text-3xl font-bold">
                      <span className="text-gray-900">Rapha</span>
                      <span className="text-[#5EE6FE]">Vets</span>
                    </div>
                    <div className="font-sansation text-sm text-gray-500 -mt-1">
                      Pet Clinic
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Loading Steps */}
              <div className="mb-8">
                {loadingSteps.map((step, index) => (
                  <motion.div
                    key={step}
                    className={`flex items-center gap-3 mb-4 ${
                      index <= currentStep ? 'opacity-100' : 'opacity-40'
                    }`}
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      index < currentStep 
                        ? 'bg-[#5EE6FE] text-white' 
                        : index === currentStep
                        ? 'border-2 border-[#5EE6FE] text-[#5EE6FE]'
                        : 'border-2 border-gray-300 text-gray-300'
                    }`}>
                      {index < currentStep ? (
                        <i className="fa-solid fa-check text-xs"></i>
                      ) : (
                        <span className="text-xs font-bold">{index + 1}</span>
                      )}
                    </div>
                    <span className={`font-sansation ${
                      index <= currentStep ? 'text-gray-700' : 'text-gray-400'
                    }`}>
                      {step}
                    </span>
                    {index === currentStep && (
                      <motion.div
                        className="ml-2 flex space-x-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        {[0, 1, 2].map((dot) => (
                          <motion.div
                            key={dot}
                            className="w-1 h-1 bg-[#5EE6FE] rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              delay: dot * 0.2,
                            }}
                          />
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#5EE6FE] to-[#3ecbe0] rounded-full"
                  variants={loadingBarVariants}
                  initial="initial"
                  animate="animate"
                />
              </div>

              {/* Progress Percentage */}
              <motion.div
                className="text-gray-500 text-sm font-sansation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {Math.min(100, Math.round(((currentStep + 1) / loadingSteps.length) * 100))}% Complete
              </motion.div>
            </div>
          ) : (
            /* Welcome State */
            <motion.div
              className="text-center"
              variants={welcomeVariants}
              initial="hidden"
              animate="visible"
            >
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
          )}
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