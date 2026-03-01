import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    text: "I'm so grateful for the excellent care provided by this veterinary clinic. The doctors and assistants were truly wonderful... The level of care and attention given to my lya was exceptional. The staff kept me well-informed throughout the process, providing regular updates. I wholeheartedly recommend this clinic for their outstanding service and care.",
    author: "Winona T",
    rating: 5
  },
  {
    id: 2,
    text: "We are happy that this vet is open until 9pm. We're almost losing hope where to bring our furbaby, Snow, after constant vomiting and refusing to eat. Doc and his assistant were very accommodating. We're attended immediately, and some tests were performed right away. Our baby was now healthy and active, thanks to this vet clinic.",
    author: "Roed M",
    rating: 5
  },
  {
    id: 3,
    text: "I couldn't be more grateful for the exceptional care my pet received at RaphaVets Pet Clinic! From the moment we walked in, the staff was warm, professional, and clearly passionate about animals. The clinic was clean, well-organized, and had a calming atmosphere that immediately put my pet at ease.",
    author: "Cherry B",
    rating: 5
  },
  {
    id: 4,
    text: "Thankyou Raphavets, grabe asikaso at alaga nila sa furbaby ko. Nakasurvive sya sa parvo. 2nd life na nia ngyon 😍 hindi nila ako binigo and tinotoo nila ung sabi nila na sila na raw mastress sa pag alaga kay Pogi kaya wag na raw ako mastress. Super duper thankyou po talaga kay Doc Eric and sa mga assistants nia.",
    author: "Myleen R",
    rating: 5
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            What Pet Owners Say
          </h2>
          <div className="w-24 h-1 bg-[#5EE6FE] mx-auto rounded-full" />
        </motion.div>

        <div className="relative">
          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-all duration-300 hover:text-[#5EE6FE] focus:outline-none"
          >
            <i className="fas fa-chevron-left text-sm" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-all duration-300 hover:text-[#5EE6FE] focus:outline-none"
          >
            <i className="fas fa-chevron-right text-sm" />
          </button>

          {/* Testimonial card */}
          <div className="px-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-xl shadow-md p-6 md:p-8"
              >
                <div className="flex flex-col items-center text-center">
                  {/* Author avatar */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#5EE6FE] to-[#F8B195] flex items-center justify-center text-white text-xl font-bold mb-4">
                    {testimonials[currentIndex].author[0]}
                  </div>

                  {/* Rating stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`fas fa-star text-sm ${
                          i < testimonials[currentIndex].rating
                            ? "text-[#F8B195]"
                            : "text-gray-200"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-gray-600 text-base leading-relaxed mb-4">
                    "{testimonials[currentIndex].text}"
                  </p>

                  <div>
                    <p className="font-semibold text-gray-900">
                      {testimonials[currentIndex].author}
                    </p>
                    <p className="text-sm text-gray-500">Pet Owner</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-6 bg-[#5EE6FE]"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;