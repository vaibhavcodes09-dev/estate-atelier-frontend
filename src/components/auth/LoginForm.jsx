import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMail,
  FiLock,
  FiArrowRight,
  FiAlertCircle,
  FiCheckCircle,
  FiEye,
  FiEyeOff,
} from 'react-icons/fi';
import Logo from '@/components/common/Logo';
import { useAuth } from '@/context/AuthContext';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required').min(6, 'Password must be at least 6 characters'),
});

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data) => {
    setServerError('');
    try {
      await login(data.email, data.password);
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 800);
    } catch (err) {
      setServerError(err?.message || 'Unable to log in. Please check your credentials and try again.');
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-50">
      
      {/* Left Panel: Visual Storytelling */}
      <div className="hidden lg:flex relative w-1/2 items-center justify-center overflow-hidden bg-slate-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35 transition-transform duration-1000 hover:scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2075&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative z-10 p-12 mt-auto w-full max-w-xl text-white"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
              SquareUp Partner Portal
            </span>
          </div>
          <h2 className="text-4xl font-extrabold leading-tight tracking-tight mb-4">
            Manage your properties with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">
              unmatched precision.
            </span>
          </h2>
          <p className="text-base text-slate-300 font-normal leading-relaxed">
            Access lead inquiries, list commercial & residential spaces, and connect with verified buyers across Etawah and top region hubs.
          </p>
        </motion.div>
      </div>

      {/* Right Panel: Interactive Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-[440px] bg-white rounded-3xl shadow-sm border border-slate-200/80 p-8 sm:p-10 my-auto"
        >
          {/* Single Logo Component */}
          <div className="mb-8 text-center flex flex-col items-center">
            <div className="mb-4">
              <Logo className="h-10 w-auto" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-1">Welcome Back</h1>
            <p className="text-slate-500 text-xs font-medium">Please enter your partner credentials to sign in.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
            <AnimatePresence mode="wait">
              {serverError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs text-rose-700"
                >
                  <FiAlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
                  <p className="font-semibold">{serverError}</p>
                </motion.div>
              )}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs text-emerald-700"
                >
                  <FiCheckCircle className="h-4 w-4 shrink-0 text-emerald-500" />
                  <p className="font-semibold">Login successful — redirecting to partner dashboard...</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email */}
            <div>
              <label htmlFor="email" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  className="w-full bg-slate-50 pl-11 pr-4 py-3 rounded-2xl border border-slate-200 text-sm text-slate-900 font-semibold focus:outline-none focus:border-indigo-600"
                  {...register('email')}
                />
              </div>
              {errors.email && <p className="mt-1 text-xs font-semibold text-rose-500">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs font-bold text-indigo-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 pl-11 pr-12 py-3 rounded-2xl border border-slate-200 text-sm text-slate-900 font-semibold focus:outline-none focus:border-indigo-600"
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  {showPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs font-semibold text-rose-500">{errors.password.message}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting || success}
              className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-2xl text-xs font-bold transition-all shadow-md active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isSubmitting ? 'Authenticating...' : 'Sign In to SquareUp'}
              <FiArrowRight className="h-4 w-4" />
            </button>

            {/* Footer */}
            <p className="text-center text-xs text-slate-500 mt-4 font-medium">
              Don't have an account yet?{' '}
              <Link to="/signup" className="font-bold text-indigo-600 hover:underline">
                Create Account
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}