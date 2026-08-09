import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, ArrowRightLeft, Shield, CheckCircle } from 'lucide-react';
import UnitConverter from '@/components/tools/UnitConverter';
import EMICalculator from '@/components/tools/EMICalculator';

export default function Tools() {
  const [activeTab, setActiveTab] = useState('converter'); // 'converter' or 'emi'

  return (
    <div className="min-h-screen bg-slate-50/60 pb-24 pt-28">
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" /> SquareUp Real Estate Utilities
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Property & Financial Tools
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-3 leading-relaxed">
            Convert land areas, calculate Bigha/sq.ft variations across states, and compute home loan EMIs with instant accurate breakdowns.
          </p>
        </div>

        {/* Tab Switcher Bar */}
        <div className="flex justify-center mb-10">
          <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200/80 flex items-center gap-2 max-w-md w-full">
            <button
              onClick={() => setActiveTab('converter')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'converter'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <ArrowRightLeft className="w-4 h-4" />
              Area & Unit Converter
            </button>
            <button
              onClick={() => setActiveTab('emi')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'emi'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Calculator className="w-4 h-4" />
              Home Loan EMI Calculator
            </button>
          </div>
        </div>

        {/* Active Tool Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'converter' ? (
            <motion.div
              key="converter"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <UnitConverter />
            </motion.div>
          ) : (
            <motion.div
              key="emi"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <EMICalculator />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
