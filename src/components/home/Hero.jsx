import { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiMapPin } from "react-icons/fi";
import { HiOutlineHomeModern } from "react-icons/hi2";
import HeroCarousel from "./HeroCarousel";

const TABS = ["Buy", "Rent", "Commercial", "New Projects"];

export default function Hero() {
  const [activeTab, setActiveTab] = useState("Buy");

  return (
    <section id="home" className="relative overflow-hidden bg-ink-50 pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-100 via-white to-white" />
      <div className="absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-brand-200/40 blur-[120px]" />
      <div className="absolute -left-40 top-40 h-[400px] w-[400px] rounded-full bg-ink-200/50 blur-[100px]" />

      <div className="container-px relative grid gap-10 py-14 lg:grid-cols-[0.7fr_0.3fr] lg:py-16">
        {/* Left */}
        <div className="flex flex-col justify-center mt-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-2 sm:p-3"
          >
          <div className="text-3xl">
            "Your Corner, On Your Terms"
            <p><b>#MySpaceMyRules</b></p>
          </div>
          </motion.div>
          {/* Search Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="card-surface p-2 sm:p-3"
          >
            <div className="mb-3 flex gap-2 px-2 pt-2">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    activeTab === tab
                      ? "bg-ink-900 text-white"
                      : "text-ink-500 hover:bg-ink-50"
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
            <span>
              Trusted by <strong className="text-ink-900">2,50,000+</strong>{" "}
              buyers
            </span>
            <span className="hidden h-4 w-px bg-ink-200 sm:block" />
            <span>
              <strong className="text-ink-900">47-point</strong> legal
              verification
            </span>
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow w-fit"
          >
            <HiOutlineHomeModern className="h-4 w-4 text-brand-500" />
            India's #1 Property Advisory
          </motion.span>
        </div>

        {/* Right - Image collage */}
        <HeroCarousel />
      </div>
    </section>
  );
}
