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
          note: s.description,
          duration: s.duration,
          price: s.price || "Contact for pricing",
        }));
        setServiceTypes(mapped);
      } catch (err) {
        console.error("Failed to fetch services:", err);
      }
    };

    fetchServices();
  }, []);

  // Service details content based on your images
  const serviceDetails = {
    "Consultation": {
      description: "Our veterinary consultations provide expert guidance to ensure your pets stay healthy and well-cared for. From routine check-ups to addressing specific health concerns, our dedicated vets take the time to understand your pet's needs and offer tailored advice for their overall well-being.",
      note: "Consultation fees may vary depending on the type of service required."
    },
    "Vaccination": {
      description: "Protect your pets from harmful diseases with our comprehensive vaccination services. We provide safe and effective vaccines tailored to your pet's needs, ensuring their long-term health and immunity.",
      pricing: {
        "For Dogs": [
          "5-in-1 Vaccine - P500",
          "8-in-1 Vaccine - P600", 
          "Anti-Rabies Vaccine - P250",
          "Kennel Cough Vaccine - P500"
        ],
        "For Cats": [
          "4-in-1 Vaccine - P850"
        ]
      }
    },
    "Basic Soft Tissue Surgery": {
      description: "Our clinic provides safe and reliable soft tissue surgeries to address common health issues in pets, such as lump removals, wound repairs, or minor surgical needs. With modern facilities and experienced veterinarians, we ensure your pets receive gentle, expert care throughout the procedure.",
      note: "Surgery costs may vary depending on the case and treatment required."
    },
    "Blood Chemistry Lab": {
      description: "Our blood chemistry tests provide vital insights into your pet's overall health, including organ function, hydration, and possible underlying conditions. This service helps us detect issues early and create the right treatment plan for your dog or cat.",
      pricing: {
        "Price": ["P2,800"]
      }
    },
    "CBC": {
      description: "A complete blood count is an essential test to evaluate your pet's overall health. It helps detect infections, anemia, immune system issues, and other conditions that may not be visible through routine check-ups. Regular CBC testing ensures early detection and timely care for your pets.",
      pricing: {
        "Price": ["P950"]
      }
    },
    "Veterinary Health Certificate": {
      description: "A veterinary health certificate provides official proof that your pet is healthy and fit for travel, adoption, or other requirements. Our licensed veterinarians will examine your dog or cat thoroughly to ensure they meet all health standards before issuing the certificate.",
      pricing: {
        "Price": ["P750"]
      }
    },
    "Microchipping": {
      description: "Microchipping is a safe and permanent way to identify your pets and ensure they can always find their way back to you if lost. The tiny microchip is quickly implanted under your pet's skin and linked to your contact information, giving you peace of mind and added security for your beloved companion.",
      note: "Pricing may vary depending on the type of microchip and registration requirements."
    },
    "Confinement": {
      description: "For pets requiring close monitoring and extended care, our clinic offers safe and comfortable confinement facilities. Whether your pet is recovering from surgery, illness, or needs observation, our veterinary team ensures they receive round-the-clock attention and proper medical support.",
      note: "Pricing depends on the duration of stay and the level of care required."
    },
    "Capon": {
      description: "Our capon services ensure your pets are healthier, safer, and help in controlling the pet population. The procedure is performed with professional care to promote faster recovery and comfort for your pet.",
      pricing: {
        "Cats": [
          "Male Cat - P1,000",
          "Female Cat - P1,500"
        ],
        "Dogs (Male)": [
          "1–5 kg – P2,750",
          "5.1–10 kg – P3,750", 
          "10.1–15 kg – P4,750",
          "15.1–20 kg – P6,000"
        ],
        "Dogs (Female)": [
          "1–5 kg – P4,250",
          "5.1–10 kg – P6,250",
          "10.1–15 kg – P8,250", 
          "15.1–20 kg – P10,250"
        ]
      }
    },
    "Dental Prophylaxis": {
      description: "Good oral health is essential for your pet's overall well-being. Our dental prophylaxis service includes thorough cleaning to prevent plaque, tartar buildup, and gum disease, helping your pets maintain healthy teeth and fresh breath.",
      pricing: {
        "Prices": [
          "1–10 kg – P5,000",
          "10.1–15 kg – P7,000"
        ]
      }
    },
    "Deworming": {
      description: "Protect your pets from harmful internal parasites with our safe and effective deworming service. Regular deworming ensures your dogs and cats stay healthy, active, and free from intestinal worms.",
      pricing: {
        "Prices": [
          "0.1–2 kg – P150",
          "2–5 kg – P250",
          "5.1–7 kg – P300",
          "7.1–10 kg – P350", 
          "10.1–15 kg – P400",
          "15.1–20 kg – P450",
          "20–30 kg – P500"
        ]
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Choose a service</h2>
          <p className="text-sm text-gray-500">Tap a card to choose.</p>
        </div>
        <button
          onClick={() => setShowServicesModal(true)}
          className="text-sm text-[#5EE6FE] hover:text-[#3ecbe0] transition-colors flex items-center gap-2"
        >
          <i className="fa-solid fa-circle-info"></i>
          View all service details
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {serviceTypes.map((t) => (
          <motion.button
            key={t.id}
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedService(t)}
            className={`relative text-left p-4 rounded-2xl border transition-all shadow-sm hover:shadow-md focus:outline-none ${
              selectedService?.id === t.id
                ? "border-[#5EE6FE] bg-[#EAFBFD] shadow-lg"
                : "border-gray-100 bg-white"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-white border border-gray-100">
                <i className="fa-solid fa-paw text-[#5EE6FE]" />
              </div>
              <div>
                <div className="font-semibold text-gray-800">{t.label}</div>
                <div className="text-xs text-gray-500 mt-1">{t.note}</div>
              </div>
            </div>
            <div className="absolute right-3 top-3 text-xs text-gray-400">
              {t.duration}
            </div>
          </motion.button>
        ))}
      </div>

      {showServicesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowServicesModal(false)}></div>
          <div className="relative z-50 mx-4 w-full max-w-4xl">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col">
              {/* Header */}
              <div className="bg-white border-b border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Service Catalog</h3>
                    <p className="text-gray-500 mt-1">Detailed information about all our veterinary services</p>
                  </div>
                  <button 
                    onClick={() => setShowServicesModal(false)} 
                    className="text-gray-400 hover:text-gray-600 text-xl transition-colors p-2 hover:bg-gray-100 rounded-lg"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-8">
                  {serviceTypes.map((service) => {
                    const details = serviceDetails[service.label] || {};
                    return (
                      <div key={service.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                        {/* Service Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-4">
                            <div className="w-14 h-14 bg-white rounded-xl border border-gray-200 flex items-center justify-center shadow-sm">
                              <i className={`fa-solid ${details.icon || 'fa-paw'} text-[#5EE6FE] text-xl`} />
                            </div>
                            <div>
                              <h4 className="text-xl font-semibold text-gray-900">{service.label}</h4>
                              <p className="text-gray-500 text-sm mt-1">{service.duration}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setSelectedService(service);
                              setShowServicesModal(false);
                            }}
                            className="bg-[#5EE6FE] text-white px-6 py-2 rounded-lg hover:bg-[#3ecbe0] transition-all font-medium shadow-sm hover:shadow-md"
                          >
                            Select
                          </button>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 leading-relaxed mb-4">{details.description}</p>

                        {/* Note */}
                        {details.note && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                            <p className="text-sm text-blue-700 flex items-start gap-2">
                              <i className="fa-solid fa-info-circle text-blue-500 mt-0.5"></i>
                              {details.note}
                            </p>
                          </div>
                        )}

                        {/* Pricing */}
                        {details.pricing && Object.entries(details.pricing).map(([category, items]) => (
                          <div key={category} className="mb-4 last:mb-0">
                            <h5 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">{category}</h5>
                            <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
                              {items.map((item, index) => (
                                <div key={index} className="flex justify-between items-center py-3 px-4">
                                  <span className="text-gray-700">{item.split(' - ')[0]}</span>
                                  <span className="text-gray">{item.split(' - ')[1]}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
                <div className="flex justify-center">
                  <button 
                    onClick={() => setShowServicesModal(false)}
                    className="border border-gray-300 bg-white text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-all font-medium shadow-sm"
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