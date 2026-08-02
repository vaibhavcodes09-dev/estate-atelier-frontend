import React, { useState, useEffect } from "react";
import { motion, AnimatePresence  } from "framer-motion";
import { MapPin, ChevronDown, Home, Clock, Users } from "lucide-react";
import { FiSearch, FiMapPin, FiChevronDown, FiTarget } from "react-icons/fi";
import { Link } from "react-router-dom";

import heroImg from "../../assets/hero.avif";
import { searchSuggestions } from "../../data/dummydata";

const RealEstateHero = () => {
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

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <section className="relative pt-14 min-h-screen overflow-hidden">
      {/* Background */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-cover bg-center lg:bg-[center_35%]"
        style={{
          backgroundImage: `url(${heroImg})`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0  " />

      {/* Content */}
      <div className="relative z-10 container mx-auto min-h-screen flex flex-col justify-center px-6 lg:px-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mb-14"
        >
          <motion.h4
            variants={fadeInUp}
            className="text-[#EF3642] font-bold tracking-widest uppercase text-xs mt-2"
          >
            Find a place that
          </motion.h4>

          <motion.h1
            variants={fadeInUp}
            className="text-[#0E2248] text-5xl lg:text-7xl font-extrabold leading-tight mb-6"
          >
            Feels Like
            <br />
            <span className="text-[#EF3642]">Home,</span> Truly.
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-[#0E2248] text-lg leading-relaxed"
          >
            Premium properties.
            <br />
            Honest deals. Happy clients.
          </motion.p>
        </motion.div>

        {/* Search Card */}

        <div className="relative z-20 w-full max-w-[900px]">
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
              <div className="flex items-center gap-2 sm:gap-6 h-[60px] overflow-x-scroll no-scrollbar">
                {[
                  "Buy",
                  "Rent",
                  "Commercial",
                  "Plots/Land",
                ].map((tab) => (
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
                          transition={{
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1],
                          }}
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
                {/* Primary Search Button */}
                <button className="w-full md:w-[120px] bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-xl text-[15px] font-semibold transition-colors flex items-center justify-center shadow-md active:scale-[0.98]">
                  Search
                </button>
              </div>
            </div>
          </motion.div>
        </div>
        {/* Stats Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="bg-gradient-to-r from-white to-transparent rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] py-7 px-8 lg:px-10 w-full max-w-[850px] relative z-20 flex flex-wrap lg:flex-nowrap justify-between items-center mt-1 gap-6 lg:gap-0"
          >
            <div className="flex items-center gap-4">
              <div className="text-gray-400">
                <Home size={28} strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-[#0B1D35] font-bold text-xl">500+</div>
                <div className="text-gray-400 text-xs font-medium">Verified Properties</div>
              </div>
            </div>

            <div className="hidden lg:block w-px h-10 bg-gray-100"></div>

            <div className="flex items-center gap-4">
              <div className="text-gray-400">
                <MapPin size={28} strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-[#0B1D35] font-bold text-xl">20+</div>
                <div className="text-gray-400 text-xs font-medium">Cities Covered</div>
              </div>
            </div>

            <div className="hidden lg:block w-px h-10 bg-gray-100"></div>

            <div className="flex items-center gap-4">
              <div className="text-gray-400">
                <Users size={28} strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-[#0B1D35] font-bold text-xl">98%</div>
                <div className="text-gray-400 text-xs font-medium">Happy Clients</div>
              </div>
            </div>

            <div className="hidden lg:block w-px h-10 bg-gray-100"></div>

            <div className="flex items-center gap-4">
              <div className="text-gray-400">
                <Clock size={28} strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-[#0B1D35] font-bold text-xl">24/7</div>
                <div className="text-gray-400 text-xs font-medium">Expert Support</div>
              </div>
            </div>
          </motion.div>
      </div>
    </section>
  );
};

export default RealEstateHero;
