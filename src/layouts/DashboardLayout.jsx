import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiGrid,
  FiPlusSquare,
  FiHeart,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX
} from 'react-icons/fi';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Overview', icon: FiGrid },
  { to: '/add-property', label: 'Add Property', icon: FiPlusSquare },
  { to: '/wishlist', label: 'Wishlist', icon: FiHeart },
  { to: '/profile', label: 'Profile', icon: FiUser },
];

export default function DashboardLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-[280px] shrink-0 flex-col border-r border-gray-200 bg-white relative z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        {/* Logo Area */}
        <div className="flex h-24 items-center px-8 border-b border-gray-100">
          <Link to="/" className="flex flex-col justify-center text-slate-900 transition-opacity hover:opacity-80">
            <span className="font-bold text-2xl tracking-tight leading-none">
              squareup<span className="text-indigo-600">.</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] opacity-60 mt-1 font-semibold">
              Partner Hub
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col gap-2 px-4 py-6 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-[15px] font-medium transition-colors duration-300 group ${
                  isActive 
                    ? 'text-indigo-700' 
                    : 'text-gray-500 hover:text-slate-900 hover:bg-gray-50'
                }`}
              >
                {/* Smooth Active Indicator Background */}
                {isActive && (
                  <motion.div
                    layoutId="desktop-active-nav"
                    className="absolute inset-0 bg-indigo-50/80 rounded-2xl -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <item.icon className={`w-5 h-5 transition-colors duration-300 ${
                  isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-500'
                }`} />
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full rounded-2xl px-4 py-3.5 text-sm font-semibold text-gray-600 transition-all hover:bg-white hover:text-slate-900 hover:shadow-sm border border-transparent hover:border-gray-200"
          >
            <FiLogOut className="h-4 w-4" />
            Back to Main Site
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col h-full overflow-hidden relative w-full">
        
        {/* Mobile Header */}
        <header className="lg:hidden flex h-20 shrink-0 items-center justify-between border-b border-gray-200 bg-white/90 backdrop-blur-md px-4 sm:px-6 z-40">
          <Link to="/" className="flex flex-col justify-center text-slate-900">
            <span className="font-bold text-xl tracking-tight leading-none">
              squareup<span className="text-indigo-600">.</span>
            </span>
          </Link>
          
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 -mr-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </header>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden absolute top-20 left-0 w-full bg-white shadow-2xl border-b border-gray-100 z-30 flex flex-col"
              style={{ maxHeight: 'calc(100vh - 80px)' }}
            >
              <nav className="flex flex-col gap-1 p-4 overflow-y-auto">
                {NAV_ITEMS.map((item) => {
                  const isActive = location.pathname === item.to;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-[15px] font-semibold transition-colors ${
                        isActive
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <item.icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
                      {item.label}
                    </Link>
                  );
                })}
                <div className="h-px bg-gray-100 my-2 mx-2" />
                <Link
                  to="/"
                  className="flex items-center justify-center gap-2 mt-2 w-full rounded-2xl px-5 py-4 text-[15px] font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <FiLogOut className="h-5 w-5" />
                  Exit Dashboard
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dashboard Content Outlet */}
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC]">
          <div className="max-w-[1200px] mx-auto w-full p-4 sm:p-6 lg:p-8 pb-24">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}