import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-primary py-10 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4">RealEstateHub</h2>
          <p className="text-gray-900">
            Helping you find the perfect property – from cozy apartments to
            spacious homes.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-900">
            <li>
              <a href="/" className="hover:text-black">
                Home
              </a>
            </li>
            <li>
              <a href="/properties" className="hover:text-black">
                Properties
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-black">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-black">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-900 mb-2">Email: support@realestatehub.com</p>
          <p className="text-gray-900 mb-4">Phone: +91 98765 43210</p>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-[#0ea5e9]">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-[#f43f5e]">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-[#38bdf8]">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-[#0e76a8]">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center text-gray-900 text-sm mt-10 border-t border-gray-600 pt-6">
        © {new Date().getFullYear()} RealEstateHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
