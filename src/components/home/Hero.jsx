import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Home, Clock, Users, ChevronRight } from 'lucide-react';
import { FiSearch, FiChevronDown, FiPlusSquare } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

import heroImg from '../../assets/hero.avif';
import { searchSuggestions } from '../../data/dummydata';

const Hero = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Buy');
  const [searchValue, setSearchValue] = useState('');
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

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (searchValue.trim()) {
      params.set('q', searchValue.trim());
    }

    params.set('purpose', activeTab.toLowerCase());

    navigate(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative pt-24 min-h-screen overflow-hidden flex flex-col justify-center bg-slate-900">
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-cover bg-center lg:bg-[center_35%] opacity-35"
        style={{
          backgroundImage: `url(${heroImg})`,
        }}
      />

      {/* Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full min-h-[calc(100vh-6rem)] flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mb-10"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-400/30 bg-indigo-500/10 backdrop-blur-md mb-4"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              SquareUp Real Estate Platform
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-slate-100 text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight mb-6"
          >
            Find a Place That <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-300 to-cyan-300">
              Feels Like Home.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal max-w-xl"
          >
            Explore verified luxury villas, modern apartments, and prime commercial plots across Etawah and top region hubs with transparent pricing.
          </motion.p>
        </motion.div>

        {/* Search Card */}
        <div className="relative z-20 w-full max-w-[900px]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
            className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.25)] border border-slate-100 overflow-hidden flex flex-col p-2"
          >
            {/* Top Row: Purpose Tabs */}
            <div className="flex items-center justify-between px-3 sm:px-4 border-b border-slate-100 bg-white">
              <div className="flex items-center gap-2 sm:gap-6 h-[54px] overflow-x-auto no-scrollbar">
                {['Buy', 'Rent', 'Commercial', 'Plots/Land'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative h-full px-3.5 text-sm font-bold transition-colors ${
                      activeTab === tab ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div
                        layoutId="tabUnderline"
                        className="absolute bottom-0 left-0 w-full h-[3px] bg-indigo-600 rounded-t-md"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                  </button>
                ))}
              </div>

              <Link
                to="/add-property"
                className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-full transition-colors"
              >
                <FiPlusSquare className="w-3.5 h-3.5" /> List Property
              </Link>
            </div>

            {/* Search Input Bar */}
            <div className="flex flex-col md:flex-row items-center p-2 sm:p-3 gap-2 bg-white">
              <div className="flex-1 flex items-center w-full px-3 py-2 bg-slate-50 rounded-2xl border border-slate-100 relative">
                <FiSearch className="w-5 h-5 text-slate-400 mr-3 shrink-0" />

                <div className="relative flex-1 flex items-center h-10">
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSearch();
                    }}
                    placeholder={isFocused ? 'Type city, landmark, or property title...' : ''}
                    className="w-full h-full bg-transparent text-slate-900 text-sm font-semibold focus:outline-none z-10"
                    aria-label="Search properties"
                  />

                  {/* Animated Placeholder */}
                  {!searchValue && !isFocused && (
                    <div className="absolute inset-0 flex items-center pointer-events-none overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={suggestionIndex}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          transition={{ duration: 0.4, ease: 'easeOut' }}
                          className="text-slate-400 text-sm font-medium truncate w-full"
                        >
                          {searchSuggestions[suggestionIndex]}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              </div>

              {/* Primary Search Button */}
              <button
                onClick={handleSearch}
                className="w-full md:w-[140px] bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 px-6 rounded-2xl text-sm font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
              >
                Search
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/15 p-6 lg:p-8 w-full max-w-[850px] relative z-20 grid grid-cols-2 md:grid-cols-4 gap-6 mt-8"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-white/10 rounded-2xl text-indigo-400 shrink-0">
              <Home className="w-6 h-6" strokeWidth={1.75} />
            </div>
            <div>
              <div className="text-white font-extrabold text-xl sm:text-2xl tracking-tight">1,200+</div>
              <div className="text-slate-300 text-xs font-medium">Verified Listings</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-white/10 rounded-2xl text-indigo-400 shrink-0">
              <MapPin className="w-6 h-6" strokeWidth={1.75} />
            </div>
            <div>
              <div className="text-white font-extrabold text-xl sm:text-2xl tracking-tight">15+</div>
              <div className="text-slate-300 text-xs font-medium">Cities & Hubs</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-white/10 rounded-2xl text-indigo-400 shrink-0">
              <Users className="w-6 h-6" strokeWidth={1.75} />
            </div>
            <div>
              <div className="text-white font-extrabold text-xl sm:text-2xl tracking-tight">98%</div>
              <div className="text-slate-300 text-xs font-medium">Client Satisfaction</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-white/10 rounded-2xl text-indigo-400 shrink-0">
              <Clock className="w-6 h-6" strokeWidth={1.75} />
            </div>
            <div>
              <div className="text-white font-extrabold text-xl sm:text-2xl tracking-tight">24/7</div>
              <div className="text-slate-300 text-xs font-medium">Partner Support</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
