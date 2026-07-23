import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiPhone } from "react-icons/fi";
import { NAV_LINKS } from "@/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-xl shadow-soft" : "bg-transparent"
      }`}
    >
      <nav className="container-px flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-4">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-ink-900 text-white">
            <span className="font-display text-lg font-bold">EA</span>
          </span>
          <span
            className={`font-display text-xl font-bold ${scrolled ? "text-ink-900" : "text-ink-900"}`}
          >
            Estate<span className="text-brand-500">Atelier</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-sm font-medium text-ink-600 transition hover:text-ink-900"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="tel:+910000000000"
            className="flex items-center gap-2 text-sm  font-medium text-ink-700"
          >
            <FiPhone className="h-4 w-4" /> +91 90000 00000
          </a>
          <Link to="/contact" className="btn-accent">
            Book Consultation
          </Link>
          <Link to="/login" className="btn-accent">
            Login / Sign Up
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="grid h-10 w-10 place-items-center rounded-xl bg-ink-900 text-white lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-white lg:hidden"
          >
            <div className="container-px flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm text-center font-medium text-ink-700 hover:bg-ink-50"
                >
                  {link.label}
                </Link>
              ))}

              <Link
                to="/signup"
                onClick={() => setOpen(false)}
                className="btn-accent mt-2"
              >
                Sign Up / Log In
              </Link>
              <a
                href="tel:+910000000000"
                className="btn-accent mt-2"
              >
                <FiPhone className="h-4 w-4" /> +91 90000 00000
              </a>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="btn-accent mt-2"
              >
                Book Consultation
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
