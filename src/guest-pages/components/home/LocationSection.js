import React from "react";
import { motion } from "framer-motion";

const LocationSection = () => {
  const EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d692.2658956036637!2d121.06040213950331!3d14.547320099402103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c96dc01fd759%3A0x3d190d6e08e48bd1!2sRaphaVets%20Pet%20Clinic!5e1!3m2!1sen!2sph!4v1761728215056!5m2!1sen!2sph";

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            Visit <span className="text-[#5EE6FE]">Us</span>
          </h2>
          <div className="w-24 h-1 bg-[#5EE6FE] mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 rounded-xl overflow-hidden shadow-md border border-gray-200 h-[400px]"
          >
            <iframe
              title="RaphaVets Pet Clinic Location"
              src={EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          {/* Info card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-6 flex flex-col justify-center shadow-md border border-gray-200"
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Visit Us!</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <i className="fas fa-map-marker-alt text-[#5EE6FE] text-lg mt-1" />
                <div>
                  <p className="font-medium text-gray-900">Address:</p>
                  <p className="text-gray-600">Block 3, Lot 22 Camia, Taguig</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <i className="fas fa-phone-alt text-[#5EE6FE] text-lg mt-1" />
                <div>
                  <p className="font-medium text-gray-900">Phone:</p>
                  <p className="text-gray-600">0910 124 9052</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <i className="fas fa-clock text-[#5EE6FE] text-lg mt-1" />
                <div>
                  <p className="font-medium text-gray-900">Hours:</p>
                  <p className="text-gray-600">Mon-Sat: 9AM-9PM</p>
                  <p className="text-gray-600">Sun: 1PM-9PM</p>
                </div>
              </div>
            </div>

            <motion.a
              href="https://www.google.com/maps/dir//RaphaVets+Pet+Clinic+Block+3+Lot+22+Camia+Taguig,+Metro+Manila/@14.5473643,121.0610568,19z"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#5EE6FE] text-white text-center py-3 px-6 rounded-lg font-medium hover:bg-[#5cdffd] transition-colors duration-300"
            >
              Get Directions →
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;