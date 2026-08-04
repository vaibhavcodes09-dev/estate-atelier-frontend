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
  FiEyeOff
} from 'react-icons/fi';
// Replace with your actual authService path
// import { login } from '@/services/authService'; 

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required').min(6, 'Password must be at least 6 characters'),
});

export default function LoginForm() {
  const navigate = useNavigate();
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
      // await login(data.email, data.password);
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 1200);
    } catch (err) {
      setServerError(err?.message || 'Unable to log in. Please check your credentials and try again.');
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-50">
      
      {/* Left Panel: Premium Visual Storytelling (Hidden on Mobile) */}
      <div className="hidden lg:flex relative w-1/2 items-center justify-center overflow-hidden bg-slate-900">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 transition-transform duration-1000 hover:scale-105"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative z-10 p-12 mt-auto w-full max-w-xl text-white"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300">Partner Portal</span>
          </div>
          <h2 className="text-4xl font-bold leading-tight tracking-tight mb-4">
            Manage your properties with <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">
              unmatched precision.
            </span>
          </h2>
          <p className="text-base text-slate-300 font-light leading-relaxed">
            Access real-time lead analytics, list commercial and residential spaces, and connect with potential buyers across Etawah and beyond.
          </p>
        </motion.div>
      </div>

      {/* Right Panel: Interactive Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.15 }}
          className="w-full max-w-[440px] bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 sm:p-10 my-auto"
        >
          {/* Logo & Header */}
          <div className="mb-8 text-center">
            <Link to="/" className="inline-block text-slate-900 mb-6">
              <span className="font-bold text-2xl tracking-tight leading-none">
                squareup<span className="text-indigo-600">.</span>
              </span>
            </Link>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-1.5">Welcome back</h1>
            <p className="text-slate-500 text-sm">Please enter your account details to sign in.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
            
            {/* Alerts / Status Messages */}
            <AnimatePresence mode="wait">
              {serverError && (
                <motion.div 
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 overflow-hidden"
                >
                  <FiAlertCircle className="h-5 w-5 shrink-0 text-red-500" />
                  <p className="font-medium leading-snug">{serverError}</p>
                </motion.div>
              )}
              {success && (
                <motion.div 
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 overflow-hidden"
                >
                  <FiCheckCircle className="h-5 w-5 shrink-0 text-green-500" />
                  <p className="font-medium">Login successful — redirecting to your dashboard...</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-600">
                Email Address
              </label>
              <div className="relative">
                <FiMail className={`absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transition-colors ${errors.email ? 'text-red-400' : 'text-slate-400'}`} />
                <input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  autoComplete="email"
                  className={`w-full bg-slate-50 pl-11 pr-4 py-3.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none focus:ring-4 focus:bg-white ${
                    errors.email 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                      : 'border-slate-200 focus:border-indigo-600 focus:ring-indigo-50 hover:border-slate-300'
                  }`}
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1.5 text-xs font-medium text-red-500">
                  {errors.email.message}
                </motion.p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <FiLock className={`absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transition-colors ${errors.password ? 'text-red-400' : 'text-slate-400'}`} />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className={`w-full bg-slate-50 pl-11 pr-12 py-3.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none focus:ring-4 focus:bg-white ${
                    errors.password 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-100' 
                      : 'border-slate-200 focus:border-indigo-600 focus:ring-indigo-50 hover:border-slate-300'
                  }`}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1.5 text-xs font-medium text-red-500">
                  {errors.password.message}
                </motion.p>
              )}
            </div>

            {/* Primary Submit Button */}
            <button 
              type="submit" 
              disabled={isSubmitting || success} 
              className="mt-2 w-full bg-[#0066FF] hover:bg-[#0055D4] text-white py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-[0_8px_20px_rgb(0,102,255,0.25)] hover:shadow-[0_8px_25px_rgb(0,102,255,0.35)] active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center gap-2 group"
            >
              {isSubmitting ? (
                <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <>
                  Sign in to Account
                  <FiArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 py-2">
              <span className="h-px flex-1 bg-slate-200" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">or continue with</span>
              <span className="h-px flex-1 bg-slate-200" />
            </div>

            {/* Google OAuth Button */}
            <button 
              type="button" 
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 py-3.5 rounded-xl text-sm font-semibold transition-colors active:bg-slate-100"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>

            {/* Footer Navigation */}
            <p className="text-center text-sm text-slate-500 mt-2">
              Don't have an account?{' '}
              <Link to="/signup" className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                Create an account
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}