import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  FiMapPin,
  FiUser,
  FiMenu,
  FiX,
  FiChevronDown,
  FiSearch,
  FiEye,
  FiHeart,
  FiMessageCircle,
  FiPlusSquare,
  FiLogIn,
  FiUserPlus,
} from "react-icons/fi";
import { navCategories, profileMenuItems } from "../../data/dummydata";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null); // For mobile dropdowns

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dropdownVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.95, pointerEvents: "none" },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      pointerEvents: "auto",
      transition: { duration: 0.4, type: "spring", bounce: 0.25 },
    },
    exit: {
      opacity: 0,
      y: 10,
      scale: 0.95,
      pointerEvents: "none",
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  const textColorClass = isScrolled ? "text-slate-900" : "text-slate-900";
  const bgColorClass = isScrolled
    ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
    : "bg-transparent";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${bgColorClass}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Location */}
          <div className="flex items-center gap-6">
            <a
              href="/"
              className={`flex flex-col justify-center ${textColorClass}`}
            >
              <span className="font-bold text-2xl tracking-tight leading-none">
                squareup<span className="text-indigo-500">.</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] opacity-80 mt-1">
                Properties
              </span>
            </a>

            <div
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-colors duration-300 ${isScrolled ? "border-gray-200 bg-gray-50" : "border-white/20 bg-white/10"}`}
            >
              <FiMapPin
                className={`w-4 h-4 text-indigo-600`}
              />
              <span className={`text-sm font-medium ${textColorClass}`}>
                Etawah
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navCategories.map((category, idx) => (
              <div
                key={idx}
                className="relative group h-20 flex items-center"
                onMouseEnter={() => setActiveDropdown(idx)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className={`flex items-center gap-1 text-[15px] font-medium transition-colors ${textColorClass}`}
                >
                  {category.title}
                  <FiChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === idx ? "rotate-180" : ""}`}
                  />
                </button>

                <div className="absolute bottom-6 left-0 w-full h-[2px] bg-indigo-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />

                <AnimatePresence>
                  {activeDropdown === idx && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-[70px] left-1/2 -translate-x-1/2 w-56 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 py-3 overflow-hidden"
                    >
                      {category.items.map((item, itemIdx) => (
                        <a
                          key={itemIdx}
                          href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                          className="block px-5 py-2.5 text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50/50 transition-colors"
                        >
                          {item}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-5">
            {/* Add Property Link disguised as a button */}
            <a
              href="/add-property"
              className="relative overflow-hidden group bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <span className="relative z-10 flex items-center gap-2">
                <FiPlusSquare className="w-4 h-4" />
                Post Property
              </span>
              <div className="absolute inset-0 h-full w-full bg-white/20 scale-x-0 group-hover:scale-x-100 transform origin-left transition-transform duration-500 ease-out" />
            </a>

            {/* Profile Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProfileOpen(true)}
              onMouseLeave={() => setProfileOpen(false)}
            >
              <button
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border ${isScrolled ? "border-gray-200 hover:bg-gray-50 text-gray-700" : "border-white/30 hover:bg-white/20 text-white"}`}
              >
                <FiUser className="w-5 h-5" />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-[45px] right-0 w-64 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 py-2 overflow-hidden"
                  >
                    {profileMenuItems.map((item, idx) => (
                      <React.Fragment key={idx}>
                        <a
                          href={item.path}
                          className={`flex items-center gap-3 px-5 py-3 text-sm transition-colors ${
                            ["Login", "Sign Up"].includes(item.label)
                              ? "font-semibold text-indigo-600 hover:bg-indigo-50"
                              : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
                          }`}
                        >
                          <item.icon className="w-4 h-4" />
                          {item.label}
                        </a>
                        {item.divider && (
                          <div className="h-px bg-gray-100 my-1 mx-4" />
                        )}
                      </React.Fragment>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`lg:hidden p-2 transition-colors ${textColorClass}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            className="lg:hidden absolute top-20 left-0 w-full bg-white shadow-xl overflow-y-auto border-t border-gray-100"
            style={{ height: "calc(100vh - 80px)" }}
          >
            <div className="p-6 flex flex-col gap-6">
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100">
                <FiMapPin className="w-5 h-5 text-indigo-600" />
                <span className="font-medium text-gray-800">Etawah</span>
              </div>

              <div className="flex flex-col gap-2">
                {navCategories.map((category, idx) => (
                  <div key={idx} className="flex flex-col">
                    {/* Category Header */}
                    <button
                      onClick={() =>
                        setOpenIndex(openIndex === idx ? null : idx)
                      }
                      className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold text-gray-400 uppercase tracking-wider"
                    >
                      <span>{category.title}</span>
                      {openIndex === idx ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </button>

                    {/* Dropdown Items */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openIndex === idx ? "max-h-60" : "max-h-0"
                      }`}
                    >
                      {category.items.map((item, itemIdx) => (
                        <a
                          key={itemIdx}
                          href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                          className="block px-4 py-3 text-base font-medium text-gray-800 hover:text-indigo-600 hover:bg-gray-50 rounded-xl transition-colors"
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="h-px bg-gray-100 my-2" />

              <div className="flex flex-col gap-1">
                {profileMenuItems.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      ["Login", "Sign Up"].includes(item.label)
                        ? "font-bold text-indigo-600 bg-indigo-50/50"
                        : "text-base font-medium text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </a>
                ))}
              </div>

              <a
                href="/add-property"
                className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-4 rounded-xl text-base font-semibold transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <FiPlusSquare className="w-5 h-5" />
                Post Property
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
