import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiMapPin, FiChevronDown, FiTarget } from "react-icons/fi";
import heroImg from "../../assets/hero.jpg";
import { Link } from "react-router-dom";

const searchSuggestions = [
  "Search property in Vijay Nagar",
  "Search property in Friends Colony",
  "Search property in Bharthana",
  "Search property in Jaswant Nagar",
  "Search property in Saifai",
];

const Hero = () => {
  const [activeTab, setActiveTab] = useState("Buy");
  const [searchValue, setSearchValue] = useState("");
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  // Cycle through search suggestions smoothly
  useEffect(() => {
    if (isFocused || searchValue) return;

    const interval = setInterval(() => {
      setSuggestionIndex((prev) => (prev + 1) % searchSuggestions.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isFocused, searchValue]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative w-full flex flex-col"
    >
      {/* 
        Hero Image Area 
        Set a fixed height to allow the search box to overlap the bottom edge
      */}
      <div className="relative w-full h-[30vh] min-h-[360px] overflow-hidden">
        {/* Replace the URL with your saved hero image */}
        <motion.div
          initial={{
            scale: 1.08,
          }}
          animate={{
            scale: 1,
          }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
          }}
          className="absolute inset-0 bg-cover bg-[center_30%] bg-no-repeat"
          style={{
            backgroundImage: `url(${heroImg})`,
          }}
        />
      </div>

      {/* 
        Overlapping Search Widget Layout 
        Positioned exactly like the reference screenshot
      */}
      <div className="relative z-20 w-full max-w-[1100px] mx-auto px-4 sm:px-6 -mt-16 mb-16">
        <motion.div
          initial={{
            opacity: 0,
            y: 60,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
            duration: 0.7,
            ease: "easeOut",
          }}
          className="bg-white rounded-[1.25rem] shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden flex flex-col"
        >
          {/* Top Row: Tabs & Post Property */}
          <div className="flex items-center justify-between px-2 sm:px-6 border-b border-gray-100 bg-white">
            {/* Tabs */}
            <div className="flex items-center gap-2 sm:gap-6 h-[60px] overflow-auto scrollbar-none">
              {["Buy", "Rent", "New Launch", "Commercial", "Plots/Land", "Projects"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative h-full px-4 text-[15px] font-semibold transition-colors duration-300 ${
                    activeTab === tab
                      ? "text-slate-900"
                      : "text-gray-500 hover:text-slate-900"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="tabUnderline"
                      className="absolute bottom-0 left-0 w-full h-[3px] bg-indigo-600 rounded-t-md"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Post Property Area (Right aligned) */}
            <div className="flex items-center gap-4 h-full">
              <div className="hidden sm:block w-px h-6 bg-gray-200" />
              <Link
                to="/add-property"
                className="flex items-center gap-2 px-2 text-[15px] font-medium text-gray-700 hover:text-indigo-600 transition-colors group"
              >
                Post Property
                <span className="bg-[#219653] text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider group-hover:bg-[#1e8a49] transition-colors">
                  Free
                </span>
              </Link>
            </div>
          </div>

          {/* Bottom Row: Search Input Area */}
          <div className="flex flex-col md:flex-row items-center p-3 sm:p-4 gap-3 bg-white">
            {/* Property Type Dropdown (Included to perfectly match the screenshot's layout structure) */}
            <button className="hidden md:flex items-center justify-between w-[200px] px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-200">
              All Residential
              <FiChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            <div className="hidden md:block w-px h-8 bg-gray-200" />

            {/* Search Input */}
            <div className="flex-1 flex items-center w-full px-2 sm:px-4 py-2 relative">
              <FiSearch className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />

              <div className="relative flex-1 flex items-center h-8">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="w-full h-full bg-transparent text-slate-800 text-[15px] font-medium focus:outline-none z-10"
                  aria-label="Search properties"
                />

                {/* Vertical Slider Animation for Placeholder */}
                {!searchValue && !isFocused && (
                  <div className="absolute inset-0 flex items-center pointer-events-none overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={suggestionIndex}
                        initial={{ y: 25, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -25, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="text-gray-400 text-[15px] truncate pr-4 w-full"
                      >
                        {searchSuggestions[suggestionIndex]}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center w-full md:w-auto gap-3 shrink-0">
              {/* Location Target Icon */}
              <button
                className="hidden md:flex items-center justify-center p-3 rounded-full bg-[#f0f4f8] text-indigo-600 hover:bg-indigo-100 transition-colors"
                aria-label="Use Current Location"
              >
                <FiTarget className="w-5 h-5" />
              </button>

              {/* Primary Search Button */}
              <button className="w-full md:w-[120px] bg-[#0066FF] hover:bg-[#0055D4] text-white px-6 py-3.5 rounded-xl text-[15px] font-semibold transition-colors flex items-center justify-center shadow-md active:scale-[0.98]">
                Search
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
