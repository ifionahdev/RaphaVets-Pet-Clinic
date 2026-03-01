import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    id: 1,
    question: "How do I sign up for an account?",
    answer: "Signing up is easy! Just click the Get Started button on top and follow the prompts. You can use your email address or Google to create your account.",
    category: "Getting Started"
  },
  {
    id: 2,
    question: "Do I need an account to use the clinic's services?",
    answer: "No, you can still visit the clinic and avail walk-in services, but having an account helps you keep records, book appointments, and track your pet's health history. You could also use some of our features by using guest account.",
    category: "Basic Information"
  },
  {
    id: 3,
    question: "Can I register multiple pets under one account?",
    answer: "Absolutely! You can register and manage multiple pets under a single account for easier record keeping and appointment scheduling.",
    category: "Basic Information"
  },
  {
    id: 4,
    question: "I forgot my password. What should I do?",
    answer: "Click on Forgot Password on the login page, then follow the instructions sent to your registered email address to reset your password.",
    category: "Basic Information"
  },
  {
    id: 5,
    question: "What payment methods do you accept?",
    answer: "We accept cash, credit/debit cards, and online transfers. We provide transparent pricing estimates before any procedure.",
    category: "Pricing"
  },
  {
    id: 6,
    question: "How do I book an appointment?",
    answer: "You can book through our website portal. Online bookings are available 24/7. Walk-ins are also accepted but we recommend booking to ensure minimal waiting time.",
    category: "Booking"
  },
  {
    id: 7,
    question: "Can I reschedule or cancel my booking?",
    answer: "Yes, you can reschedule or cancel up to 24 hours before your appointment without any charges through your booking dashboard.",
    category: "Booking"
  },
  {
    id: 8,
    question: "What are your clinic hours?",
    answer: "We're open Monday to Saturday from 9:00 AM to 9:00 PM, and Sundays from 1:00 PM to 9:00 PM.",
    category: "General"
  },
  {
    id: 9,
    question: "Where is RaphaVets located?",
    answer: "Our clinic is located at Block 3, Lot 22 Camia, Pembo, Taguig City. Get Direction now.",
    category: "General"
  },
  {
    id: 10,
    question: "Is my personal information safe?",
    answer: "Absolutely. We use encrypted systems and follow strict data protection protocols in compliance with privacy laws.",
    category: "Privacy"
  },
  {
    id: 11,
    question: "How is my pet's medical record handled?",
    answer: "Medical records are stored securely in our digital system and are only accessible to authorized veterinary staff for treatment purposes.",
    category: "Privacy"
  }
];

// Get unique categories
const categories = ["All", ...new Set(faqs.map(faq => faq.category))];

const FAQSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openFAQ, setOpenFAQ] = useState(null);
  const [search, setSearch] = useState("");

  // Filter FAQs based on category and search
  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
    const matchesSearch = search === "" || 
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Clear search
  const clearSearch = () => {
    setSearch("");
    setOpenFAQ(null);
  };

  // Toggle FAQ
  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const accordionVariants = {
    hidden: { 
      opacity: 0, 
      height: 0,
      marginTop: 0,
      marginBottom: 0,
      paddingTop: 0,
      paddingBottom: 0
    },
    visible: { 
      opacity: 1, 
      height: "auto",
      marginTop: "0.5rem",
      marginBottom: "0",
      paddingTop: "0.25rem",
      paddingBottom: "1rem",
      transition: {
        opacity: { duration: 0.2 },
        height: { duration: 0.3, ease: "easeInOut" }
      }
    }
  };

  const filterVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="text-[#2FA394]">Questions</span>
          </h2>
          <div className="w-24 h-1 bg-[#2FA394] mx-auto rounded-full" />
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Find answers to common questions about our veterinary services
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="relative max-w-md mx-auto">
            <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
            <input
              type="text"
              placeholder="Search FAQs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-full pl-10 pr-10 py-3 text-sm focus:ring-2 focus:ring-[#2FA394] focus:border-transparent outline-none transition-all"
            />
            {search && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <i className="fa-solid fa-times"></i>
              </button>
            )}
          </div>
        </motion.div>

        {/* Search Results Header */}
        {search && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-[#2FA394]">
                Search Results:
              </span>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                {filteredFAQs.length} found
              </span>
            </div>
            <button
              onClick={clearSearch}
              className="text-xs text-gray-500 hover:text-[#2FA394] underline"
            >
              Clear search
            </button>
          </motion.div>
        )}

        {/* Category Filters */}
        {!search && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-2 sm:gap-3 mb-8 justify-center"
          >
            {categories.map((cat, index) => (
              <motion.button
                key={cat}
                variants={filterVariants}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenFAQ(null);
                }}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium border transition-all ${
                  activeCategory === cat
                    ? "bg-[#2FA394] text-white border-[#2FA394] shadow-md"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-[#E3FAF7] hover:border-[#2FA394]"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* FAQs Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={search ? 'search' : activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="w-full"
          >
            {filteredFAQs.length > 0 ? (
              <div className="space-y-3 sm:space-y-4">
                {filteredFAQs.map((faq) => (
                  <motion.div
                    key={faq.id}
                    variants={itemVariants}
                    className="border border-gray-200 rounded-lg sm:rounded-xl overflow-hidden hover:border-[#2FA394]/30 transition-colors bg-white"
                  >
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full text-left p-4 sm:p-5 flex justify-between items-center gap-3 hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-800 text-sm sm:text-base flex-1 pr-4">
                        {faq.question}
                      </span>
                      <motion.span
                        animate={{ rotate: openFAQ === faq.id ? 45 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-[#2FA394] text-xl sm:text-2xl flex-shrink-0 w-6 h-6 flex items-center justify-center"
                      >
                        +
                      </motion.span>
                    </button>
                    <AnimatePresence>
                      {openFAQ === faq.id && (
                        <motion.div
                          variants={accordionVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          className="px-4 sm:px-5 pb-4 sm:pb-5"
                        >
                          <div className="pt-2 border-t border-gray-100">
                            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                              {faq.answer}
                            </p>
                            
                            {/* Category tag */}
                            <div className="mt-3">
                              <span className="inline-block text-[10px] sm:text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                {faq.category}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            ) : (
              // No Results
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 sm:py-16"
              >
                <div className="text-4xl sm:text-5xl mb-4">🔍</div>
                <h3 className="text-lg sm:text-xl font-medium text-gray-700 mb-2">
                  No FAQs found
                </h3>
                <p className="text-sm sm:text-base text-gray-500 mb-4">
                  Try searching with different keywords or browse by category
                </p>
                <button
                  onClick={clearSearch}
                  className="px-5 py-2.5 bg-[#2FA394] text-white rounded-lg text-sm font-medium hover:bg-[#24907e] transition-colors"
                >
                  Browse All Categories
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Contact CTA */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 sm:mt-12 p-6 sm:p-8 bg-gradient-to-r from-[#E3FAF7] to-[#F0F7FF] rounded-xl border border-[#2FA394]/20"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="text-center sm:text-left">
              <h3 className="text-base sm:text-lg font-semibold text-[#2FA394] mb-1">
                Still have questions?
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Can't find what you're looking for? Contact our support team.
              </p>
            </div>
            <motion.a
              href="/support"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-[#2FA394] text-white px-6 sm:px-8 py-3 rounded-lg font-medium text-sm hover:bg-[#24907e] transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-headset"></i>
              Contact Support
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;