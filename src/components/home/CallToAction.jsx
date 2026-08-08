import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, PhoneCall } from 'lucide-react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="w-full py-16 sm:py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative bg-slate-950 rounded-[2.5rem] p-10 sm:p-16 lg:p-20 overflow-hidden flex flex-col items-center text-center shadow-2xl border border-slate-800"
        >
          {/* Abstract Glow Background Elements */}
          <div className="absolute top-0 left-1/4 w-80 h-80 bg-indigo-600/30 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full mix-blend-screen filter blur-[140px] pointer-events-none" />

          {/* Content */}
          <span className="relative z-10 text-xs font-bold uppercase tracking-widest text-indigo-400 mb-4 bg-indigo-500/10 px-4 py-1.5 rounded-full border border-indigo-500/20">
            Join the SquareUp Network
          </span>

          <h2 className="relative z-10 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6 max-w-3xl leading-tight">
            Ready to Find Your Next Investment or Dream Home?
          </h2>
          
          <p className="relative z-10 text-slate-300 text-base sm:text-lg font-medium leading-relaxed mb-10 max-w-2xl">
            Whether you are buying a luxury villa in Jaswant Nagar, renting an apartment in Saifai, or listing commercial property in Etawah, SquareUp provides end-to-end expert support.
          </p>

          {/* Action Buttons */}
          <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              to="/properties"
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-indigo-600/25 active:scale-95 group"
            >
              Browse Properties
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            
            <Link
              to="/contact"
              className="flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 px-8 py-4 rounded-2xl font-bold text-sm hover:bg-white/20 transition-all backdrop-blur-md active:scale-95"
            >
              <PhoneCall className="w-4 h-4 text-indigo-400" />
              Contact Our Team
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default CallToAction;