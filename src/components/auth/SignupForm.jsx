import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiUser, FiArrowRight, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import PasswordField from './PasswordField';
import { signup } from '@/services/authService';

// Zod schema — validates name, email, password strength, and confirm match.
const signupSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must include at least one uppercase letter')
      .regex(/[0-9]/, 'Must include at least one number'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export default function SignupForm() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = async (data) => {
    setServerError('');
    try {
      await signup(data.email, data.password, data.name);
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 1200);
    } catch (err) {
      setServerError(err?.message || 'Unable to create account. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      {serverError && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <FiAlertCircle className="h-4 w-4 shrink-0" />
          {serverError}
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          <FiCheckCircle className="h-4 w-4 shrink-0" />
          Account created — redirecting to dashboard…
        </div>
      )}

      {/* Name */}
      <div>
        <label htmlFor="name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">
          Full Name
        </label>
        <div className="relative">
          <FiUser className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" />
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            autoComplete="name"
            className={`input-field pl-12 ${errors.name ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : ''}`}
            {...register('name')}
          />
        </div>
        {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">
          Email Address
        </label>
        <div className="relative">
          <FiMail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" />
          <input
            id="email"
            type="email"
            placeholder="john@example.com"
            autoComplete="email"
            className={`input-field pl-12 ${errors.email ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : ''}`}
            {...register('email')}
          />
        </div>
        {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>}
      </div>

      {/* Password */}
      <div>
        <PasswordField
          id="password"
          label="Password"
          placeholder="Create a strong password"
          autoComplete="new-password"
          {...register('password')}
        />
        {errors.password ? (
          <p className="mt-1.5 text-xs text-red-500">{errors.password.message}</p>
        ) : (
          <p className="mt-1.5 text-xs text-ink-400">Min 8 chars, 1 uppercase, 1 number</p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <PasswordField
          id="confirmPassword"
          label="Confirm Password"
          placeholder="Re-enter your password"
          autoComplete="new-password"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && <p className="mt-1.5 text-xs text-red-500">{errors.confirmPassword.message}</p>}
      </div>

      {/* Terms */}
      <label className="flex items-start gap-3 text-sm text-ink-500">
        <input
          type="checkbox"
          required
          className="mt-0.5 h-4 w-4 rounded border-ink-300 text-brand-500 focus:ring-brand-500"
        />
        <span>
          I agree to the{' '}
          <a href="#" className="font-semibold text-brand-600 hover:text-brand-700">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="font-semibold text-brand-600 hover:text-brand-700">Privacy Policy</a>
        </span>
      </label>

      {/* Submit */}
      <button type="submit" disabled={isSubmitting || success} className="btn-accent w-full disabled:cursor-not-allowed disabled:opacity-60">
        {isSubmitting ? 'Creating account…' : (<>Create account <FiArrowRight className="h-4 w-4" /></>)}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-4 py-1">
        <span className="h-px flex-1 bg-ink-100" />
        <span className="text-xs font-medium uppercase tracking-wide text-ink-400">or</span>
        <span className="h-px flex-1 bg-ink-100" />
      </div>

      {/* Google (placeholder) */}
      <button type="button" className="btn-ghost w-full">
        <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
        Continue with Google
      </button>

      {/* Switch to login */}
      <p className="text-center text-sm text-ink-500">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-brand-600 transition hover:text-brand-700">
          Sign in
        </Link>
      </p>
    </form>
  );
}
