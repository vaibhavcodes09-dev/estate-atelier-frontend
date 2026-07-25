import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiChevronDown,
  FiMenu,
  FiX,
  FiSearch,
  FiBell,
  FiUser,
  FiHome,
  FiBriefcase,
  FiTrendingUp,
  FiLayers,
  FiHelpCircle,
  FiLogOut,
} from "react-icons/fi";

// Navigation menu structure with rich dropdown children
const NAV_MENU = [
  {
    label: "Properties",
    key: "properties",
    children: [
      {
        label: "All Listings",
        desc: "Browse managed residential & commercial units",
        href: "/listings",
        icon: FiHome,
      },
      {
        label: "Portfolio Analytics",
        desc: "Performance metrics and rental yields",
        href: "/analytics",
        icon: FiTrendingUp,
      },
    ],
  },
  {
    label: "Services",
    key: "services",
    children: [
      {
        label: "Asset Management",
        desc: "Full-suite property oversight",
        href: "/services/asset-management",
        icon: FiBriefcase,
      },
      {
        label: "Valuation & Advisory",
        desc: "Market appraisals and deal structuring",
        href: "/services/advisory",
        icon: FiLayers,
      },
    ],
  },
  {
    label: "Marketplace",
    href: "/marketplace",
  },
];

export default function AppNavbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const navRef = useRef(null);
  const location = useLocation();

  // Reset dropdowns when navigating to a new route
  useEffect(() => {
    setActiveDropdown(null);
    setProfileOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  // Click outside handler to close open menus
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-50 h-16 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md"
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Side: Logo & Main Navigation */}
        <div className="flex items-center gap-6 xl:gap-8">
          <Link to="/dashboard" className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-600 font-semibold text-sm text-white">
              EA
            </span>
            <span className="text-base font-bold tracking-tight text-slate-900">
              Estate<span className="text-indigo-600">Atelier</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_MENU.map((item) => {
              if (item.children) {
                const isOpen = activeDropdown === item.key;
                return (
                  <div key={item.key} className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveDropdown(isOpen ? null : item.key)
                      }
                      className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition ${
                        isOpen
                          ? "bg-slate-100 text-indigo-600"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      {item.label}
                      <FiChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-indigo-600" : ""
                        }`}
                      />
                    </button>

                    {/* Submenu Dropdown Panel */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 mt-2 w-72 rounded-xl border border-slate-200 bg-white p-2 shadow-lg ring-1 ring-black/5"
                        >
                          {item.children.map((child) => {
                            const Icon = child.icon;
                            return (
                              <Link
                                key={child.href}
                                to={child.href}
                                className="flex items-start gap-3 rounded-lg p-2.5 transition hover:bg-slate-50"
                              >
                                <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-md bg-indigo-50 text-indigo-600">
                                  <Icon className="h-4 w-4" />
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-slate-900">
                                    {child.label}
                                  </div>
                                  <p className="text-xs text-slate-500">
                                    {child.desc}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Side: Global Search, Notifications & User Menu */}
        <div className="hidden items-center gap-2 sm:flex">
          {/* Global Quick Search Button */}
          <button
            type="button"
            className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-400 hover:border-slate-300 hover:text-slate-600 md:flex"
          >
            <FiSearch className="h-3.5 w-3.5" />
            <span>Search app...</span>
            <kbd className="rounded border border-slate-200 bg-white px-1 py-0.5 text-[10px] font-semibold text-slate-500">
              ⌘K
            </kbd>
          </button>

          {/* Notifications Button */}
          <button
            type="button"
            className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            aria-label="View notifications"
          >
            <FiBell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-indigo-600 ring-2 ring-white" />
          </button>

          <div className="mx-1 h-5 w-[1px] bg-slate-200" />

          {/* Profile Menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 rounded-full p-1 transition hover:bg-slate-100"
            >
              <div className="grid h-8 w-8 place-items-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                JD
              </div>
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg ring-1 ring-black/5"
                >
                  <div className="border-b border-slate-100 px-3 py-2">
                    <p className="text-sm font-semibold text-slate-900">
                      John Doe
                    </p>
                    <p className="text-xs text-slate-500">
                      john@estateatelier.com
                    </p>
                  </div>
                  <div className="py-1">
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                    >
                      <FiUser className="h-3.5 w-3.5 text-slate-500" />
                      Account Settings
                    </Link>
                    <Link
                      to="/help"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                    >
                      <FiHelpCircle className="h-3.5 w-3.5 text-slate-500" />
                      Help & Support
                    </Link>
                  </div>
                  <div className="border-t border-slate-100 pt-1">
                    <button
                      type="button"
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50"
                    >
                      <FiLogOut className="h-3.5 w-3.5 text-red-500" />
                      Sign out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile/Tablet Menu Button */}
        <div className="flex items-center lg:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? (
              <FiX className="h-5 w-5" />
            ) : (
              <FiMenu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Accordion Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-slate-200 bg-white px-4 pb-6 pt-2 lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {NAV_MENU.map((item) => {
                if (item.children) {
                  const isExpanded = mobileExpanded === item.key;
                  return (
                    <div key={item.key} className="flex flex-col">
                      <button
                        type="button"
                        onClick={() =>
                          setMobileExpanded(isExpanded ? null : item.key)
                        }
                        className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                      >
                        {item.label}
                        <FiChevronDown
                          className={`h-4 w-4 transition-transform ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isExpanded && (
                        <div className="ml-3 flex flex-col border-l border-slate-200 pl-3">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              to={child.href}
                              className="py-2 text-sm font-medium text-slate-600 hover:text-slate-900"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Account Details */}
            <div className="mt-4 border-t border-slate-100 pt-4">
              <div className="flex items-center gap-3 px-3 py-2">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                  JD
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    John Doe
                  </p>
                  <p className="text-xs text-slate-500">
                    john@estateatelier.com
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
