import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  const linkClasses = "text-gray-400 hover:text-[#5EE6FE] transition-colors duration-300";

  return (
    <footer className="relative bg-gray-800 text-white">
      {/* minimal top border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-800 opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo and branding */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <img
              src="/images/rapha-logo.png"
              alt="RaphaVets Logo"
              className="h-16 w-auto mb-4"
            />
            <h3 className="text-xl font-bold mb-1">RaphaVets</h3>
            <p className="text-sm text-gray-400 tracking-widest">PET CLINIC</p>
            <p className="text-gray-400 text-sm mt-4">
              Providing exceptional veterinary care with compassion and expertise.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className={linkClasses}>Home</Link></li>
              <li><Link to="/services" className={linkClasses}>Services</Link></li>
              <li><Link to="/about" className={linkClasses}>About Us</Link></li>
              <li><Link to="/contact" className={linkClasses}>Contact</Link></li>
              <li><Link to="/faq" className={linkClasses}>FAQ</Link></li>
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-lg font-bold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/consultation" className={linkClasses}>Consultation</Link></li>
              <li><Link to="/vaccination" className={linkClasses}>Vaccination</Link></li>
              <li><Link to="/surgery" className={linkClasses}>Surgery</Link></li>
              <li><Link to="/laboratory" className={linkClasses}>Laboratory</Link></li>
              <li><Link to="/dental" className={linkClasses}>Dental Care</Link></li>
            </ul>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-lg font-bold mb-4">Connect With Us</h4>
            <div className="space-y-3">
              <a
                href="#"
                className="flex items-center gap-3 text-gray-400 hover:text-[#5EE6FE] transition-colors"
              >
                <img src="/images/fb-icon.png" alt="Facebook" className="w-5 h-5" />
                <span>RaphaVets Pet Clinic</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 text-gray-400 hover:text-[#5EE6FE] transition-colors"
              >
                <img src="/images/ig-icon.png" alt="Instagram" className="w-5 h-5" />
                <span>raphavetspetclinic</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Contact bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-8 mt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <i className="fas fa-map-marker-alt text-[#5EE6FE]" />
                Block 3, Lot 22 Camia, Taguig
              </span>
              <span className="flex items-center gap-2">
                <i className="fas fa-phone text-[#5EE6FE]" />
                0910 124 9052
              </span>
              <span className="flex items-center gap-2">
                <i className="fas fa-envelope text-[#5EE6FE]" />
                raphavets.clinic@gmail.com
              </span>
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm mt-8">
          <p>&copy; {new Date().getFullYear()} RaphaVets Pet Clinic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;