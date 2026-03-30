import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    closeMenu();
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/60 backdrop-blur-lg border-b border-white/10 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/careerpay-logo.png"
            alt="Careerpay"
            className="w-32 lg:w-40 h-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <Link to="/" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Home</Link>
          <Link to="/about" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">About</Link>
          <Link to="/testimonials" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Testimonials</Link>
          <Link to="/careers" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Careers</Link>
          <Link to="/faq" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">FAQ</Link>
          <Link to="/contact" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Contact</Link>
        </div>

        {/* Desktop Auth */}
        <div className="hidden lg:flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                className="text-white bg-white/10 hover:bg-white/20 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-white text-sm font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-300 hover:text-white text-sm font-medium px-4"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="bg-white text-black hover:bg-gray-200 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <HiX size={32} /> : <HiMenu size={32} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-black z-40 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-8 pt-24 gap-8">
          <Link to="/" onClick={closeMenu} className="text-2xl font-bold text-white">Home</Link>
          <Link to="/about" onClick={closeMenu} className="text-2xl font-bold text-white">About</Link>
          <Link to="/testimonials" onClick={closeMenu} className="text-2xl font-bold text-white">Testimonials</Link>
          <Link to="/careers" onClick={closeMenu} className="text-2xl font-bold text-white">Careers</Link>
          <Link to="/contact" onClick={closeMenu} className="text-2xl font-bold text-white">Contact</Link>
          
          <div className="mt-auto flex flex-col gap-4">
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={closeMenu}
                  className="bg-[#1D4EFF] text-white text-center py-4 rounded-xl font-bold"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-400 text-center py-4"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="text-white text-center py-4 border border-white/20 rounded-xl font-bold"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  onClick={closeMenu}
                  className="bg-white text-black text-center py-4 rounded-xl font-bold"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
