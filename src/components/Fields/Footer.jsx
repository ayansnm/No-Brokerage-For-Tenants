import React, { useEffect } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-primary py-5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-green-900">No Brokerage For Tenants</h2>
          <p className="text-gray-700">
            Helping you find the perfect property – from cozy apartments to spacious homes.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-green-900">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/broker/dashboard" className="text-gray-700 hover:text-black transition-colors duration-200">
                Home
              </Link>
            </li>
            <li>
              <Link to="/properties" className="text-gray-700 hover:text-black transition-colors duration-200">
                Properties
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-700 hover:text-black transition-colors duration-200">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-700 hover:text-black transition-colors duration-200">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Social Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-green-900">Contact Us</h3>
          <p className="text-gray-700 mb-1">Email: <a href="mailto:support@nbft.com" className="hover:underline">support@nbft.com</a></p>
          <p className="text-gray-700 mb-1">Phone: +91 98765 43210</p>
          <p className="text-gray-700 mb-4">456, MG Road, Bangalore, Karnataka 560001, India</p>
          <div className="flex gap-4 text-2xl">
            <a href="#" aria-label="Facebook" className="hover:text-[#0ea5e9] transition-colors duration-200">
              <FaFacebook />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-[#f43f5e] transition-colors duration-200">
              <FaInstagram />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-[#38bdf8] transition-colors duration-200">
              <FaTwitter />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-[#0e76a8] transition-colors duration-200">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-gray-600 text-sm mt-10 border-t border-gray-400 pt-6">
        © {new Date().getFullYear()} No Brokerage For Tenants. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
