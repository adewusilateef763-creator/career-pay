import React from "react";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebookSquare, FaLinkedin, FaTwitter } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black pt-24 pb-12 px-6 lg:px-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-8">
              <img
                src="/careerpay-logo.png"
                alt="CareerPay"
                className="w-40 h-auto"
              />
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-xs">
              Simplifying compensation management for organizations through innovation and commitment.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all">
                <FaTwitter />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all">
                <FaLinkedin />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all">
                <AiFillInstagram />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Company</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-gray-500 hover:text-white transition-colors text-sm">Home</Link></li>
              <li><Link to="/about" className="text-gray-500 hover:text-white transition-colors text-sm">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-500 hover:text-white transition-colors text-sm">Careers</Link></li>
              <li><Link to="/contact" className="text-gray-500 hover:text-white transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Support</h4>
            <ul className="space-y-4">
              <li><Link to="/help" className="text-gray-500 hover:text-white transition-colors text-sm">Help Center</Link></li>
              <li><Link to="/faq" className="text-gray-500 hover:text-white transition-colors text-sm">FAQ</Link></li>
              <li><Link to="/privacy" className="text-gray-500 hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-500 hover:text-white transition-colors text-sm">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Stay Updated</h4>
            <p className="text-gray-500 text-sm mb-6">Subscribe to our newsletter for the latest updates.</p>
            <form className="relative">
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-lg text-xs font-bold transition-all">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs">
            © 2026 CareerPay. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link to="/privacy" className="text-gray-600 hover:text-white text-xs transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-600 hover:text-white text-xs transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="text-gray-600 hover:text-white text-xs transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
