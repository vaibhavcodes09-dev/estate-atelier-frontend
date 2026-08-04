import React, { useState } from 'react';
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
  FiCheckCircle
} from 'react-icons/fi';

// Dummy User Data
const currentUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '9876543210',
  location: 'Etawah, UP',
  role: 'Premium Agent',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
  joinDate: 'March 2024'
};

const profileSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Enter a valid 10-digit number'),
  location: z.string().min(3, 'Location is required'),
  bio: z.string().max(300, 'Bio must be under 300 characters').optional(),
});

const TABS = [
  { id: 'personal', label: 'Personal Info', icon: FiUser },
  { id: 'security', label: 'Security', icon: FiShield },
  { id: 'notifications', label: 'Notifications', icon: FiBell },
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState('personal');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      phone: currentUser.phone,
      location: currentUser.location,
      bio: 'Passionate real estate agent helping you find your dream home in Etawah and surrounding areas.'
    }
  });

  const onSubmit = async (data) => {
    setIsUpdating(true);
    setUpdateSuccess(false);
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1200));
    setIsUpdating(false);
    setUpdateSuccess(true);
    setTimeout(() => setUpdateSuccess(false), 3000);
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const tabContentVariants = {
    hidden: { opacity: 0, x: 10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -10, transition: { duration: 0.2 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-[1100px] mx-auto flex flex-col lg:flex-row gap-8"
    >
      {/* Left Column: Profile Card & Navigation */}
      <motion.div variants={itemVariants} className="w-full lg:w-[320px] shrink-0 flex flex-col gap-6">
        
        {/* User Card */}
        <div className="bg-white rounded-[2rem] p-6 shadow-[0_4px_20px_rgb(0,0,0,0.02)] border border-gray-100 flex flex-col items-center text-center">
          <div className="relative group mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img src={currentUser.avatar} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white hover:bg-indigo-700 transition-colors">
              <FiCamera className="w-4 h-4" />
            </button>
          </div>
          
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            {currentUser.firstName} {currentUser.lastName}
          </h2>
          <p className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full mt-2">
            {currentUser.role}
          </p>
          <p className="text-xs font-medium text-gray-400 mt-3">
            Member since {currentUser.joinDate}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-[2rem] p-3 shadow-[0_4px_20px_rgb(0,0,0,0.02)] border border-gray-100 flex flex-col gap-1">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-sm font-semibold transition-colors z-10 ${
                  isActive ? 'text-indigo-700' : 'text-gray-500 hover:text-slate-900 hover:bg-gray-50'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="profile-tab-active"
                    className="absolute inset-0 bg-indigo-50 rounded-xl -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <tab.icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Right Column: Tab Content */}
      <motion.div variants={itemVariants} className="flex-1 bg-white rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.02)] border border-gray-100 p-6 sm:p-8 overflow-hidden">
        <AnimatePresence mode="wait">
          
          {/* PERSONAL INFO TAB */}
          {activeTab === 'personal' && (
            <motion.div key="personal" variants={tabContentVariants} initial="hidden" animate="visible" exit="exit">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Personal Information</h3>
                <p className="text-gray-500 mt-1">Update your personal details and how clients can reach you.</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                    <div className="relative">
                      <FiUser className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.firstName ? 'text-red-400' : 'text-gray-400'}`} />
                      <input 
                        type="text" 
                        {...register('firstName')}
                        className={`w-full bg-gray-50 pl-11 pr-4 py-3.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-4 focus:bg-white ${
                          errors.firstName ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-50 hover:border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.firstName && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.firstName.message}</p>}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                    <div className="relative">
                      <FiUser className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.lastName ? 'text-red-400' : 'text-gray-400'}`} />
                      <input 
                        type="text" 
                        {...register('lastName')}
                        className={`w-full bg-gray-50 pl-11 pr-4 py-3.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-4 focus:bg-white ${
                          errors.lastName ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-50 hover:border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.lastName && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.lastName.message}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <div className="relative">
                      <FiMail className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.email ? 'text-red-400' : 'text-gray-400'}`} />
                      <input 
                        type="email" 
                        {...register('email')}
                        className={`w-full bg-gray-50 pl-11 pr-4 py-3.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-4 focus:bg-white ${
                          errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-50 hover:border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.email && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.email.message}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <div className="relative">
                      <FiPhone className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.phone ? 'text-red-400' : 'text-gray-400'}`} />
                      <input 
                        type="tel" 
                        {...register('phone')}
                        className={`w-full bg-gray-50 pl-11 pr-4 py-3.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-4 focus:bg-white ${
                          errors.phone ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-50 hover:border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.phone && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.phone.message}</p>}
                  </div>

                  {/* Location */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                    <div className="relative">
                      <FiMapPin className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.location ? 'text-red-400' : 'text-gray-400'}`} />
                      <input 
                        type="text" 
                        {...register('location')}
                        className={`w-full bg-gray-50 pl-11 pr-4 py-3.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-4 focus:bg-white ${
                          errors.location ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-50 hover:border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.location && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.location.message}</p>}
                  </div>

                  {/* Bio */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Short Bio</label>
                    <textarea 
                      rows="4"
                      {...register('bio')}
                      className={`w-full bg-gray-50 px-4 py-3.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-4 focus:bg-white resize-none ${
                        errors.bio ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-50 hover:border-gray-300'
                      }`}
                    />
                    {errors.bio && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.bio.message}</p>}
                  </div>
                </div>

                {/* Submit Area */}
                <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                  <AnimatePresence>
                    {updateSuccess && (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 text-green-600 font-medium text-sm"
                      >
                        <FiCheckCircle className="w-5 h-5" />
                        Profile updated successfully!
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <button 
                    type="submit" 
                    disabled={!isDirty || isUpdating}
                    className="ml-auto bg-[#0066FF] hover:bg-[#0055D4] text-white px-8 py-3.5 rounded-xl text-[15px] font-semibold transition-all duration-300 shadow-[0_8px_20px_rgb(0,102,255,0.25)] hover:shadow-[0_8px_25px_rgb(0,102,255,0.35)] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
                  >
                    {isUpdating ? (
                      <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    ) : 'Save Changes'}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* SECURITY TAB (Placeholder for structure) */}
          {activeTab === 'security' && (
            <motion.div key="security" variants={tabContentVariants} initial="hidden" animate="visible" exit="exit">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Security</h3>
                <p className="text-gray-500 mt-1">Manage your password and account security settings.</p>
              </div>
              
              <div className="max-w-md space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                  <div className="relative">
                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="password" placeholder="••••••••" className="w-full bg-gray-50 pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                  <div className="relative">
                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="password" placeholder="••••••••" className="w-full bg-gray-50 pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                  <div className="relative">
                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="password" placeholder="••••••••" className="w-full bg-gray-50 pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all" />
                  </div>
                </div>
                
                <button className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3.5 rounded-xl text-[15px] font-semibold transition-all duration-300">
                  Update Password
                </button>
              </div>
            </motion.div>
          )}

          {/* NOTIFICATIONS TAB (Placeholder for structure) */}
          {activeTab === 'notifications' && (
            <motion.div key="notifications" variants={tabContentVariants} initial="hidden" animate="visible" exit="exit">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Notification Preferences</h3>
                <p className="text-gray-500 mt-1">Control when and how you want to be notified.</p>
              </div>

              <div className="space-y-4">
                {[
                  { title: 'Email Alerts', desc: 'Receive updates about new property matches.', defaultOn: true },
                  { title: 'SMS Notifications', desc: 'Get urgent alerts for new inquiries directly on your phone.', defaultOn: false },
                  { title: 'Marketing Communications', desc: 'Receive tips, newsletters, and promotional offers.', defaultOn: true }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors">
                    <div>
                      <h4 className="font-semibold text-slate-900">{item.title}</h4>
                      <p className="text-sm text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                    {/* Custom Toggle Switch */}
                    <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-4">
                      <input type="checkbox" className="sr-only peer" defaultChecked={item.defaultOn} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}