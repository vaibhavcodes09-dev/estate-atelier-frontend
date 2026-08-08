import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  FiMapPin,
  FiUser,
  FiMenu,
  FiX,
  FiChevronDown,
  FiHeart,
  FiPlusSquare,
  FiLogIn,
  FiUserPlus,
  FiGrid,
  FiLogOut,
} from 'react-icons/fi';
import { ChevronDown, ChevronUp } from 'lucide-react';
import squareupLogo from '../../assets/squareup-logo.jpg';
import { navCategories } from '../../data/dummydata';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const location = useLocation();
  const { wishlistCount } = useWishlist();
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const dropdownVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.96, pointerEvents: 'none' },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      pointerEvents: 'auto',
      transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
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
    ? 'bg-white/90 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-b border-slate-200/60 py-3'
    : 'bg-white/80 backdrop-blur-lg border-b border-slate-100 py-4.5';

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${headerClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-14">
          
          {/* Group 1: Brand & Location (Spacious & Clean) */}
          <div className="flex items-center gap-6 shrink-0">
            <Link to="/" className="flex items-center gap-3.5 group">
              <img
                src={squareupLogo}
                alt="SquareUp Logo"
                className="h-10 w-auto object-contain rounded-xl shadow-sm transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col justify-center">
                <span className="font-extrabold text-2xl tracking-tight leading-none text-slate-950">
                  SquareUp<span className="text-indigo-600">.</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400 mt-1">
                  Real Estate
                </span>
              </div>
            </Link>

            <div className="hidden xl:flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200/70 bg-slate-50/80 text-xs font-semibold text-slate-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <FiMapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span>Etawah & NCR</span>
            </div>
          </div>

          {/* Group 2: Center Navigation Options (Refined typography & spacing) */}
          <nav className="hidden lg:flex items-center gap-9">
            <Link
              to="/properties"
              className={`text-sm font-semibold transition-colors duration-200 ${
                location.pathname === '/properties'
                  ? 'text-indigo-600 font-bold'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              All Properties
            </Link>

            {navCategories.map((category, idx) => (
              <div
                key={idx}
                className="relative group py-2 flex items-center"
                onMouseEnter={() => setActiveDropdown(idx)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-950 transition-colors duration-200"
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
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-2xl shadow-[0_16px_40px_rgb(0,0,0,0.08)] border border-slate-100 py-3.5 overflow-hidden z-50"
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

            <Link
              to="/contact"
              className={`text-sm font-semibold transition-colors duration-200 ${
                location.pathname === '/contact'
                  ? 'text-indigo-600 font-bold'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Group 3: Right Actions (Quiet secondary actions + Standout primary CTA) */}
          <div className="hidden lg:flex items-center gap-3.5 shrink-0">
            
            {/* Secondary Action 1: Wishlist (Quiet icon button with indicator) */}
            <Link
              to="/wishlist"
              className="relative p-2.5 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100/80 transition-all duration-200"
              title="View Wishlist"
            >
              <FiHeart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Secondary Action 2: User Profile (Quiet icon avatar dropdown) */}
            <div
              className="relative"
              onMouseEnter={() => setProfileOpen(true)}
              onMouseLeave={() => setProfileOpen(false)}
            >
              <button
                className="w-10 h-10 rounded-full border border-slate-200 overflow-hidden flex items-center justify-center bg-slate-50 hover:border-slate-400 transition-all"
                aria-label="User Account"
              >
                {currentUser?.avatar ? (
                  <img src={currentUser.avatar} alt="User Avatar" className="w-full h-full object-cover" />
                ) : (
                  <FiUser className="w-4.5 h-4.5 text-slate-600" />
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

            {/* Separator */}
            <div className="h-6 w-px bg-slate-200/80 mx-1" />

            {/* PRIMARY ACTION: Standout High-Contrast Pill CTA */}
            <Link
              to="/add-property"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-full text-xs font-extrabold tracking-wide transition-all shadow-[0_4px_14px_rgba(79,70,229,0.35)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.45)] flex items-center gap-2 active:scale-95 shrink-0"
            >
              <FiPlusSquare className="w-4 h-4 stroke-[2.2]" />
              Post Property
            </Link>

          </div>

          {/* Mobile Menu Controls */}
          <div className="flex items-center gap-3 lg:hidden shrink-0">
            <Link to="/wishlist" className="relative p-2 text-slate-700">
              <FiHeart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-rose-500 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button
              className="p-2 text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ y: -15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -15, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-slate-100 overflow-y-auto"
            style={{ height: 'calc(100vh - 72px)' }}
          >
            <div className="p-6 flex flex-col gap-6">
              
              <div className="flex flex-col gap-1">
                <Link
                  to="/properties"
                  className="px-4 py-3 text-sm font-bold text-slate-900 hover:bg-slate-50 rounded-xl"
                >
                  All Properties
                </Link>

                {navCategories.map((category, idx) => (
                  <div key={idx} className="flex flex-col">
                    <button
                      onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                      className="w-full flex items-center justify-between px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider"
                    >
                      <span>{category.title}</span>
                      {openIndex === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>

                    <div className={`overflow-hidden transition-all ${openIndex === idx ? 'max-h-60' : 'max-h-0'}`}>
                      {category.items.map((item, itemIdx) => (
                        <Link
                          key={itemIdx}
                          to={item.path || '/properties'}
                          className="block px-6 py-2.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-xl"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}

                <Link
                  to="/contact"
                  className="px-4 py-3 text-sm font-bold text-slate-900 hover:bg-slate-50 rounded-xl"
                >
                  Contact Us
                </Link>
              </div>

              <div className="h-px bg-slate-100 my-1" />

              <div className="flex flex-col gap-2">
                {currentUser ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-slate-900 bg-slate-50"
                    >
                      <FiGrid className="w-4.5 h-4.5 text-indigo-600" />
                      Partner Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <FiUser className="w-4.5 h-4.5 text-slate-500" />
                      Account Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm text-rose-600 hover:bg-rose-50 text-left"
                    >
                      <FiLogOut className="w-4.5 h-4.5" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      to="/login"
                      className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs text-indigo-600 bg-indigo-50"
                    >
                      <FiLogIn className="w-4 h-4" /> Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs text-white bg-indigo-600"
                    >
                      <FiUserPlus className="w-4 h-4" /> Sign Up
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/add-property"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-4 rounded-2xl text-sm font-extrabold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
              >
                <FiPlusSquare className="w-5 h-5" />
                Post Property
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
