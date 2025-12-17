import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { LuInstagram } from "react-icons/lu";
import { FaFacebook, FaGithub, FaYoutube, FaRegCopyright } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#3B444B] text-white font-[Poppins]">
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-2 py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

        {/* Section 1: Contacts */}
        <div>
          <h3 className="text-sm font-semibold mb-1">Contacts</h3>
          <div className="flex items-center gap-1 text-xs mb-1">
            <Phone size={14} />
            +91 9693128274
          </div>
          <div className="flex items-center gap-1 text-xs">
            <Mail size={14} />
            skgkumar9693@gmail.com
          </div>
        </div>

        {/* Section 2: Follow Us */}
        <div>
          <h3 className="text-sm font-semibold mb-1">Follow Us</h3>
          <div className="flex items-center gap-2">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <LuInstagram className="w-4 h-4 hover:text-pink-500 transition-colors" />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="w-4 h-4 hover:text-blue-600 transition-colors" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FaGithub className="w-4 h-4 hover:text-gray-400 transition-colors" />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="w-4 h-4 hover:text-red-600 transition-colors" />
            </a>
          </div>
        </div>

        {/* Section 3: About / Know us */}
        <div>
          <h3 className="text-sm font-semibold mb-1">Know Us</h3>
          <div className="text-xs">
            <a href="/about" className="hover:underline">About</a>
          </div>
        </div>

      </div>

      {/* Bottom copyright */}
      <div className="border-t border-white/20 mt-2 py-2 text-center text-xs flex justify-center items-center gap-1">
        <FaRegCopyright className="w-3 h-3" />
        All rights are reserved by the GE Groups - Commerce3
      </div>
    </footer>
  );
}

export default Footer;
