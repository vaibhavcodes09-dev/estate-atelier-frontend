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
  FiX,
  FiHome,
} from 'react-icons/fi';
import squareupLogo from '@/assets/squareup-logo.jpg';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Overview', icon: FiGrid },
  { to: '/add-property', label: 'Add Property', icon: FiPlusSquare },
  { to: '/wishlist', label: 'Wishlist', icon: FiHeart },
  { to: '/profile', label: 'Profile', icon: FiUser },
];

export default function DashboardLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { currentUser } = useAuth();
  const { wishlistCount } = useWishlist();

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
      <aside className="hidden lg:flex w-[280px] shrink-0 flex-col border-r border-slate-200/80 bg-white relative z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        {/* Logo Area */}
        <div className="flex h-20 items-center px-6 border-b border-slate-100">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={squareupLogo}
              alt="SquareUp Logo"
              className="h-9 w-auto object-contain rounded-lg shadow-sm"
            />
            <div className="flex flex-col justify-center">
              <span className="font-extrabold text-xl tracking-tight leading-none text-slate-900">
                SquareUp<span className="text-indigo-600">.</span>
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 mt-1">
                Partner Hub
              </span>
            </div>
          </Link>
        </div>

        {/* User Card */}
        {currentUser && (
          <div className="p-4 mx-4 mt-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.firstName}
              className="w-10 h-10 rounded-full object-cover border border-white shadow-sm shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-bold text-slate-900 truncate">
                {currentUser.firstName} {currentUser.lastName}
              </h4>
              <p className="text-[11px] font-semibold text-indigo-600 truncate">{currentUser.role}</p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex flex-1 flex-col gap-1.5 px-4 py-6 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.to;
            const isWishlist = item.to === '/wishlist';
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative flex items-center justify-between px-4 py-3.5 rounded-2xl text-[15px] font-semibold transition-colors duration-200 group ${
                  isActive ? 'text-indigo-600' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="desktop-active-nav"
                    className="absolute inset-0 bg-indigo-50/80 rounded-2xl -z-10 border border-indigo-100/50"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <div className="flex items-center gap-3.5">
                  <item.icon
                    className={`w-5 h-5 transition-colors ${
                      isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-indigo-500'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {isWishlist && wishlistCount > 0 && (
                  <span className="bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-white hover:text-indigo-600 hover:shadow-sm border border-transparent hover:border-slate-200 transition-all"
          >
            <FiHome className="h-4 w-4" />
            Back to Main Site
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col h-full overflow-hidden relative w-full">
        
        {/* Mobile Header */}
        <header className="lg:hidden flex h-20 shrink-0 items-center justify-between border-b border-slate-200 bg-white/90 backdrop-blur-md px-4 sm:px-6 z-40">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={squareupLogo} alt="SquareUp" className="h-8 w-auto rounded-md" />
            <span className="font-extrabold text-xl tracking-tight leading-none text-slate-900">
              SquareUp<span className="text-indigo-600">.</span>
            </span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 -mr-2 text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </header>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden absolute top-20 left-0 w-full bg-white shadow-2xl border-b border-slate-100 z-30 flex flex-col"
              style={{ maxHeight: 'calc(100vh - 80px)' }}
            >
              <nav className="flex flex-col gap-1 p-4 overflow-y-auto">
                {NAV_ITEMS.map((item) => {
                  const isActive = location.pathname === item.to;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`flex items-center justify-between px-5 py-4 rounded-2xl text-[15px] font-semibold transition-colors ${
                        isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <item.icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                        {item.label}
                      </div>
                      {item.to === '/wishlist' && wishlistCount > 0 && (
                        <span className="bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                          {wishlistCount}
                        </span>
                      )}
                    </Link>
                  );
                })}
                <div className="h-px bg-slate-100 my-2 mx-2" />
                <Link
                  to="/"
                  className="flex items-center justify-center gap-2 mt-2 w-full rounded-2xl px-5 py-4 text-[15px] font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <FiHome className="h-5 w-5" />
                  Back to Main Site
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