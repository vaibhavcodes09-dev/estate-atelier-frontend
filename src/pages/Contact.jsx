import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiUser,
  FiMessageSquare,
  FiSend,
  FiCheckCircle,
  FiArrowRight,
} from 'react-icons/fi';
import { submitContactForm } from '@/services/contactService';
import { useToast } from '@/context/ToastContext';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Subject must be at least 3 characters.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await submitContactForm(data);
      addToast('Message sent! The SquareUp team will get back to you shortly.', 'success');
      reset();
    } catch (err) {
      addToast('Failed to send message. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactDetails = [
    {
      icon: FiMapPin,
      title: 'SquareUp Headquarters',
      content: 'SquareUp Plaza, Block C, Vijay Nagar, Etawah, UP 206001',
      linkText: 'Get Directions',
    },
    {
      icon: FiMail,
      title: 'Email Support',
      content: 'support@squareup.com\npartners@squareup.com',
      linkText: 'Send Email',
    },
    {
      icon: FiPhone,
      title: 'Call Support',
      content: '+91 98765 43210\nMon - Sat, 9:00 AM to 6:00 PM',
      linkText: 'Call Now',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/60 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-14">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4">
            <FiMessageSquare className="w-3.5 h-3.5" />
            SquareUp Support & Partner Hub
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Let's Start a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">Conversation.</span>
          </h1>
          <p className="text-slate-500 text-base max-w-xl mx-auto font-medium">
            Whether you're looking to buy, sell, or need real estate advisory in Etawah & NCR, our experts are here to help.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
        
        {/* Left Column: Cards */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {contactDetails.map((detail, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group bg-white p-6 rounded-3xl shadow-sm border border-slate-200/80 hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <detail.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{detail.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed font-medium whitespace-pre-line mb-4">
                {detail.content}
              </p>
              <a href="#" className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                {detail.linkText}
                <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Right Column: Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-3 bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200/80 h-fit"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Send Us a Message</h2>
            <p className="text-slate-500 text-xs font-medium mt-1">
              Fill out your details below and a SquareUp advisor will respond within 24 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div className="grid sm:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Full Name *</label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    {...register('name')}
                    className="w-full bg-slate-50 pl-11 pr-4 py-3 rounded-2xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-indigo-600"
                  />
                </div>
                {errors.name && <p className="mt-1 text-xs text-rose-500 font-medium">{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Email Address *</label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    placeholder="john@example.com"
                    {...register('email')}
                    className="w-full bg-slate-50 pl-11 pr-4 py-3 rounded-2xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-indigo-600"
                  />
                </div>
                {errors.email && <p className="mt-1 text-xs text-rose-500 font-medium">{errors.email.message}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Phone Number</label>
                <div className="relative">
                  <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    placeholder="Optional"
                    {...register('phone')}
                    className="w-full bg-slate-50 pl-11 pr-4 py-3 rounded-2xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-indigo-600"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Subject *</label>
                <div className="relative">
                  <FiMessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Property Inquiry"
                    {...register('subject')}
                    className="w-full bg-slate-50 pl-11 pr-4 py-3 rounded-2xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-indigo-600"
                  />
                </div>
                {errors.subject && <p className="mt-1 text-xs text-rose-500 font-medium">{errors.subject.message}</p>}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Message *</label>
              <textarea
                rows={4}
                placeholder="Tell us more about your property requirements..."
                {...register('message')}
                className="w-full bg-slate-50 p-4 rounded-2xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-indigo-600 resize-none"
              />
              {errors.message && <p className="mt-1 text-xs text-rose-500 font-medium">{errors.message.message}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-2xl text-xs font-bold transition-all shadow-md active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? 'Sending Message...' : 'Send Message'}
              <FiSend className="w-3.5 h-3.5" />
            </button>

          </form>
        </motion.div>

      </div>
    </div>
  );
}