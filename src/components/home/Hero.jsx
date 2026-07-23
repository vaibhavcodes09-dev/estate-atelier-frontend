import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiMapPin } from 'react-icons/fi';
import { HiOutlineHomeModern } from 'react-icons/hi2';

const TABS = ['Buy', 'Rent', 'Commercial', 'New Projects'];

export default function Hero() {
  const [activeTab, setActiveTab] = useState('Buy');

  return (
    <section id="home" className="relative overflow-hidden bg-ink-50 pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-100 via-white to-white" />
      <div className="absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-brand-200/40 blur-[120px]" />
      <div className="absolute -left-40 top-40 h-[400px] w-[400px] rounded-full bg-ink-200/50 blur-[100px]" />

      <div className="container-px relative grid gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        {/* Left */}
        <div className="flex flex-col justify-center gap-6">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow w-fit"
          >
            <HiOutlineHomeModern className="h-4 w-4 text-brand-500" />
            India's #1 Property Advisory
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold leading-[1.05] text-ink-900 sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            Find a place<br />
            you'll love to<br />
            <span className="relative">
              call home.
              <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 300 12" fill="none">
                <path d="M2 9C50 3 150 3 298 9" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-lg text-lg leading-relaxed text-ink-500"
          >
            Discover verified residential, commercial, and luxury properties across India's top cities — backed by expert advisory, legal due diligence, and seamless financing.
          </motion.p>

          {/* Search Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="card-surface mt-2 p-2 sm:p-3"
          >
            <div className="mb-3 flex gap-2 px-2 pt-2">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    activeTab === tab ? 'bg-ink-900 text-white' : 'text-ink-500 hover:bg-ink-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative flex-1">
                <FiMapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" />
                <input
                  type="text"
                  placeholder="Enter city, locality, or project name"
                  className="w-full rounded-xl border border-ink-200 bg-ink-50/50 py-3.5 pl-12 pr-4 text-sm text-ink-800 placeholder-ink-400 outline-none transition focus:border-ink-900 focus:bg-white"
                />
              </div>
              <button className="btn-accent sm:px-8">
                <FiSearch className="h-5 w-5" /> Search
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-x-8 gap-y-2 pt-2 text-sm text-ink-500"
          >
            <span>Trusted by <strong className="text-ink-900">2,50,000+</strong> buyers</span>
            <span className="hidden h-4 w-px bg-ink-200 sm:block" />
            <span><strong className="text-ink-900">47-point</strong> legal verification</span>
          </motion.div>
        </div>

        {/* Right - Image collage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative h-full min-h-[480px]">
            <div className="absolute right-0 top-0 h-72 w-64 overflow-hidden rounded-3xl shadow-card">
              <img src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Luxury home" className="h-full w-full object-cover" />
            </div>
            <div className="absolute bottom-0 left-0 h-64 w-56 overflow-hidden rounded-3xl shadow-card">
              <img src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Modern apartment" className="h-full w-full object-cover" />
            </div>
            {/* Floating card */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-24 right-8 w-56 rounded-2xl bg-white/90 p-4 shadow-card backdrop-blur"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-500">Avg. Price</span>
                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">+6.2%</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-ink-900">₹2.1 Cr</p>
              <p className="text-sm text-ink-500">Mumbai premium homes</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
