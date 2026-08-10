import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  FiMapPin,
  FiUser,
  FiChevronDown,
  FiHeart,
  FiPlusSquare,
  FiLogIn,
  FiUserPlus,
  FiGrid,
  FiLogOut,
  FiX,
} from 'react-icons/fi';
import { Calculator, PhoneCall, Layers } from 'lucide-react';
import Logo from '@/components/common/Logo';
import { navCategories } from '../../data/dummydata';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import { useLocationDetector } from '@/hooks/useLocationDetector';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileAuthOpen, setMobileAuthOpen] = useState(false);

  const location = useLocation();
  const { wishlistCount } = useWishlist();
  const { currentUser, logout } = useAuth();
  const { userCity, detectLocation } = useLocationDetector();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setProfileOpen(false);
    setActiveDropdown(null);
    setMoreDropdownOpen(false);
    setMobileAuthOpen(false);
  }, [location.pathname]);

  const dropdownVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.96, pointerEvents: 'none' },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      pointerEvents: 'auto',
      transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
      opacity: 0,
      y: 6,
      scale: 0.96,
      pointerEvents: 'none',
      transition: { duration: 0.15 },
    },
  };

  const headerClass = isScrolled
    ? 'bg-white/95 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-b border-slate-200/60 py-2.5 sm:py-3'
    : 'bg-white/85 backdrop-blur-lg border-b border-slate-100 py-3 sm:py-4';

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${headerClass}`}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between gap-2 sm:gap-4 lg:gap-6 h-12 sm:h-14 w-full">
          
          {/* Logo Component (Single transparent vector logo) */}
          <div className="flex items-center shrink-0">
            <Logo className="h-8 sm:h-10 xl:h-11 w-auto" />
          </div>

          {/* Mobile Right: Compact Location + Mobile Profile/Auth Button */}
          <div className="lg:hidden flex items-center gap-2 shrink-0">
            {/* Location Selector */}
            <button
              onClick={detectLocation}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-slate-200/80 bg-slate-50 text-[11px] sm:text-xs font-semibold text-slate-700 max-w-[125px] sm:max-w-[145px] truncate"
              title="Detect or change location"
            >
              <FiMapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span className="truncate">{userCity || 'Etawah'}</span>
            </button>

            {/* Mobile Profile / Auth Toggle Button */}
            <button
              onClick={() => setMobileAuthOpen(!mobileAuthOpen)}
              className="w-8 h-8 rounded-full border border-slate-200 bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200 transition-colors shrink-0 overflow-hidden"
              aria-label="User Account Menu"
            >
              {currentUser?.avatar ? (
                <img src={currentUser.avatar} alt="User Avatar" className="w-full h-full object-cover" />
              ) : (
                <FiUser className="w-4 h-4 text-slate-700" />
              )}
            </button>
          </div>

          {/* Desktop & Laptop Center Navigation */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-4 2xl:gap-6 flex-1 justify-center max-w-fit">
            <Link
              to="/properties"
              className={`text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors duration-200 shrink-0 ${
                location.pathname === '/properties'
                  ? 'text-indigo-600 font-bold'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              All Properties
            </Link>

            {/* Category Dropdowns */}
            {navCategories.map((category, idx) => (
              <div
                key={idx}
                className={`relative group py-2 flex items-center shrink-0 ${idx === 2 ? 'hidden xl:flex' : 'flex'}`}
                onMouseEnter={() => setActiveDropdown(idx)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className="flex items-center gap-1 text-xs xl:text-sm font-semibold text-slate-600 hover:text-slate-950 transition-colors duration-200 whitespace-nowrap"
                  aria-expanded={activeDropdown === idx}
                >
                  <span>{category.title}</span>
                  <FiChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-250 ${
                      activeDropdown === idx ? 'rotate-180 text-indigo-600' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {activeDropdown === idx && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-60 bg-white rounded-2xl shadow-[0_16px_40px_rgb(0,0,0,0.08)] border border-slate-100 py-3 overflow-hidden z-50"
                    >
                      <div className="px-4 pb-2 mb-2 border-b border-slate-100">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                          {category.title}
                        </span>
                      </div>
                      {category.items.map((item, itemIdx) => (
                        <Link
                          key={itemIdx}
                          to={item.path || '/properties'}
                          className="flex items-center justify-between px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/60 transition-colors"
                        >
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* Direct Links on 2XL Displays */}
            <Link
              to="/tools"
              className={`hidden 2xl:flex text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors duration-200 items-center gap-1.5 shrink-0 ${
                location.pathname === '/tools'
                  ? 'text-indigo-600 font-bold'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Tools</span>
            </Link>

            <Link
              to="/contact"
              className={`hidden 2xl:flex text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors duration-200 shrink-0 ${
                location.pathname === '/contact'
                  ? 'text-indigo-600 font-bold'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              Contact Us
            </Link>

            {/* 'More' Dropdown for Medium Laptops (1024px to 1535px) */}
            <div
              className="relative 2xl:hidden py-2 flex items-center shrink-0"
              onMouseEnter={() => setMoreDropdownOpen(true)}
              onMouseLeave={() => setMoreDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-xs xl:text-sm font-semibold text-slate-600 hover:text-slate-950 transition-colors">
                <span>More</span>
                <FiChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${moreDropdownOpen ? 'rotate-180 text-indigo-600' : ''}`} />
              </button>

              <AnimatePresence>
                {moreDropdownOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-white rounded-2xl shadow-[0_16px_40px_rgb(0,0,0,0.08)] border border-slate-100 py-3 overflow-hidden z-50"
                  >
                    <Link
                      to="/properties"
                      className="flex xl:hidden items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/50 transition-colors"
                    >
                      <Layers className="w-4 h-4 text-indigo-600" />
                      <span>For Dealers & Brokers</span>
                    </Link>
                    <Link
                      to="/tools"
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/50 transition-colors"
                    >
                      <Calculator className="w-4 h-4 text-indigo-600" />
                      <span>Property Tools</span>
                    </Link>
                    <Link
                      to="/contact"
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/50 transition-colors"
                    >
                      <PhoneCall className="w-4 h-4 text-indigo-600" />
                      <span>Contact Us</span>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
            
            {/* Desktop Location Pill */}
            <button
              onClick={detectLocation}
              className="hidden xl:flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-full border border-slate-200/80 bg-slate-50/80 text-xs font-semibold text-slate-600 hover:border-indigo-300 transition-colors shrink-0 max-w-[150px] truncate"
              title="Click to check your location"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <FiMapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span className="truncate">{userCity || 'Etawah'}</span>
            </button>

            {/* Wishlist Icon Button */}
            <Link
              to="/wishlist"
              className="relative p-2 xl:p-2.5 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100/80 transition-all duration-200 shrink-0"
              title="View Wishlist"
            >
              <FiHeart className="w-4.5 h-4.5 xl:w-5 xl:h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Profile Dropdown */}
            <div
              className="relative shrink-0"
              onMouseEnter={() => setProfileOpen(true)}
              onMouseLeave={() => setProfileOpen(false)}
            >
              <button
                className="w-9 h-9 xl:w-10 xl:h-10 rounded-full border border-slate-200 overflow-hidden flex items-center justify-center bg-slate-50 hover:border-slate-400 transition-all"
                aria-label="User Account"
              >
                {currentUser?.avatar ? (
                  <img src={currentUser.avatar} alt="User Avatar" className="w-full h-full object-cover" />
                ) : (
                  <FiUser className="w-4 h-4 xl:w-4.5 xl:h-4.5 text-slate-600" />
                )}
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-[0_16px_40px_rgb(0,0,0,0.08)] border border-slate-100 py-3 overflow-hidden z-50"
                  >
                    {currentUser ? (
                      <>
                        <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50">
                          <p className="text-xs font-extrabold text-slate-900 truncate">
                            {currentUser.firstName} {currentUser.lastName}
                          </p>
                          <p className="text-[11px] font-medium text-slate-400 truncate">{currentUser.email}</p>
                        </div>
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-3 px-5 py-2.5 text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/50 transition-colors"
                        >
                          <FiGrid className="w-4 h-4 text-slate-400" />
                          Partner Dashboard
                        </Link>
                        <Link
                          to="/profile"
                          className="flex items-center gap-3 px-5 py-2.5 text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/50 transition-colors"
                        >
                          <FiUser className="w-4 h-4 text-slate-400" />
                          Account Profile
                        </Link>
                        <div className="h-px bg-slate-100 my-1 mx-4" />
                        <button
                          onClick={logout}
                          className="w-full flex items-center gap-3 px-5 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors text-left"
                        >
                          <FiLogOut className="w-4 h-4 text-rose-500" />
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="flex items-center gap-3 px-5 py-3 text-xs font-bold text-indigo-600 hover:bg-indigo-50 transition-colors"
                        >
                          <FiLogIn className="w-4 h-4" />
                          Sign In
                        </Link>
                        <Link
                          to="/signup"
                          className="flex items-center gap-3 px-5 py-3 text-xs font-bold text-indigo-600 hover:bg-indigo-50 transition-colors"
                        >
                          <FiUserPlus className="w-4 h-4" />
                          Create Account
                        </Link>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="h-6 w-px bg-slate-200/80 mx-0.5 shrink-0" />

            {/* Standout Primary CTA */}
            <Link
              to="/add-property"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 xl:px-5 py-2 xl:py-2.5 rounded-full text-xs font-extrabold tracking-wide transition-all shadow-[0_4px_14px_rgba(79,70,229,0.35)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.45)] flex items-center gap-1.5 sm:gap-2 active:scale-95 shrink-0 flex-shrink-0 whitespace-nowrap"
            >
              <FiPlusSquare className="w-4 h-4 stroke-[2.2] shrink-0" />
              <span>Post Property</span>
            </Link>

          </div>

        </div>
      </div>

      {/* MOBILE AUTH & PROFILE SHEET MODAL (< 1024px) */}
      <AnimatePresence>
        {mobileAuthOpen && (
          <div className="lg:hidden fixed inset-0 z-[9990] bg-slate-900/60 backdrop-blur-sm flex items-start justify-end p-4 pt-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 relative overflow-hidden"
            >
              <button
                onClick={() => setMobileAuthOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1"
                aria-label="Close menu"
              >
                <FiX className="w-5 h-5" />
              </button>

              {currentUser ? (
                <div>
                  <div className="flex items-center gap-3.5 pb-4 mb-4 border-b border-slate-100">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.firstName}
                      className="w-12 h-12 rounded-full object-cover border border-slate-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-slate-900 truncate">
                        {currentUser.firstName} {currentUser.lastName}
                      </h4>
                      <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold text-slate-700 hover:text-indigo-600 bg-slate-50 hover:bg-indigo-50/50 transition-colors"
                    >
                      <FiGrid className="w-4 h-4 text-indigo-600" />
                      Partner Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold text-slate-700 hover:text-indigo-600 bg-slate-50 hover:bg-indigo-50/50 transition-colors"
                    >
                      <FiUser className="w-4 h-4 text-indigo-600" />
                      Account Profile
                    </Link>
                    <Link
                      to="/add-property"
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-extrabold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
                    >
                      <FiPlusSquare className="w-4 h-4" />
                      Post New Property
                    </Link>
                    <div className="h-px bg-slate-100 my-1" />
                    <button
                      onClick={logout}
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors w-full text-left"
                    >
                      <FiLogOut className="w-4 h-4 text-rose-500" />
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-center mb-6 pt-2">
                    <h3 className="text-lg font-extrabold text-slate-900 mb-1">Welcome to SquareUp</h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Sign in or create an account to post properties, track leads, and manage your saved wishlist.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Link
                      to="/login"
                      className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-2xl text-xs font-extrabold transition-all shadow-md"
                    >
                      <FiLogIn className="w-4 h-4" />
                      Sign In to Account
                    </Link>
                    <Link
                      to="/signup"
                      className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200 py-3 rounded-2xl text-xs font-bold transition-all"
                    >
                      <FiUserPlus className="w-4 h-4 text-indigo-600" />
                      Create New Account
                    </Link>
                    <div className="h-px bg-slate-100 my-1" />
                    <Link
                      to="/add-property"
                      className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-2xl text-xs font-extrabold transition-all"
                    >
                      <FiPlusSquare className="w-4 h-4" />
                      Post Property
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </header>
  );
};

export default Navbar;
