import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

export default function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className="card-surface overflow-hidden">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-base font-semibold text-ink-900">{item.q}</span>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="text-ink-400">
          <FiChevronDown className="h-5 w-5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="px-6 pb-5 text-sm leading-relaxed text-ink-500">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
