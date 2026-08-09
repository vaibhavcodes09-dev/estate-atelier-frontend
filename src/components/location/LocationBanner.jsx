import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, Globe, Sparkles, ArrowRight, X, Compass } from 'lucide-react';
import { useLocationDetector } from '@/hooks/useLocationDetector';

export default function LocationBanner() {
  const navigate = useNavigate();
  const { status, userCity, isSupported, enableEtawahOverride, detectLocation } = useLocationDetector();
  const [dismissed, setDismissed] = useState(false);

  // If user is supported, override active, or banner dismissed, don't show the coming soon modal
  if (isSupported || status === 'idle' || dismissed) {
    return null;
  }

  const handleExploreEtawah = () => {
    enableEtawahOverride();
    setDismissed(true);
    navigate('/properties?q=Etawah');
  };

  const handleBrowseAnyway = () => {
    enableEtawahOverride();
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-3xl p-6 sm:p-10 max-w-lg w-full shadow-2xl border border-slate-200 text-center relative overflow-hidden"
        >
          {/* Top Decorative Banner Graphic */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

          <button
            onClick={handleBrowseAnyway}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full transition-colors"
            title="Close banner"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Icon Header */}
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-indigo-100">
            <Compass className="w-8 h-8" />
          </div>

          {/* Title & Body */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-200/60">
            <Sparkles className="w-3.5 h-3.5" /> Expanding Soon
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
            We're Not in Your City Yet
          </h2>

          <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-md mx-auto mb-8">
            SquareUp is currently focused on premier verified properties across <strong className="text-slate-900">Etawah, Jaswant Nagar, Saifai & NCR</strong>. We're actively expanding to bring our service to more cities soon!
          </p>

          {/* CTAs */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleExploreEtawah}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 px-6 rounded-2xl text-sm font-extrabold transition-all shadow-md shadow-indigo-600/25 flex items-center justify-center gap-2 active:scale-95"
            >
              <MapPin className="w-4 h-4" />
              Explore Etawah Properties
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleBrowseAnyway}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 px-6 rounded-2xl text-xs font-bold transition-all"
            >
              Browse Full Catalog Anyway
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
