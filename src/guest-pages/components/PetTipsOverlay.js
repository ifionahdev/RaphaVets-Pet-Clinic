import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PetTipsOverlay({ onClose, tips = [] }) {
  const [selectedTip, setSelectedTip] = useState(null);
  const [confirmLink, setConfirmLink] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const cardColors = [
    "#E3FAF7",
    "#FCE7F3",
    "#FFF4E5",
    "#E6F4EA",
    "#E5E7FF",
    "#FFF1F0",
  ];

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(tips.map((tip) => tip.category).filter(Boolean))];
    return ["All", ...uniqueCategories];
  }, [tips]);

  const filteredTips = useMemo(() => {
    return tips.filter((tip) => {
      const matchesFilter = filter === "All" || tip.category === filter;
      const searchValue = search.toLowerCase();

      const matchesSearch =
        (tip.title || "").toLowerCase().includes(searchValue) ||
        (tip.short || "").toLowerCase().includes(searchValue) ||
        (tip.long || "").toLowerCase().includes(searchValue) ||
        (tip.category || "").toLowerCase().includes(searchValue);

      return matchesFilter && matchesSearch;
    });
  }, [tips, filter, search]);

  return (
    <div className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm flex justify-center items-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="relative bg-white w-full max-w-5xl rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 bg-gray-200 hover:bg-gray-300 text-black px-3 py-1 rounded-full"
        >
          ✕
        </button>

        <h1 className="text-3xl font-bold text-[#5EE6FE] mb-6 text-center">
          Pet Care Tips
        </h1>

        <input
          type="text"
          placeholder="Search tips..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-3xl px-4 py-2 text-sm w-full mb-5"
        />

        <div className="flex flex-wrap gap-3 justify-center mb-6">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                filter === cat
                  ? "bg-[#5EE6FE] text-white border-[#5EE6FE]"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-[#E3FAF7]"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {filteredTips.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No pet care tips found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTips.map((tip, idx) => (
              <motion.div
                key={tip.id}
                whileHover={{ scale: 1.04 }}
                onClick={() => setSelectedTip(tip)}
                style={{ backgroundColor: cardColors[idx % cardColors.length] }}
                className="cursor-pointer p-5 rounded-xl shadow-lg"
              >
                <div className="text-2xl text-[#5EE6FE] mb-3">
                  <i className={`fa-solid ${tip.icon}`}></i>
                </div>

                <div className="mb-2">
                  <span className="inline-block text-xs font-medium bg-white/70 text-gray-700 px-3 py-1 rounded-full">
                    {tip.category || "General"}
                  </span>
                </div>

                <h3 className="font-semibold text-gray-800 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-700 line-clamp-3">
                  {tip.short || "No short description available."}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        <AnimatePresence>
          {selectedTip && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4">
              <motion.div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedTip(null)}
              />
              <motion.div
                className="relative z-[10000] bg-white rounded-xl sm:rounded-2xl md:rounded-3xl w-full max-w-md p-4 sm:p-5 md:p-6 shadow-2xl overflow-y-auto max-h-[90vh]"
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 30 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="text-[#2FA394] text-3xl sm:text-4xl mb-3 sm:mb-4 flex justify-center">
                  <i className={`fa-solid ${selectedTip.icon}`}></i>
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-[#2FA394] text-center">
                  {selectedTip.title}
                </h2>
                <div className="flex justify-center mb-3 sm:mb-4">
                  <span className="inline-block text-xs font-medium text-[#2FA394] px-3 py-1 rounded-full border border-[#2FA394]">
                    {selectedTip.category || "General"}
                  </span>
                </div>
                <p className="text-gray-700 mb-4 sm:mb-5 md:mb-6 text-xs sm:text-sm leading-relaxed">
                  {selectedTip.long || selectedTip.short || "No details available."}
                </p>
                <div className="flex flex-col xs:flex-row justify-center gap-2 sm:gap-3">
                  <motion.a
                    onClick={(e) => {
                      e.preventDefault();
                      if (selectedTip.url) {
                        setConfirmLink(selectedTip.url);
                      }
                    }}
                    className="bg-[#2FA394] hover:bg-[#24907e] text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium cursor-pointer text-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
                  </motion.a>
                  <motion.button
                    onClick={() => setSelectedTip(null)}
                    className="bg-gray-300 hover:bg-gray-400 text-black px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Close
                  </motion.button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {confirmLink && (
            <div className="fixed inset-0 z-[130000] flex items-center justify-center">
              <motion.div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setConfirmLink(null)}
              />

              <motion.div
                className="relative bg-white rounded-2xl p-6 max-w-sm w-[90%] shadow-xl z-10"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Leaving RVCare</h3>
                <p className="text-sm text-gray-600 mb-4">
                  You are about to open an external page. Do you want to continue?
                </p>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setConfirmLink(null)}
                    className="bg-gray-300 px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      window.open(confirmLink, "_blank", "noopener,noreferrer");
                      setConfirmLink(null);
                    }}
                    className="bg-[#5EE6FE] text-white px-4 py-2 rounded-lg"
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}