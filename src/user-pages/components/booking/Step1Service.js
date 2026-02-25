import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../../../api/axios";

export default function Step1Service({ selectedService, setSelectedService }) {
  const [serviceTypes, setServiceTypes] = useState([]);
  const [showServicesModal, setShowServicesModal] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get("/appointment/services");
        const mapped = res.data.map((s) => ({
          id: s.serviceID,
          label: s.service,
          shortDescription: s.shortDescription,
          longDescription: s.longDescription,
          note: s.note,
          duration: s.duration,
          pricing: s.pricing || {},
        }));
        setServiceTypes(mapped);
      } catch (err) {
        console.error("Failed to fetch services:", err);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Choose a service</h2>
          <p className="text-xs sm:text-sm text-gray-500">Tap a card to choose.</p>
        </div>
        <button
          onClick={() => setShowServicesModal(true)}
          className="text-sm text-[#5EE6FE] hover:text-[#3ecbe0] transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <i className="fa-solid fa-circle-info"></i>
          <span className="text-xs sm:text-sm">View all service details</span>
        </button>
      </div>

      {/* Grid of service cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-2 sm:mt-4">
        {serviceTypes.map((service) => (
          <motion.button
            key={service.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedService(service)}
            className={`relative text-left p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all shadow-sm hover:shadow-md focus:outline-none ${
              selectedService?.id === service.id
                ? "border-[#5EE6FE] bg-[#EAFBFD] shadow-lg"
                : "border-gray-100 bg-white"
            }`}
          >
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center bg-white border border-gray-100 flex-shrink-0">
                <i className="fa-solid fa-paw text-[#5EE6FE] text-sm sm:text-base" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-gray-800 text-sm sm:text-base truncate">{service.label}</div>
                <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                  {service.shortDescription}
                </div>
              </div>
            </div>
            <div className="absolute right-2 sm:right-3 top-2 sm:top-3 text-[10px] sm:text-xs text-gray-400">
              {service.duration}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Modal for all services */}
      {showServicesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowServicesModal(false)}
          ></div>
          <div className="relative z-50 mx-auto w-full max-w-4xl">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col">
              {/* Modal Header */}
              <div className="bg-white border-b border-gray-100 p-4 sm:p-6">
                <div className="flex items-start sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg sm:text-2xl font-bold text-gray-900">Service Catalog</h3>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1">
                      Detailed information about all our veterinary services
                    </p>
                  </div>
                  <button
                    onClick={() => setShowServicesModal(false)}
                    className="text-gray-400 hover:text-gray-600 text-lg sm:text-xl transition-colors p-1 sm:p-2 hover:bg-gray-100 rounded-lg flex-shrink-0"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Modal Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                <div className="space-y-4 sm:space-y-6">
                  {serviceTypes.map((service) => (
                    <div
                      key={service.id}
                      className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200"
                    >
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-lg sm:rounded-xl border border-gray-200 flex items-center justify-center shadow-sm flex-shrink-0">
                            <i className="fa-solid fa-paw text-[#5EE6FE] text-lg sm:text-xl" />
                          </div>
                          <div>
                            <h4 className="text-base sm:text-xl font-semibold text-gray-900">
                              {service.label}
                            </h4>
                            <p className="text-gray-500 text-xs sm:text-sm mt-1">{service.duration}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedService(service);
                            setShowServicesModal(false);
                          }}
                          className="bg-[#5EE6FE] text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-[#3ecbe0] transition-all font-medium text-sm shadow-sm hover:shadow-md w-full sm:w-auto"
                        >
                          Select
                        </button>
                      </div>

                      {/* Long Description */}
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4">
                        {service.longDescription || service.note || "No description available."}
                      </p>

                      {/* Pricing */}
                      {service.pricing && Object.keys(service.pricing).length > 0 ? (
                        <div className="space-y-3 sm:space-y-4">
                          {Object.entries(service.pricing).map(([category, items]) => (
                            <div key={category}>
                              <h5 className="font-semibold text-gray-800 mb-2 text-xs sm:text-sm uppercase tracking-wide">
                                {category}
                              </h5>
                              <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
                                {items.map((item, idx) => (
                                  <div
                                    key={idx}
                                    className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-1 py-2 sm:py-3 px-3 sm:px-4"
                                  >
                                    <span className="text-gray-700 text-xs sm:text-sm">{item.label}</span>
                                    <span className="text-gray-500 text-xs sm:text-sm">P{item.price}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        service.note && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
                            <p className="text-xs sm:text-sm text-blue-700 flex items-start gap-2">
                              <i className="fa-solid fa-info-circle text-blue-500 mt-0.5 flex-shrink-0"></i>
                              <span>{service.note}</span>
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="border-t border-gray-200 bg-gray-50 px-4 sm:px-6 py-3 sm:py-4">
                <div className="flex justify-center">
                  <button
                    onClick={() => setShowServicesModal(false)}
                    className="border border-gray-300 bg-white text-gray-700 px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-gray-50 transition-all font-medium text-sm shadow-sm w-full sm:w-auto"
                  >
                    Close Catalog
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}