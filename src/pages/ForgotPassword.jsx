import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiMail, FiArrowLeft, FiCheckCircle, FiSend } from 'react-icons/fi';
import squareupLogo from '@/assets/squareup-logo.jpg';
import { forgotPassword } from '@/services/authService';
import { useToast } from '@/context/ToastContext';

export default function ForgotPassword() {
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await forgotPassword(email);
      setSubmitted(true);
      addToast('Password reset link sent to your email!', 'success');
    } catch (err) {
      addToast(err.message || 'Failed to send reset link.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 pt-24 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200/80"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-4">
            <img src={squareupLogo} alt="SquareUp" className="h-9 w-auto rounded-md" />
            <span className="font-extrabold text-2xl tracking-tight leading-none text-slate-900">
              SquareUp<span className="text-indigo-600">.</span>
            </span>
          </Link>

          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">Reset Password</h1>
          <p className="text-xs font-medium text-slate-500">
            Enter your registered email address and we'll send you instructions to reset your password.
          </p>
        </div>

        {submitted ? (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <FiCheckCircle className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Check Your Inbox</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                We've sent a password recovery link to <span className="font-bold text-slate-800">{email}</span>.
              </p>
            </div>

            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-2xl text-xs font-bold transition-all shadow-sm"
            >
              Back to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase mb-2">
                Registered Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 pl-11 pr-4 py-3 rounded-2xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-indigo-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-2xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? 'Sending Link...' : 'Send Recovery Link'}
              <FiSend className="w-4 h-4" />
            </button>

            <div className="pt-2 text-center">
              <Link to="/login" className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-indigo-600 transition-colors">
                <FiArrowLeft className="w-4 h-4" /> Back to Sign In
              </Link>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
