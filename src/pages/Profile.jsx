import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiLock,
  FiBell,
  FiShield,
  FiCamera,
  FiCheckCircle,
} from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

const profileSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Enter a valid phone number'),
  location: z.string().min(2, 'Location is required'),
  bio: z.string().max(400, 'Bio must be under 400 characters').optional(),
});

const TABS = [
  { id: 'personal', label: 'Personal Info', icon: FiUser },
  { id: 'security', label: 'Security & Password', icon: FiShield },
  { id: 'notifications', label: 'Notifications', icon: FiBell },
];

export default function Profile() {
  const { currentUser, updateProfile } = useAuth();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('personal');
  const [isUpdating, setIsUpdating] = useState(false);

  // Security password state
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: currentUser?.firstName || 'Vikram',
      lastName: currentUser?.lastName || 'Singh',
      email: currentUser?.email || 'vikram@squareup.com',
      phone: currentUser?.phone || '9876543210',
      location: currentUser?.location || 'Etawah, UP',
      bio: currentUser?.bio || 'Senior real estate partner helping clients buy & sell premium properties.',
    },
  });

  useEffect(() => {
    if (currentUser) {
      reset({
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        location: currentUser.location || '',
        bio: currentUser.bio || '',
      });
    }
  }, [currentUser, reset]);

  const onSubmit = async (data) => {
    setIsUpdating(true);
    try {
      await updateProfile(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (passwords.next !== passwords.confirm) {
      addToast('New passwords do not match.', 'error');
      return;
    }
    if (passwords.next.length < 6) {
      addToast('Password must be at least 6 characters long.', 'error');
      return;
    }
    addToast('Security password successfully updated!', 'success');
    setPasswords({ current: '', next: '', confirm: '' });
  };

  const tabContentVariants = {
    hidden: { opacity: 0, x: 10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -10, transition: { duration: 0.2 } },
  };

  return (
    <div className="w-full max-w-[1100px] mx-auto flex flex-col lg:flex-row gap-8">
      
      {/* Left Column: Profile Card & Navigation */}
      <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-6">
        
        {/* User Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 flex flex-col items-center text-center">
          <div className="relative group mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80'}
                alt="Profile Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              className="absolute bottom-0 right-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white hover:bg-indigo-700 transition-colors"
              onClick={() => addToast('Avatar upload simulation active', 'info')}
              aria-label="Change photo"
            >
              <FiCamera className="w-4 h-4" />
            </button>
          </div>

          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            {currentUser?.firstName} {currentUser?.lastName}
          </h2>
          <p className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full mt-2 border border-indigo-100">
            {currentUser?.role || 'SquareUp Partner'}
          </p>
          <p className="text-xs font-medium text-slate-400 mt-3">
            Member since {currentUser?.joinDate || '2023'}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-3xl p-3 shadow-sm border border-slate-200/80 flex flex-col gap-1">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl text-xs font-bold transition-colors z-10 ${
                  isActive ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="profile-tab-active"
                    className="absolute inset-0 bg-indigo-50/80 rounded-2xl -z-10 border border-indigo-100/50"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <tab.icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Column: Tab Content */}
      <div className="flex-1 bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6 sm:p-8 overflow-hidden">
        <AnimatePresence mode="wait">
          
          {/* PERSONAL INFO TAB */}
          {activeTab === 'personal' && (
            <motion.div key="personal" variants={tabContentVariants} initial="hidden" animate="visible" exit="exit">
              <div className="mb-8 pb-4 border-b border-slate-100">
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">Personal Information</h3>
                <p className="text-slate-500 text-sm font-medium mt-1">
                  Update your contact details and bio visible to clients on SquareUp.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">First Name</label>
                    <div className="relative">
                      <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        {...register('firstName')}
                        className="w-full bg-slate-50 pl-11 pr-4 py-3 rounded-2xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-indigo-600"
                      />
                    </div>
                    {errors.firstName && <p className="mt-1 text-xs text-rose-500">{errors.firstName.message}</p>}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Last Name</label>
                    <div className="relative">
                      <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        {...register('lastName')}
                        className="w-full bg-slate-50 pl-11 pr-4 py-3 rounded-2xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-indigo-600"
                      />
                    </div>
                    {errors.lastName && <p className="mt-1 text-xs text-rose-500">{errors.lastName.message}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Email Address</label>
                    <div className="relative">
                      <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        {...register('email')}
                        className="w-full bg-slate-50 pl-11 pr-4 py-3 rounded-2xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-indigo-600"
                      />
                    </div>
                    {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Phone Number</label>
                    <div className="relative">
                      <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="tel"
                        {...register('phone')}
                        className="w-full bg-slate-50 pl-11 pr-4 py-3 rounded-2xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-indigo-600"
                      />
                    </div>
                    {errors.phone && <p className="mt-1 text-xs text-rose-500">{errors.phone.message}</p>}
                  </div>

                  {/* Location */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">City & Region</label>
                    <div className="relative">
                      <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        {...register('location')}
                        className="w-full bg-slate-50 pl-11 pr-4 py-3 rounded-2xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-indigo-600"
                      />
                    </div>
                    {errors.location && <p className="mt-1 text-xs text-rose-500">{errors.location.message}</p>}
                  </div>

                  {/* Bio */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Partner Bio</label>
                    <textarea
                      rows={4}
                      {...register('bio')}
                      className="w-full bg-slate-50 px-4 py-3 rounded-2xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-indigo-600 resize-none"
                    />
                    {errors.bio && <p className="mt-1 text-xs text-rose-500">{errors.bio.message}</p>}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex justify-end">
                  <button
                    type="submit"
                    disabled={!isDirty || isUpdating}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-2xl text-xs font-bold transition-all shadow-md active:scale-95 disabled:opacity-50 flex items-center gap-2"
                  >
                    {isUpdating ? 'Saving...' : 'Save Profile Changes'}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* SECURITY TAB */}
          {activeTab === 'security' && (
            <motion.div key="security" variants={tabContentVariants} initial="hidden" animate="visible" exit="exit">
              <div className="mb-8 pb-4 border-b border-slate-100">
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">Account Security</h3>
                <p className="text-slate-500 text-sm font-medium mt-1">Change your account password and security credentials.</p>
              </div>

              <form onSubmit={handlePasswordUpdate} className="max-w-md space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Current Password</label>
                  <div className="relative">
                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={passwords.current}
                      onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                      className="w-full bg-slate-50 pl-11 pr-4 py-3 rounded-2xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-indigo-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">New Password</label>
                  <div className="relative">
                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={passwords.next}
                      onChange={(e) => setPasswords({ ...passwords, next: e.target.value })}
                      className="w-full bg-slate-50 pl-11 pr-4 py-3 rounded-2xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-indigo-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Confirm New Password</label>
                  <div className="relative">
                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={passwords.confirm}
                      onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                      className="w-full bg-slate-50 pl-11 pr-4 py-3 rounded-2xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-indigo-600"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-2xl text-xs font-bold transition-all shadow-md active:scale-95 mt-2"
                >
                  Update Password
                </button>
              </form>
            </motion.div>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === 'notifications' && (
            <motion.div key="notifications" variants={tabContentVariants} initial="hidden" animate="visible" exit="exit">
              <div className="mb-8 pb-4 border-b border-slate-100">
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">Notification Preferences</h3>
                <p className="text-slate-500 text-sm font-medium mt-1">Configure lead inquiry alerts and weekly market summaries.</p>
              </div>

              <div className="space-y-4">
                {[
                  { title: 'New Lead Inquiries', desc: 'Receive instant notifications when a buyer requests a tour or submits an offer.', defaultOn: true },
                  { title: 'Price Reduction & Market Alerts', desc: 'Get notified of market price trends across Etawah and regional hubs.', defaultOn: true },
                  { title: 'SquareUp Partner Newsletter', desc: 'Receive property listing optimization tips and promotional offers.', defaultOn: false },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-4">
                      <input type="checkbox" className="sr-only peer" defaultChecked={item.defaultOn} />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600" />
                    </label>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}