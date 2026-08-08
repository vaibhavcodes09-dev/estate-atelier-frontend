import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success', duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      
      {/* Floating Toast Notification Container */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none max-w-sm w-full px-4">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ type: 'spring', bounce: 0.25, duration: 0.4 }}
              className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-2xl shadow-xl border backdrop-blur-md ${
                toast.type === 'error'
                  ? 'bg-red-900/90 text-white border-red-700/50'
                  : toast.type === 'info'
                  ? 'bg-slate-900/90 text-white border-slate-700/50'
                  : 'bg-slate-900/95 text-white border-indigo-500/30'
              }`}
            >
              <div className="flex items-center gap-3">
                {toast.type === 'error' ? (
                  <FiAlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                ) : toast.type === 'info' ? (
                  <FiInfo className="w-5 h-5 text-cyan-400 shrink-0" />
                ) : (
                  <FiCheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                )}
                <p className="text-sm font-medium leading-snug">{toast.message}</p>
              </div>

              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
                aria-label="Dismiss toast"
              >
                <FiX className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
